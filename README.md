# Reddit-Embed
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)  

<p align="center">
<img src="https://github.com/AnirudhRahul/Reddit-Embed/blob/master/reddit-embed-example.png?raw=true"/>
</p>

Reddit-Embed is a javascript plugin that lets you embed reddit posts onto your website, through the power of client-side rendering.

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

# Documentation

## Getting Started

## Options

*  `show_post: Boolean`
	* Overrides all other show_post options if set to false
*  `show_post_title: Boolean`
*  `show_post_header: Boolean`
*  `show_post_body: Boolean`
*  `show_comments_section: Boolean`
*  `show_comments_section_header: Boolean`
*  `ignore_sticky_comments: Boolean`
	* Will skip stick comments in the render queue
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


## Testing

If you want to see what a variety of different posts look like when they are embedded I would reccomend checking out [test_links.md](https://github.com/AnirudhRahul/Reddit-Embed/blob/master/test_links.md)



## Demos

* https://anirudhrahul.github.io/Reddit-Embed/


* https://anirudhrahul.github.io/Reddit-Embed/demos/basic_demo.html


## Fork Ideas
* Make a wordpress plugin that wraps this library

## Use cases
* Add reddit posts to your blog
* Use reddit as the comment platform for your website
* Use it in a browser extension to add reddit comments to other popular websites

## Known Issues
* Native reddit videos don't play any audio

* Posts with multiple images or videos are not supported
