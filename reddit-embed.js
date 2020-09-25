
function embed(url, div){
  cached_json = tryJson(sessionStorage.getItem(url))

  if (cached_json) {
    console.log("Cached")
    process_data(cached_json, div)
  }
  else{
    console.log("Requesting JSON from reddit: " + url)
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => {
      console.log('Response:\n' + xhr.responseText)
      sessionStorage.setItem(url, xhr.responseText);
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

  sr_name = post.subreddit_name_prefixed
  // out.push('<h3>'+sr_name+'</h5>')

  title = post.title
  // out.push('<h3>'+title+'</h3>')

  link = 'https://reddit.com' + post.permalink
  out.push('<a href="'+ link +'"><h1>'+ title +'</h1></a>')

  console.log(post)
  console.log(comments)

  const now = Date.now()
  skip = 1
  for(i in comments){
    if(i<skip || !comments[i].data.body_html)
      continue
    const cur = comments[i].data
    const user_url = 'https://reddit.com' + cur.permalink
    console.log(user_url)
    const time_created = cur.created_utc
    const timeago = timeDifference(now, time_created*1000)
    const commentDiv = [
      '<div>',
          '<div class="user text-muted">',
              '<a href="'+user_url+'">' + cur.author + '</a>',
              '<span class="comment-meta"> Points ' + cur.score + '</span>',
              '<span class="comment-meta"><strong>&#183;</strong></span> ',
              '<span class="comment-meta">' + timeago + '</span>',
          '</div>',
      he.decode(cur.body_html),
      '</div>',
    ].join('\n')

    out.push(commentDiv)
  }


  div.innerHTML = out.join('\n')
}

function tryJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return false;
    }
}


function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';
    }
}
