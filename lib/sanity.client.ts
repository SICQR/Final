import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2023-01-01',
});

export default client;
