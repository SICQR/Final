export const DROP_BY_SLUG = `
*[_type == "drop" && slug.current == $slug][0]{
  title,
  slug,
  collection,
  heroImage,
  alt,
  description,
  priceGBP,
  inventory,
  publishAt,
  isLive,
  affiliateEnabled,
  affiliatePercent,
  qrTarget,
  careTag,
  regionalRestrictions
}
`;

export const UPCOMING_SHOWS = `
*[_type == "show" && publishAt > now()] | order(publishAt asc)[0...3]{
  title,
  publishAt,
  dj->{name, bio, image}
}
`;
