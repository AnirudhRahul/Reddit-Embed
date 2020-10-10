var red = function(){

  // TEMPLATES

  /*
    All templates take in named arguements,
    feel free to add arguements if you want
    to display additional data
  */
  const Title = ({
  post_link,
  title,
  }) =>`
  <a class="title" href="${post_link}">${title}</a>
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

const msPerSecond = 1000;
const msPerMinute = msPerSecond * 60;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerMonth = msPerDay * 30;
const msPerYear = msPerDay * 365;

const cache_timeout = 30*msPerMinute
const defaults = {
  cache_timeout: msPerHour,
  use_cache: true,
  show_post_title: true,
  //TODO create better post support
  show_post: true,
  show_comments: true,
  ignore_bot_comments: true,
  ignore_sticky_comments: false,
  depth_limit: -1,
  comment_limit: [],
  open_links_in_new_tab: true,
  recent_post_threshold: 15*msPerMinute,
  depth_padding: 24,
  initial_padding: 8,
  support_spoiler_links: true,
}
const spoiler_links = ['/s', '#s', '/spoiler', '#spoiler']


function setDefaults(newDefaults) {
  for(key in newDefaults){
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
  for(key in defaults)
    if(!(key in opts))
      opts[key] = defaults[key]
}

function embed(url, div, opts = defaults){
  add_missing_defaults(opts)
  const cached_json = tryJson(sessionStorage.getItem(url))
  if (opts.use_cache && cached_json && Date.now() < cached_json.expire_time) {
    renderDiv(JSON.parse(cached_json.response), div, opts)
    console.log("Used Cache")
  }
  else{
    console.log("Requesting JSON from reddit: " + url)
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => {
      if(opts.use_cache)
        sessionStorage.setItem(url, JSON.stringify({
          response: xhr.responseText,
          expire_time: Date.now() + opts.cache_timeout
        }));
      renderDiv(JSON.parse(xhr.responseText), div, opts);
    }
    xhr.send();
  }
}

function tryJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return false;
    }
}

function loadJSON(url){

}

// Very useful helper function for renderDiv
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
    const thousands = Math.round(score/1000)
    const hundreds = Math.round(score/100) % 10
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

  if(opts.show_post_title)
    outputHTML.push(Title({
      title: post_data.title,
      post_link: post_data.url
    }))


  // Renders post seperately since json structure
  // is much different from a comment
  if(opts.show_post){
    console.log(post_data)

  }

  // List containing all the comment data to be rendered
  const commentQ = []

  if(opts.show_comments)
    for(let i=comments.length-1; i>=0; i--){
      //Ignores random blank comments with no html
      if(comments[i].data.body_html)
        commentQ.push({
          item_data: comments[i].data,
          depth: 0
        })
    }

  const now = Date.now()
  initial_shift = 8
  shift_diff = 24
  while(commentQ.length > 0){

    const {item_data, depth} = commentQ.pop()
    item_data.score = formatScore(item_data.score)

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

  //Post processing
  for(anchor of div.getElementsByTagName('a')){
    if(opts.support_spoiler_links && spoiler_links.includes(anchor.getAttribute('href'))){
      anchor.innerHTML += '<sup class="expand-button">+</sup>'
      // Make the link literally do nothing, and add a helpful message for noobs
      anchor.href = '#'
      anchor.setAttribute('onclick', 'alert("This is a spoiler link, hover over it to see the spoiler text"); return false;')
      anchor.setAttribute('title', "dw I replaced the spoiler text")
    }
    else{
      if(opts.open_links_in_new_tab)
        anchor.setAttribute('target', '_blank')
    }
  }
}



  return{
    embed: embed

  }

}();
