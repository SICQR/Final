export default {
  name: "audioPack",
  type: "document",
  title: "Audio Pack",
  fields: [
    { name: "intro", type: "string", title: "Intro" },
    { name: "outro", type: "string", title: "Outro" },
    { name: "stingers", type: "array", of: [{ type: "string" }], title: "Stingers" },
    { name: "ttsVoice", type: "string", title: "TTS Voice" },
  ],
};
