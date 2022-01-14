/** @type {import('next').NextConfig} */
module.exports = {
  target: "serverless",
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/nasapage/1",
        permanent: true,
      },
      {
        source: "/nasapage",
        destination: "/nasapage/1",
        permanent: true,
      },

    ];
  },
};
