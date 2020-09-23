function embed(url){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    // Request finished. Do processing here.
    console.log(xhr.responseText)
  };

  xhr.send();

}
