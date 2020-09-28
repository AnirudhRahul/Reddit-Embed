const msPerMinute = 60 * 1000;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerMonth = msPerDay * 30;
const msPerYear = msPerDay * 365;

const cache_timeout = 30*msPerMinute

function embed(url, div, useCache = true){
  cached_json = tryJson(sessionStorage.getItem(url))

  if (useCache && cached_json && Date.now() < cached_json.expire_time) {
    process_data(JSON.parse(cached_json.response), div)
    console.log("Used Cache")
  }
  else{
    console.log("Requesting JSON from reddit: " + url)
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => {
      sessionStorage.setItem(url, JSON.stringify({
        response: xhr.responseText,
        expire_time: Date.now() + cache_timeout
      }));
      process_data(JSON.parse(xhr.responseText), div);
    }
    xhr.send();
  }
}

function process_data(response, div){
  out = []
  window.response = response
  post = response[0].data.children[0].data
  comments = response[1].data.children
  console.log(post)
  console.log(comments)
  // sr_name = post.subreddit_name_prefixed
  // out.push('<h3>'+sr_name+'</h5>')

  out.push(Title({
    title: post.title,
    post_link: 'https://reddit.com' + post.permalink
  }))

  comment_q = []
  for(let i=comments.length-1; i>=0; i--){
    // Push comment into rendering queue
    // if it has a body
    if(comments[i].data.body_html)
      comment_q.push({
        cur: comments[i].data,
        depth: 0
      })
  }

  const now = Date.now()
  initial_shift = 8
  shift_diff = 24
  while(comment_q.length > 0){

    const {cur, depth} = comment_q.pop()

    if(cur.score > 999){
      const thousands = Math.round(cur.score/1000)
      const hundreds = Math.round(cur.score/100) % 10
      if(hundreds==0){
        cur.score = thousands + 'k'
      }
      else{
        cur.score = thousands + '.' + hundreds + 'k'
      }
    }
    const comment = Comment({
      left_padding: initial_shift + shift_diff * depth,
      post_link: 'https://reddit.com' + cur.permalink,
      author_name: cur.author,
      author_class: cur.is_submitter ? 'authorname bold': 'authorname',
      comment_points: cur.score,
      point_plural: cur.score == 1 ? '':'s',
      time_ago: timeDifference(now, cur.created_utc*1000),
      body: he.decode(cur.body_html),
    })
    out.push(comment)
    if(cur.replies){
      replies = cur.replies.data.children
      for(let i = replies.length-1; i>=0; i--){
        if(replies[i].data.body_html)
          comment_q.push({
            cur: replies[i].data,
            depth: depth + 1
          })
      }
    }

  }


  div.innerHTML = out.join('\n')
}

function tryJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
      console.log("FAILED PARSING")
        return false;
    }
}


function timeDifference(current, previous) {

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.floor(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.floor(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.floor(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return Math.floor(elapsed/msPerYear ) + ' years ago';
    }
}


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
