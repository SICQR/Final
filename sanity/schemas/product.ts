export default {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "images", type: "array", of: [{ type: "image" }], title: "Images" },
    { name: "price", type: "number", title: "Price" },
    { name: "sizes", type: "array", of: [{ type: "string" }], title: "Sizes" },
    { name: "collectionRef", type: "reference", to: [{ type: "collection" }], title: "Collection" },
    { name: "copy", type: "text", title: "Copy" },
    { name: "availability", type: "string", title: "Availability" },
  ],
};
