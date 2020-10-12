# Reddit-Embed
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)  

<p align="center">
<img src="https://github.com/AnirudhRahul/Reddit-Embed/blob/master/reddit-embed-example.png?raw=true"/>
</p>

Reddit-Embed is a javascript plugin that lets you embed reddit posts onto your website, through the power of client side rendering.

## Features
* No Reddit API key needed!

* No installation necessary, works perfectly through a CDN

* Easily customizable color palette

* Client-side rendered

* Easy to use

## Installation

Via npm:

```
npm install reddit-embed
```

```HTML
<link rel="stylesheet" href="node_modules/reddit-embed/css/red.css"/>
<link rel="stylesheet" href="node_modules/reddit-embed/css/light-theme.css"/>
<script src="node_modules/he/he.js"></script>
<script src ="node_modules/reddit-embed/red.js"></script>
```


Via CDN:

```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed/css/red.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed/css/light-theme.css"/>
<script src="https://cdn.jsdelivr.net/npm/he@1.2.0/he.js"></script>
<script src ="https://cdn.jsdelivr.net/npm/reddit-embed/red.js"></script>
```

## Demos

* https://anirudhrahul.github.io/Reddit-Embed/

* https://anirudhrahul.github.io/Reddit-Embed/demos/basic_demo.html

## Testing

If you want to see what a variety of different posts look like when they are embedded I would reccomend checking out [test_links.md](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/test_links.md)


# Documentation

## Getting Started
First your need to find a reddit post you want to embed.
Once you have found a post copy the url and add /about.json to the end so it looks something like this:

`https://www.reddit.com/r/pics/comments/7pnxv2/meeting_keanu_reeves_at_a_traffic_light/about.json`

And then you can just add this markup to your website with the red-href attribute filled in

```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed/css/red.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed/css/light-theme.css"/>
<script src="https://cdn.jsdelivr.net/npm/he@1.2.0/he.js"></script>
<script src ="https://cdn.jsdelivr.net/npm/reddit-embed/red.js"></script>
<script>
  window.onload = red.embedAll
</script>
<div class="reddit-embed" red-href="your_link_goes_here"</div>
```
Note that we have to import light-theme.css because red.css defaults to a dark theme with white text

If you wan't a similiar basic example, with some more detailed documentaiton go  to [basic-demo.html](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/demos/basic_demo.html)

If you wan't an even more advanced example you can take a look at the [source for the GH pages demo](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/index.html)

## Methods
### red.embed(url, div, opts = defaults)
* url : absolute url that points to an about.json file for a reddit post
* div : javascript DOM element that we want to add contents to
* opts: optional arguement, specifying any options we want to override from the defaults

Embeds the contents of *url* into *div*

### red.embedAll()
Loops through reddit-embed divs, and embeds content in them if the have a valid link in their red-href attribute.

Also note that a red-opts attribute containing a JSON object of options to override from default is also supported.

Note that this function should only be called after a page's HTML has finished loading

### red.setDefaults(newDefaults)
* newDefaults: And object containing all or some of the options specified in the section below


## Options

*  `show_post: Boolean`
	* Overrides all other show_post options if set to false
*  `show_post_title: Boolean`
*  `show_post_header: Boolean`
*  `show_post_body: Boolean`
*  `show_comments_section: Boolean`
	* Overrides all other show_comments_section options if set to false
*  `show_comments_section_header: Boolean`
*  `ignore_sticky_comments: Boolean`
	* Will skip any stickied comments in the render queue
*  `max_depth: -1`
	* Will only render comments with a depth <= max_depth, note that depth is 0 indexed so max_depth=0 will render the top layer of comments
	* max_depth is ignored if its < 0
*  `open_links_in_new_tab: true`
*  `padding_per_depth: 24`
	* Horizontal spacing between each layer of comments
*  `initial_padding: 4`
	* Horizontal spacing for first layer of comments
*  `improve_spoiler_links: true`
	* Adds a Visual indicator for spoiler links 
	
	![Spoiler Link Demonstration](https://media.giphy.com/media/3TxpzkvjxlSSm97ROw/giphy.gif)






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

Create a css file similiar to [css/dark-theme.css](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/css/dark-theme.css) or [css/light-theme.css](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/css/light-theme.css) by modifying the colors of each css variable

Then import your palette css file **after** red.css

```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed/css/red.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reddit-embed/css/light-theme.css"/>
```


## Fork Ideas
* Make a wordpress plugin that wraps this library

## Use cases
* Add reddit posts to your blog
* Use reddit as the comment platform for your website
* Use it in a browser extension to add reddit comments to other popular websites

## Known Issues
* Native reddit videos don't play any audio

* Posts with multiple images or videos are not supported
