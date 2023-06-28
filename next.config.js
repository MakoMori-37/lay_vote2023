/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/app/layvote2023",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  exportPathMap: async function () {
    const paths = {
      "/": { page: "/" },
      "/gasstation": { page: "/gasstation" },
      "/vending": { page: "/vending" },
      "/dashboard": { page: "/dashboard" },
      "/station": { page: "/station" },
      "/machine": { page: "/machine" },
    };

    return paths;
  },
  trailingSlash: true,
  env: {
    API_BASE: "https://www.gforcesolution.com/app/layvote2023/api/v1",
    HOST: "https://www.gforcesolution.com/app/layvote2023",
  },
};

module.exports = nextConfig;
