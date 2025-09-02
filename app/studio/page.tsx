import { NextStudio } from 'next-sanity/studio';
import config from './sanity.config';

export const dynamic = 'force-static';

export default function Studio() {
  return <NextStudio config={config} />;
}
