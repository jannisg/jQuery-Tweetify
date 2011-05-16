# jQuery Tweetify

## Purpose
A simple script that attaches to user defined elements to make them valid Tweet buttons, either using a custom generated (on the fly) href with a build in popup window script or by utilizing the default Twitter widgets.js file.

## History
I was working on a project where we had to handover code to a third party that unfortunately didn't really know what they were doing.
Since we had no choice in the matter we had to foolproof our code to the point where things were mostly automated scripts that this third party couldn't break easily yet allowed for relative customizability down the road.

Out of this necessity I created Tweetify.

## Usage
Simple create an `<a>` tag and add your data-attributes onto it.
The plugin will then take care of the rest, you can leave the attributes incomplete, for example don't mention your `data-via` attribute and instead set it globally in the js.

You can also give your button a custom graphic and all you have to do is call the plugin with `customButton = true`.

You can mix and match default twitter and custom button graphics as you please.

## Demo

### Settings

```javascript
$(document).ready(function() {

  // the default is false, so that default twitter iframes are generated.
  // In this example however we're setting it globally to default to custom graphics/text.
  $.fn.tweetify.defaults.customButton = true;

  // Show no default button, use custom generated URL to trigger popup content
  $('.tweetify').tweetify();

  // customButton = false, hence we're using twitters original.
  $('.tweetify-standard').tweetify({
    customButton : false
  });

});
```

For the purpose of the demo below, `.tweetify` is set to use a custom button graphic/text and `.tweetify-default` is using the default twitter `widgets.js` javascript that creates the `iframe` with the default button graphic inside.

---
### 1. Basic

```html
<a href="#" class="tweetify" data-text="My custom share text.">
  My Twitter Text Button.
</a>
```
    
Because we called this button with the class `.tweetify` (which is set to have a custom button graphic) we get a pure text tweet button.
On click it will trigger a `window.open` at the default twitter size, with "My custom share text." as the pre written content of the share box.
Since my plugin settings also set my twitter account as the `related` and `via` options, it will also show the `via [twittername]` in the box.

---
### 2. Custom

```html
<a href="#" class="tweetify" data-extension="/#!/hashtagbaby">
  <img src="twittericon.png" alt="" width="24" height="24" />
</a>
```
    
Once again we're using a non-default button however because we've got an image tag inside this will be the clickable target of this tweet button (you could just as well style it in your css with a background image).
You can also see a custom data attribute called `data-extension`. This is an additional attribute that is of course completely optional but does allow you to attach anything you wish after your page url.
In this case (let's assume my domain is `http://my.customdomain.com`), the shared url would become `http://my.customdomain.com/#!/hashtagbaby`.

This feature only exists because I needed to attach custom query strings indicating a certain section on a page to a couple of links so I figured I might as well give everyone the option to do the same.

---
### 3. Standard

```html
<a href="#" class="tweetify-standard" data-count="horizontal">
  Another one using the default script
</a>
```
    
As you would expect this button is simply using the default `widgets.js` that Twitter maintains.
The script will run adding your global options such as "share url" (or if unspecified use the current page url), custom `related` and `via` twitter usernames will of course honor native settings such as the `data-count` attributes as well.

Upon running (after all buttons have been looped over) the script will attach twitter's own widgets.js file to the bottom of the document.

```javascript
$('body').append('<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>')
```
    
Which will then of course recognize this as a default button and place its iframe in place of the above code.

## Todo

* Cross browser testing
* Nicer demo page