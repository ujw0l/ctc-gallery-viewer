# ctc-gallery-viewer

A lightweight, dependency-free image gallery viewer written in vanilla JavaScript. One script provides the complete responsive UI—no separate CSS file is required.

## Features

- Responsive desktop and mobile layouts
- Main image centered precisely in the overlay while preserving its natural aspect ratio
- Vertically centered desktop thumbnail rail and horizontally centered mobile thumbnail strip
- Caption and toolbar aligned to the image centerline
- Keyboard navigation and accessible dialog controls
- Touch swipe, thumbnail navigation and image preloading
- Zoom, slideshow, first/last and previous/next controls
- Captions from `title` or `data-caption`
- Reduced-motion support and focus management
- No runtime dependencies

## Install

```sh
npm install ctc-gallery-viewer
```

Or download and include the standalone file:

```html
<script src="ctc_overlay.min.js"></script>
```

## Usage

```html
<div class="my-gallery">
  <img src="one.jpg" alt="Mountain at sunrise" title="Mountain at sunrise">
  <img src="two.jpg" alt="Forest trail" data-caption="A quiet forest trail">
</div>

<script src="ctc_overlay.min.js"></script>
<script>
  const viewer = new ctcOverlayViewer('.my-gallery');
</script>
```

The selector can match multiple gallery wrappers. Each gallery is handled independently.

On desktop, thumbnails appear in a vertically centered sidebar. On smaller screens, they automatically switch to a horizontally centered, scrollable strip. The displayed image remains centered in the viewport, with its caption and toolbar centered directly beneath it.

## Options

```js
const viewer = new ctcOverlayViewer('.my-gallery', {
  slideshowInterval: 3000,
  closeOnBackdrop: true,
  loop: true
});
```

| Option | Default | Description |
| --- | --- | --- |
| `slideshowInterval` | `3000` | Time between slideshow images in milliseconds (minimum 1000) |
| `closeOnBackdrop` | `true` | Close when the dimmed backdrop is clicked |
| `loop` | `true` | Wrap around at the first and last images |

## Controls

| Input | Action |
| --- | --- |
| Left / Right arrow | Previous / next image |
| Up / Down arrow | Zoom in / out |
| Home / End | First / last image |
| Space | Start / pause slideshow |
| Escape | Close viewer |
| Swipe | Previous / next image on touch screens |

The legacy constructor, global class name and control element IDs remain available for compatibility. Call `viewer.destroy()` when removing a viewer from a single-page application.

## Development

```sh
npm install
npm run build
npm test
```

Open `demo/index.html` to preview the viewer.

## License

MIT © UjW0L
