# srt.js

> Let the html5 video player support .srt format subtitles.

## Demo
[Demo](https://blog.zhw-island.com/srt.js/)

## Install

```
$ npm install --save @zhw2590582/srt.js
```

OR umd builds are also available

```html
<script src="path/to/srt.js"></script>
```

## Usage

#### html

```html
<video class="video" src="path/to/file.mp4"></video>
```

#### js
```js
import SrtJs from '@zhw2590582/srt.js';

new SrtJs({
  videoElement: '.video',
  subtitles: [
    {
      default: true,
      src: './subtitle/english-subtitles.srt',
      label: 'English srt subtitles',
      kind: 'subtitles',
      srclang: 'en'
    },
    {
      src: './subtitle/english-subtitles.vtt',
      label: 'English vtt subtitles',
      kind: 'subtitles',
      srclang: 'en'
    }
  ]
});
```

## Global polyfill

```js
import SrtJs from '@zhw2590582/srt.js';

SrtJs.polyfill()
```

[Polyfill Demo](https://blog.zhw-island.com/srt.js/polyfill.html)
## License

MIT © [Harvey Zack](https://www.zhw-island.com/)
