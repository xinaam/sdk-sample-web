const environment = "staging";
const STAGING_HOST = `https://staging.mzaalo.com`;
const PRODUCTION_HOST = `https://production.mzaalo.com`;

const host = environment === "staging" ? STAGING_HOST : PRODUCTION_HOST;

export const sdkURL = `${host}/joint-journey/sdk/mzaalo-sdk.js`;
