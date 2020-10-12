var red = function(){

  // TEMPLATES

  /*
    All templates use named arguements
  */

//Split up post comments so they can easily be disabled
const Post_Header = ({
author_name,
time_ago,
post_points,
point_plural,
}) =>`
<div class="author-info">
    Posted by ${author_name}
    <span class="left-space">&nbsp${post_points} point${point_plural}</span>
    <span class="left-space bold">&#183;</span>
    <span class="left-space"> ${time_ago}</span>
</div>
<div class="header-spacer"></div>
`;
const Post_Title = ({
post_link,
post_title,
}) =>`
<a class="title" href="${post_link}">${post_title}</a>
<div class="title-spacer"></div>
`;
const Post_Body = ({
post_body,
}) =>`
<div class="comment-body">
  ${post_body}
</div>
`;

const Post_Image_Body = ({
post_src,
post_src_set,
post_image_link,
}) =>`
<div class="image-container">
  <a href="${post_image_link}" target="_blank">
    <img srcset="${post_src_set}" src="${post_src}">
    </img>
  </a>
</div>
`;

const Post_Video_Body = ({
video_src,
poster_src,
}) =>`
<div class="video-container">
    <video src="${video_src}" poster="${poster_src}" preload="auto" playsinline controls>
    </video>
</div>
`;

const Post = ({
post_header,
post_title,
post_body,
}) =>`
<div>
  ${post_header}
  ${post_title}
  ${post_body}
</div>
`;

const Comment = ({
left_padding,
post_link,
author_name,
author_class,
comment_points,
point_plural,
time_ago,
body
}) =>`
<div class="comment" style="padding-left:${left_padding}px">
    <div class="author-info">
        <a href="${post_link}" class="${author_class}">${author_name}</a>
        <span class="left-space">&nbsp${comment_points} point${point_plural}</span>
        <span class="left-space bold">&#183;</span>
        <span class="left-space"> ${time_ago}</span>
    </div>
    <div class="comment-body">
      ${body}
    </div>
</div>
`;

// END OF TEMPLATE SECTION

const msPerSecond = 1000;
const msPerMinute = msPerSecond * 60;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerMonth = msPerDay * 30;
const msPerYear = msPerDay * 365;

const defaults = {
  show_post: true, // Note setting this to false will override the 3 options below
  show_post_title: true,
  show_post_header: true,
  show_post_body: true,
  show_comments_section: true,
  show_comments_section_header: true,
  ignore_sticky_comments: false,
  max_depth: -1,
  open_links_in_new_tab: true,
  padding_per_depth: 24,
  initial_padding: 4,
  improve_spoiler_links: true,
}
const spoiler_links = ['/s', '#s', '/spoiler', '#spoiler']


function setDefaults(newDefaults) {
  for(const key in newDefaults){
    if(key in newDefaults){
      defaults[key] = newDefaults[key]
    }
    else{
      throw key + " is not a valid default option"
    }
  }
}

function add_missing_defaults(opts){
  // Fill in missings defaults from opts
  for(const key in defaults)
    if(!opts.hasOwnProperty(key))
      opts[key] = defaults[key]
}

function embed(url, div, opts = defaults){
  add_missing_defaults(opts)
  console.log("Requesting JSON from reddit: " + url)
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = () => {
    renderDiv(JSON.parse(xhr.responseText), div, opts);
  }
  xhr.send();
}

// Stateless by design
// Extracts all data needed from HTML attributes
// Should only be called after the HTML has loaded!
function embedAll(){
  let opts = defaults
  for(const div of document.getElementsByClassName("reddit-embed")){
    if(!div.hasAttribute("red-href"))
      continue
    if(div.hasAttribute("red-opts")){
      try{
        opts = JSON.parse(div.getAttribute("red-opts"))
      }catch(e){console.error(e)}
    }
    embed(div.getAttribute("red-href"), div, opts)
    // Reset options
    opts = defaults
  }
}

// Helper functions for renderDiv
function timeDifference(current, previous) {
    const elapsed = current - previous;
    const units = [msPerSecond, msPerMinute, msPerHour, msPerDay, msPerMonth, msPerYear, Number.MAX_VALUE]
    const names = ['second',    'minute',    'hour',    'day',    'month',    'year',    'forever']
    for(let i=1; i<units.length; i++){
      if(elapsed < units[i]){
        const val = Math.floor(elapsed/units[i-1])
        if(val==1){
          return val + ' ' + names[i-1] + ' ago'
        }
        else{
          return val + ' ' + names[i-1] + 's ago'
        }
      }
    }
}

function formatScore(score){
  // Converts score to string if it's large
  if(score > 999){
    const thousands = Math.floor(score/1000)
    const hundreds = Math.round((score-thousands*1000)/100)
    if(hundreds==0){
      return thousands + 'k'
    }
    else{
      return thousands + '.' + hundreds + 'k'
    }
  }
  //IMPORTANT leave it as integer if we don't  format it
  else
    return score
}


function renderDiv(response, div, opts = defaults){
  add_missing_defaults(opts)

  const outputHTML = []
  const post_data = response[0].data.children[0].data
  const comments = response[1].data.children
  window.comments = comments
  window.post_data = post_data



  // Renders post seperately since json structure
  // is much different from a comment
  if(opts.show_post){
    post_data.score = formatScore(post_data.score)
    const post_header = Post_Header({
      author_name: post_data.author,
      time_ago: timeDifference(Date.now(), post_data.created_utc*1000),
      post_points: post_data.score,
      point_plural: post_data.score == 1 ? '':'s',
    })
    const post_title = Post_Title({
      post_link: 'https://reddit.com'+post_data.permalink,
      post_title: post_data.title,
    })
    let post_body = ''
    // Regular text post
    if(post_data.selftext_html){
      post_body = Post_Body({
        post_body:he.decode(post_data.selftext_html)
      })
    }
    // Video or Image post
    else if(post_data.post_hint){
      if(post_data.post_hint == 'image'){
        let preview_default_src = ''
        let preview_src_set = ''
        if(post_data.preview.images){
          let target = post_data.preview.images[0]
          //Use gif source if it's available
          if(target.variants && target.variants.gif){
            target = target.variants.gif
          }

          for(const image_object of target.resolutions){
            preview_src_set += image_object.url + ' ' + image_object.width + 'w, '
          }
          preview_default_src = target.source.url
        }
        post_body = Post_Image_Body({
          post_src: preview_default_src,
          post_src_set: preview_src_set,
          post_image_link: post_data.url,
        })
      }
      else if(post_data.post_hint == 'hosted:video'){
        post_body = Post_Video_Body({
          video_src: post_data.media.reddit_video.fallback_url,
          poster_src: post_data.preview.images[0].source.url,
        })
      }
      else if(post_data.post_hint == 'rich:video'){
        post_body = '<div class="video-container">' + he.decode(post_data.media_embed.content) + '</div>'
      }
      else{
        console.error("Uhhh I haven't seen this post hint before: " + post_data.post_hint)
      }

    }
    // Link only post
    else if(post_data.url){
      post_body = Post_Body({
        post_body: '<a href="' + post_data.url + '">' + post_data.url + '</a>'
      })
    }

    const post = Post({
      post_header: opts.show_post_header ? post_header:'',
      post_title: opts.show_post_title ? post_title:'',
      post_body: opts.show_post_body ? post_body:'',
    })
    outputHTML.push(post)
  }

  if(opts.show_comments_section && opts.show_comments_section_header){
    outputHTML.push(`
      <div class="header-spacer-lg"></div>
      <h3 class="comment-header">Comments</h3>
      <hr class="comment-seperator"/>
      <div class="header-spacer"></div>
      `)
  }

  // List containing all the comment data to be rendered
  const commentQ = []

  if(opts.show_comments_section)
    for(let i=comments.length-1; i>=0; i--){
      //Ignores random blank comments with no html
      if(comments[i].data.body_html){
        if(opts.ignore_sticky_comments && comments[i].data.stickied)
          continue
        commentQ.push({
          item_data: comments[i].data,
          depth: 0
        })
      }
    }

  const now = Date.now()
  initial_shift = opts.initial_padding
  shift_diff = opts.padding_per_depth
  while(commentQ.length > 0){

    const {item_data, depth} = commentQ.pop()
    item_data.score = formatScore(item_data.score)

    if(opts.max_depth>=0 && depth > opts.max_depth)
      continue

    const comment = Comment({
      left_padding: initial_shift + shift_diff * depth,
      post_link: 'https://reddit.com' + item_data.permalink,
      author_name: item_data.author,
      author_class: item_data.is_submitter ? 'authorname bold': 'authorname',
      comment_points: item_data.score,
      point_plural: item_data.score == 1 ? '':'s',
      time_ago: timeDifference(now, item_data.created_utc*1000),
      body: he.decode(item_data.body_html),
    })
    outputHTML.push(comment)

    //Add replies to queue
    if(item_data.replies){
      replies = item_data.replies.data.children
      for(let i = replies.length-1; i>=0; i--){
        if(replies[i].data.body_html)
          commentQ.push({
            item_data: replies[i].data,
            depth: depth + 1
          })
      }
    }
  }

  div.innerHTML = outputHTML.join('\n')

  // Post-processing rendered html
  for(const anchor of div.getElementsByTagName('a')){
    if(opts.improve_spoiler_links && spoiler_links.includes(anchor.getAttribute('href'))){
      // Visual indicator for spoiler links
      anchor.innerHTML += '<sup class="expand-button">+</sup>'
      // Show the user an alert when clicking a spoiler link
      anchor.href = '#'
      anchor.setAttribute('onclick', 'alert("This is a spoiler link, hover over it to see the spoiler text"); return false;')
    }
    else{
      if(opts.open_links_in_new_tab)
        anchor.setAttribute('target', '_blank')
    }
  }

  // Make spoiler tags toggle when clicked
  for(const spoiler of div.getElementsByClassName('md-spoiler-text')){
    spoiler.setAttribute('onclick', "this.setAttribute('class', 'md-spoiler-revealed')")
  }

}



  return{
    embed: embed,
    setDefaults: setDefaults,
    embedAll: embedAll,
  }

}();
