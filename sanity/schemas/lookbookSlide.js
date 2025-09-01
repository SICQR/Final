export default {
  name: "lookbookSlide",
  title: "Lookbook Slide",
  type: "document",
  fields: [
    { name: "image", type: "image", title: "Image" },
    { name: "title", type: "string", title: "Title" },
    { name: "subtitle", type: "string", title: "Subtitle" },
    { name: "font", type: "string", title: "Font Class" },
    { name: "color", type: "string", title: "Font Color" },
    { name: "overlay", type: "string", title: "Overlay Class" },
    { name: "video", type: "url", title: "Overlay Video URL", options: { isHighlighted: true } }
  ]
};