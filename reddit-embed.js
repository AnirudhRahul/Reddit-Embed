
function embed(url, div){
  cached_json = tryJson(sessionStorage.getItem(url))

  if (cached_json) {
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
  out.push('<h5>'+sr_name+'</h5>')

  title = post.title
  // out.push('<h3>'+title+'</h3>')

  link = post.url
  out.push('<a href="'+ link +'"><h3>'+ title +'</h3></a>')

  console.log(post)
  console.log(comments)

  skip = 1
  for(i in comments){
    const cur = comments[i].data
    if(i<skip || !cur.body_html)
      continue
    const html = he.decode(cur.body_html)
    console.log(html)
    out.push(html)
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
