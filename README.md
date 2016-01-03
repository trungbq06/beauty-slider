# Beauty Slider jQuery plugin 1.0.0

A very simple and easy to use jQuery slider plugin

##Installation

###Step 1: Link required files

Like every jQuery plugins, this plugin need jQuery core library. This can be attach directly from Google as below. Then download btslider plugin from this site and copy to your project.

```html
<!-- jQuery library (served from Google) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- btSlider Javascript file -->
<script src="/js/jquery.btslider.min.js"></script>
<!-- btSlider CSS file -->
<link href="/css/jquery.btslider.css" rel="stylesheet" />
```

###Step 2: Create HTML page

Create HTML as below

```html
<ul class="btslider">
  <li><img src="imgs/image_1.jpg" /></li>
  <li><img src="imgs/image_1.jpg" /></li>
  <li><img src="imgs/image_1.jpg" /></li>
  <li><img src="imgs/image_1.jpg" /></li>
</ul>
```

###Step 3: Call the btSlider

Call btSlider as below

```javascript
$(document).ready(function(){
  $('.btslider').btSlider();
});
```
