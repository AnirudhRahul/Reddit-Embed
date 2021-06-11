
<p align="center">
<img src="https://github.com/AnirudhRahul/Reddit-Embed/blob/master/header.png?raw=true" height="60px"/>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/reddit-embed">
    <img src="https://badge.fury.io/js/reddit-embed.svg">
  </a>
  <a href="https://github.com/AnirudhRahul/Reddit-Embed/blob/master/LICENSE">
      <img src="https://img.shields.io/apm/l/atomic-design-ui.svg">
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)">
  </a>
</p>


<p align="center">
A javascript plugin that lets you natively embed reddit posts/comments onto any website
</p>

<p align="center">
<img src="https://github.com/AnirudhRahul/Reddit-Embed/blob/master/reddit_embed_example_2.png?raw=true" style="max-height:500px"/>
</p>


## Features
* No Reddit API key needed!

* No installation necessary, works perfectly through a CDN

* Easily customizable color palette

* Client-side rendered

* Easy to use

## Installation

Via [npm](https://www.npmjs.com/package/reddit-embed):

```
npm install reddit-embed
```

```HTML
<link rel="stylesheet" href="node_modules/reddit-embed/css/red.css"/>
<link rel="stylesheet" href="node_modules/reddit-embed/css/light-theme.css"/>
<script src ="node_modules/reddit-embed/dist/bundle.min.js"></script>
```


Via CDN:

```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed@1.1.2/css/red.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed@1.1.2/css/light-theme.css"/>
<script src ="https://cdn.jsdelivr.net/npm/reddit-embed@1.1.2"></script>
```

## Demos

* https://anirudhrahul.github.io/Reddit-Embed/

* https://anirudhrahul.github.io/Reddit-Embed/demos/basic_demo.html

## Testing

If you want to see what a variety of different posts look like when they are embedded I would recommend checking out [test_links.md](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/test_links.md)


# Documentation

## Getting Started
First your need to find a reddit post you want to embed.
Once you have found a post copy the url and add /about.json to the end so it looks something like this:

`https://www.reddit.com/r/pics/comments/7pnxv2/meeting_keanu_reeves_at_a_traffic_light/about.json`

Then you can just add this markup to your website with your own `red-href`, `red-title`, `red-author` attributes filled in

```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed@1.1.2/css/red.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed@1.1.2/css/light-theme.css"/>
<script src ="https://cdn.jsdelivr.net/npm/reddit-embed@1.1.2"></script>
<script>
  window.onload = red.embedAll
</script>
<div class="reddit-embed center" red-author="keanu_reeves"
red-title="Meeting Keanu Reeves at a traffic light"
red-href="https://www.reddit.com/r/pics/comments/7pnxv2/meeting_keanu_reeves_at_a_traffic_light/about.json" ></div>

```
Note that we have to import light-theme.css because red.css defaults to a dark theme with white text

If you want a similar basic example, with some more detailed documentation go  to [basic-demo.html](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/demos/basic_demo.html)

If you want an even more advanced example you can take a look at the [source for the GH pages demo](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/index.html)

## Methods
### `red.embed(url, div, opts = defaults)`
* `url` : absolute url that points to an about.json file for a reddit post
* `div` : javascript DOM element that we want to add content to
* `opts`: optional argument, specifying any options we want to override from the defaults

Sends an xhr request to get the json file from `url`

And then renders the content received onto `div`

### `red.embedAll()`
Loops through reddit-embed divs, and calls `red.embed` on them if they have a valid link in their `red-href` attribute.

Also note that a `red-opts` attribute containing a JSON object of options to override from default is also supported.

Note that this function should only be called after a page's HTML has finished loading

### `red.setDefaults(newDefaults)`
* `newDefaults`: An object containing all or some of the options specified in the section below

Can be called before a page is finished loading


## Options
*  `show_loading_animation: true`
	* Type: Boolean
*  `post_title: false`
	* Type: false or String
	* If this value is set to a string then it will override the title of the post
	* Can be useful if you want to prevent content jumping
	* Can be set through the `red-title` attribute if using `res.embedAll()`
*  `post_author: false`
	* Type: false or String
	* If this value is set to a string then it will override the name of the post author
	* Can be set through the `red-author` attribute if using `res.embedAll()`
*  `show_post: true`
	* Type: Boolean
	* Overrides all other show_post options if set to false
*  `show_post_title: true`
	* Type: Boolean
*  `show_post_header: true`
	* Type: Boolean
*  `show_post_body: true`
	* Type: Boolean
*  `show_comments_section: true`
	* Type: Boolean
	* Overrides all other show_comments_section options if set to false
*  `show_comments_section_header: true`
	* Type: Boolean
*  `ignore_sticky_comments: false`
	* Type: Boolean
	* Will skip any stickied comments in the render queue
*  `max_depth: -1`
	* Type: Integer
	* Will only render comments with a depth <= max_depth, note that depth is 0 indexed so max_depth=0 will render the top layer of comments
	* max_depth is ignored if its < 0
*  `open_links_in_new_tab: true`
	* Type: Boolean
*  `padding_per_depth: 24`
	* Type: Integer
	* Horizontal spacing in px between each layer of comments
*  `initial_padding: 4`
	* Type: Integer
	* Horizontal spacing in px for first layer of comments
*  `improve_spoiler_links: true`
	* Type: Boolean
	* Adds a Visual indicator for spoiler links

	![Spoiler Link Demonstration](https://media.giphy.com/media/3TxpzkvjxlSSm97ROw/giphy.gif)


  Note if you want to quickly try out different options you can use the `Settings` button on the [GH pages demo](https://anirudhrahul.github.io/Reddit-Embed/)





## Styling Tips
Some css attributes you may want to override are:
```css
/* Max width for reddit-embed  div*/
.reddit-embed {
  max-width: 800px;
}

.reddit-embed img{
	max-height: 840px;
}

.reddit-embed video[poster]{
	max-height: 720px;
}
```
These values were chosen because they closely resemble the size of their respective elements on reddit, but these defaults may not be the best fit for your website


## Color Palettes
Making your own color palette for Reddit-Embed is as simple as creating a css file

Create a css file similar to [css/dark-theme.css](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/css/dark-theme.css) or [css/light-theme.css](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/css/light-theme.css) by modifying the colors of each css variable

Then import your palette css file **after** red.css

```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed/css/red.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed/css/light-theme.css"/>
```

## Unstrict CSS
By default red.css uses !important to ovveride any CSS selectors targeting elements within a .reddit-embed div, but if you don't want that behavior you can use unstrict-red.css

Note that the max-width property for .reddit-embed divs can be overriden in red.css


## Fork Ideas
* Make a WordPress plugin that wraps this library

## Use cases
* Add reddit posts to your blog
* Use reddit as the comment platform for your website
* Use it in a browser extension to add reddit comments to other popular websites

## Known Issues
* Native reddit videos don't play any audio

* Posts with multiple images or videos are not supported


## Build Instructions
Make sure you have node 12+ and npm 6+ installed in your environment.


Install the build dependecies by running:
```
npm install
```
Then use the following command to build `bundle.js` and `bundle.min.js`
```
npm run build
```
