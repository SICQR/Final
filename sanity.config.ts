import { defineConfig } from "sanity";
import schemas from "./schemas";

export default defineConfig({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  title: "HOTMESS CMS",
  schema: {
    types: schemas,
  },
  plugins: [],
});