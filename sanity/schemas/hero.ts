export default {
  name: "hero",
  type: "document",
  title: "Hero",
  fields: [
    { name: "headline", type: "string", title: "Headline" },
    { name: "subhead", type: "string", title: "Subhead" },
    { name: "image", type: "image", title: "Image" },
    { name: "ctas", type: "array", of: [{ type: "string" }], title: "CTAs" },
  ],
};
