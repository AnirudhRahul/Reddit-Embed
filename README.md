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
Visual indicator for spoiler links

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
