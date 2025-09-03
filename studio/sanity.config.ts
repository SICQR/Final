import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  projectId: 'l8ib0sg6',
  dataset: 'production',
  title: 'Hotmess Studio',
  plugins: [deskTool(), visionTool()],
})
