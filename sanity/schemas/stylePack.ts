export default {
  name: "stylePack",
  type: "document",
  title: "Style Pack",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "mode", type: "string", title: "Mode", options: { list: [
      { title: "Brutalist Day", value: "brutalistDay" },
      { title: "Night Radio", value: "nightRadio" },
      { title: "Editorial Lookbook", value: "editorialLookbook" }
    ] } },
    { name: "colors", type: "object", title: "Colors" },
    { name: "type", type: "string", title: "Type" },
    { name: "radius", type: "number", title: "Radius" },
    { name: "shadow", type: "string", title: "Shadow" },
    { name: "motionMs", type: "number", title: "Motion (ms)" },
    { name: "audioPackRef", type: "reference", to: [{ type: "audioPack" }], title: "Audio Pack" },
  ],
};
