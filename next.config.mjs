/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "images.media-allrecipes.com",
      },
      {
        hostname: "geniuskitchen.sndimg.com",
      },
      {
        hostname: "img.sndimg.com",
      },
    ],
  },
};

export default config;
