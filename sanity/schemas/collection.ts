export default {
  name: "collection",
  type: "document",
  title: "Collection",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "tagline", type: "string", title: "Tagline" },
    { name: "image", type: "image", title: "Image" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
  ],
};
