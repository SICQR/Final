exports.logEvent = (service, payload) => {
  console.log(`[${service}] Event:`, JSON.stringify(payload, null, 2));
};