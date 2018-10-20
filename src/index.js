class SrtJs {
  constructor(option) {
    this.option = Object.assign({}, SrtJs.DEFAULTS, option);
    this.init();
  }

  static get version() {
    return '__VERSION__';
  }

  static get DEFAULTS() {
    return {
      videoElement: '',
      subtitles: []
    };
  }

  static polyfill() {
    Object.getOwnPropertyNames(this.prototype).forEach(method => {
      if (method !== 'constructor') {
        this[method] = this.prototype[method].bind(this);
      }
    });

    this.$videos = Array.from(document.querySelectorAll('video'));
    this.$videos.forEach($video => {
      this.changeTrack($video);
    });
  }

  init() {
    this.$video = this.getElement(this.option.videoElement);
    this.option.subtitles.forEach(subtitle => {
      this.creatTrack(subtitle);
    });
  }

  getElement(query) {
    return query instanceof Element ? query : document.querySelector(query);
  }

  changeTrack($video) {
    const $tracks = Array.from($video.querySelectorAll('track'));
    $tracks.forEach($track => {
      this.fetchUrl($track.src).then(data => {
        if ($track.src !== data) {
          $track.src = data;
        }
      });
    });
  }

  creatTrack(subtitle) {
    const $track = document.createElement('track');

    if (subtitle.label) {
      $track.label = subtitle.label;
    }

    if (subtitle.kind) {
      $track.kind = subtitle.kind;
    }

    if (subtitle.srclang) {
      $track.srclang = subtitle.srclang;
    }

    if (subtitle.default) {
      $track.default = subtitle.default;
    }

    if (subtitle.src) {
      this.fetchUrl(subtitle.src).then(data => {
        $track.src = data;
        this.$video.appendChild($track);
      });
    }
  }

  fetchUrl(url) {
    let type;
    return fetch(url)
      .then(response => {
        type = response.headers.get('Content-Type');
        return response.text();
      })
      .then(text => {
        if ((/x-subrip/ig).test(type)) {
          return this.srtToVtt(text);
        }
        return Promise.resolve(url);
      })
      .catch(err => {
        throw err;
      });
  }

  srtToVtt(text) {
    const vttText = 'WEBVTT \r\n\r\n'.concat(text
      .replace(/\{\\([ibu])\}/g, '</$1>')
      .replace(/\{\\([ibu])1\}/g, '<$1>')
      .replace(/\{([ibu])\}/g, '<$1>')
      .replace(/\{\/([ibu])\}/g, '</$1>')
      .replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, '$1.$2')
      .concat('\r\n\r\n'));
    return URL.createObjectURL(new Blob([vttText], {
      type: 'text/vtt'
    }));
  }
}

window.SrtJs = SrtJs;
export default SrtJs;
