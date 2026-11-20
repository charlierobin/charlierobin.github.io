# my brain hurts

[Hello, Mr Gumby](https://www.youtube.com/watch?v=1ybAw78mStI).

Boy, it’s hard to think of anything particularly intelligent or helpful to say about this repository. But it’s a cold(ish) very rainy day, I can’t go on a bike ride, I can’t take the dog for a walk, so it’s time for a cup of tea and here we go…

It’s all the source code (and some of the assets) for the site at [charlierobin.com](https://charlierobin.com/)

It started out as a single page, just when GitHub Pages came into being, and I’ve added pages here and there, whenever I’ve been in the mood for some fun, learning something new, or mere experimentation.

But what specifically is worth README-ing about it? Who knows…

## index.html

### setTimeout to delay loading of some elements

Using `setTimeout` to incrementally delay the loading of some of the “fancier” page elements. I’ve never bothered with anything like that: when I first did the page, it just loaded up everything in one go. So one quiet rainy afternoon, after seeing a comment about something like this on a forum somewhere, I added this little experiment. Seems to work okay.

### the leftmost canvas with growing squares

I originally had an abstract image as the leftmost thing on the homepage, then tried to replace it with a 3D video. But the video was rubbish, both design wise (I just could not get it looking the way I wanted), and technically: I could not get the playback of the video, including looping, to work the way I wanted: as a background element, sized and cropped, but also responding correctly to browser window resizing and change of aspect ratio (portrait to landscape). Pretty frustrating, and I lost interest in working any more on it.

So I did this thing with the spinning random squares, as a simple Javascript drawing onto a canvas element.

There’s not much more to it, it’s just the basic `setInterval(updateFunction, interval)` type of thing.

### the world with the loaded kmls: x3dom

This has always seemed to work okay: using [x3dom](https://www.x3dom.org) to load up a simple textured earth, and then (after a delay, see above) loading up some kmls to overlay it.

The basic globe is:

```
<x3d width="100%" height="100%">
    <scene>

        <viewpoint position="0 0 3" orientation="0 0 1 0" description="camera"></viewpoint>

        <shape>
            <appearance>
                <imageTexture url="images/earth-dark.jpg"></imageTexture>
            </appearance>
            <sphere></sphere>
        </shape>

        <transform rotation='1,0,0,-1.57'>
            <transform rotation='0,0,1,-1.57' id="transform">
            </transform>
        </transform>

    </scene>
</x3d>
```

The overlays are loaded using `com.charlierobin.loadKMLFiles()` and `com.charlierobin.loadKML(x)` from [common.js](https://github.com/charlierobin/charlierobin.github.io/blob/master/js/common.js).

That’s about it for the home page, I think. I still like the way the page works landscape, laid out with a grid, and then for a responsive switch to a smaller screen it just becomes a much simpler one-column-everything-sequentially-listed-layout. (Even though I’ve slowly come to realise that this layout is not that great for some of the other pages, as they’ve slowly been added over the years, but we’ll come to that below.

For all of the pages, I used [RealFaviconGenerator](https://realfavicongenerator.net/). (I think?)

## archaeology.html

(the `old work` [link](https://charlierobin.com/archaeology.html) – and yes, that IS [a picture of me](https://charlierobin.com/pictures/me_in_mali.jpg) as a kid in Africa, at the [school](https://www.google.com/maps/place/Complex+School+Pbdr/@13.2956133,-4.8992908,17z/data=!3m1!4b1!4m6!3m5!1s0xe37e55bffffffff:0xa029a10dda4efa52!8m2!3d13.2956081!4d-4.8967105!16s%2Fg%2F11c1xd2l0h?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D) I attended)

This page is such a failure. The first version was just a huge landscape page of all the images, which stretched out so far that most of the time it never even loaded correctly. Then I changed it to the current incarnation, which only loads a few, with a `>>` “more” affordance for the next tranche/batch, so on and so on until the bitter end. This one is just as bad as the old one.

The best thing about this page is the old MacTemps BBC Multimedia timesheets I found when poking through a load of old scans, together with a couple of scans of old software boxes and business cards. That was all a trip down memory lane.

Bad as that this is, I thought it couldn’t be any worse when I started messing around with the idea for the replacement:

## archaeology_new.html

Turns out I was wrong, it COULD be worse: [a lot lot worse](https://charlierobin.com/archaeology_new.html).

Quite what I had in mind when I did this I don’t know. There was a vague idea of lots little thumbnails, clicking/dragging on them to call them out, and then being able to position them, and alt-drag on them to rotate and scale. Why oh why oh why? So it’s been officially abandoned.

It’s basically all done in [JQuery](https://jquery.com/), which I still really like.

I do have an idea for the replacement, though. And this time around I have a little more confidence that it’ll fit in better with the overall design of the rest of the site. And I might do it in [AngularJS](https://angularjs.org/), simply because I also still really like [AngularJS](https://angularjs.org/). Unlike [Angular](https://angular.dev/).

## gallery.html

[This page](https://charlierobin.com/gallery.html) kind of works, I think. Javascript looks at URL prams, eg:

`gallery.html?s=1,2,3,4,5,6,7,8`

… and displays those pictures. If there are no params, it just displays random pics. Reload gets the next random batch, but though a URL with params, as I wanted your “history” of viewed pictures to be preserved in your browser, er, history.

Or you can step forwards and backwards between pages of pics, going through the whole list in linear fashion.

It’s half a solution; not as bad as `archaeology.html`, but still not great. I didn’t even really plan on having pictures on the site, but Panoramio – where they all originally lived, mostly – was shut down, and so here they are.

## standalone-video-gallery.html

[All the video links go to this page](https://charlierobin.com/standalone-video-gallery.html), which uses Javascript and [VideoJS](https://videojs.org/). If there’s a param in the URL, it loads that video. If there’s no param, it just cues up a default (which is itself a really old showreel from circa 2010 or something).

There is, however, a [newer video page](https://charlierobin.com/videos.html) I’ve been playing around with:

## videos.html

The artwork is, of course, you guessed it, courtesy of [ChatGPT](https://chatgpt.com), because I was very curious about all this new generative AI.

(How can anyone not love ChatGPT? It’s the best thing since sliced bread.)

The first version used the background image with a CSS grid layout laid over the top, but since ChatGPT seemed to have great difficulty understanding that its rows/columns should all line up nicely, that was not a success, and the overlaid CSS never matched up properly.

This version uses the image in a SVG element, with the links also defined within the same. This means that they all move and scale perfectly in sync.

Using:

```
#map {
  width: min(100%, calc((100vh - (var(--homeLinkFontSize) * 2)) * (2500 / 1700)));
  height: auto;
  display: block;
  margin: 0 auto;
}
```
… ensures that the clickable map stays nicely position and scaled taking up the whole browser window, without getting cropped off the bottom if the user doesn’t observe the “ideal” aspect ratio.

Collapsing down to a mobile-phone sized screen switches over to a simpler list view.

All the links just go straight through to the video itself. Although I do like [VideoJS](https://videojs.org/), and the controls etc it provides, I guess I also have this thing about [replacing the user’s platform’s own native controls when it comes to things like videos](https://news.ycombinator.com/item?id=47506713), scrollbars, etc. If they’re on iOS, they get to see the iOS controls they are already familiar with. If they’re on Windows, they see the Windows controls. And so on. But judging by most of the websites I see out there, I get the feeling I very much have the minority opinion on this topic.

## software-gallery.html

[This](https://charlierobin.com/software-gallery.html) page is only here as something that Google can spider from to a few of my GitHub repositories.

But…

## software.html

This is here to be what will hopefully eventually be [a decent replacement for the above](https://charlierobin.com/software.html). Modelled on the new videos page, just with a different (but still [ChatGPT](https://chatgpt.com) generated) background.

## wanderlust.html

Linked to from the globe on the home page, just a [standalone version](https://charlierobin.com/wanderlust.html) of the same, still using [x3dom](https://www.x3dom.org/) (also [here](https://www.web3d.org/x3dom-framework)).





<img width="800" height="600" alt="me_in_mali" src="https://github.com/user-attachments/assets/c8bd877f-5e17-4cbc-ab14-f1c4ed44d13d" />
