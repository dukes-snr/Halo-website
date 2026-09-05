import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  // The dev badge sits exactly where the landing page's bottom strap lives.
  devIndicators: false,
};

export default nextConfig;
