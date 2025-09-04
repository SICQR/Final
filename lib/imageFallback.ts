export function withImageFallback(src?:string, fallback="/images/placeholder.svg"){return src&&src.length?src:fallback}

export const resolvePublicImage = withImageFallback;
