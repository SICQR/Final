export default {
  name: "membersHero",
  title: "Members Hero",
  type: "document",
  fields: [
    { name: "headline", type: "string", validation: (R:any)=>R.required() },
    { name: "subhead", type: "string" },
    { name: "imageMobile", type: "image", options: { hotspot: true } },
    { name: "imageDesktop", type: "image", options: { hotspot: true } },
    { name: "ctaPrimaryLabel", type: "string", initialValue: "JOIN WITH TELEGRAM" },
    { name: "ctaPrimaryHref", type: "string", initialValue: "/api/auth/telegram/start" },
    { name: "ctaSecondaryLabel", type: "string", initialValue: "ALREADY A MEMBER? ENTER" },
    { name: "ctaSecondaryHref", type: "string", initialValue: "/members/xxx" }
  ]
};
