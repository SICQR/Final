export default {
  name: "policy",
  type: "document",
  title: "Policy",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
    { name: "content", type: "text", title: "Content" },
  ],
};
