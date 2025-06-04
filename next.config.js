/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  pwa: {
    dest: "public",
    register: true,
  },
});

const next = () => {
  const plugins = [withPWA];
  return plugins.reduce((acc, next) => next(acc), {
    output: "export",
    swcMinify: true,
    reactStrictMode: false,

    transpilePackages: [
      "cllk",
      "@llampukaq/icons",
      "openbaas-sdk-react",
      "react-monaco-editor",
      "@react-oauth/google",
    ],
    images: { unoptimized: true },
    env: {
      GOOGLE: process.env.GOOGLE,
      OPENBAAS: process.env.OPENBAAS,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  });
};
module.exports = next;
