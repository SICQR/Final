exports.formatShopifyMessage = (body) => {
  // Example formatting, customize for your needs
  return `Shopify event received:\n${JSON.stringify(body, null, 2)}`;
};

exports.formatRadioKingMessage = (body) => {
  // Example formatting, customize for your needs
  return `Radio King event received:\n${JSON.stringify(body, null, 2)}`;
};