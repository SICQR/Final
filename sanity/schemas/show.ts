export default {
  name: "show",
  type: "document",
  title: "Show",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "publishAt", type: "datetime", title: "Publish At" },
    { name: "dj", type: "reference", to: [{ type: "dj" }], title: "DJ" },
  ],
};
