import { defineConfig } from "sanity";
import schemas from "./schemas";

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  console.warn("⚠️  SANITY_PROJECT_ID is not set. Sanity features will not work properly.");
}

export default defineConfig({
  projectId: projectId || "placeholder",
  dataset: dataset,
  title: "HOTMESS CMS",
  schema: {
    types: schemas,
  },
  plugins: [],
});