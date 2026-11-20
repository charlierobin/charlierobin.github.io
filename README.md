# my brain hurts

Boy, it’s hard to think of anything particularly intelligent or helpful to say about this repository.

It’s all the source code (and some of the assets) for the site at [charlierobin.com](https://charlierobin.com/)

It started out as a single page, just when GitHub Pages came into being, and I’ve just sort of added pages here and there, whenever I’ve been in the mood for some fun or experimentation.

But what specifically is worth README-ing about it? Who knows…

## index.html

### setTimeout to delay loading of some elements

Using `setTimeout` to incrementally delay the loading of some of the “fancier” page elements. I’ve never bothered with anything like that: when I first did the page, it just loaded up everything in one go. So one quiet rainy afternoon, after seeing a comment about something like this on a forum somewhere, I added this little experiment. Seems to work okay.

### the leftmost canvas with growing squares

I originally had an abstract image as the leftmost thing on the homepage, then tried to replace it with a 3D video. But the video was rubbish, both design wise (I just could not get it looking the way I wanted), and technically: I could not get the playback of the video, including looping, to work the way I wanted: as a background element, sized and cropped, but also responding correctly to browser window resizing and change of aspect ratio (portrait to landscape). Pretty frustrating, and I lost interest in working any more on it.

SO I did this thing with the spinning random squares, as a simple Javascript drawing onto a canvas element.

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

That’s about it for the home page, I think. I like the way the page works landscape, laid out with a grid, and then for a responsive switch to a smaller screen it just becomes a much simpler one-column-everything-sequentially-listed-layout.

For all of the pages, I used [RealFaviconGenerator](https://realfavicongenerator.net/). (I think?)
