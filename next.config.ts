import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog-news/scholarships-international-students-guide",
        destination:
          "/blog-news/scholarships-for-nigerian-students-study-abroad",
        permanent: true,
      },
      {
        source: "/blog-news/uk-student-visa-guide-nigerian-students",
        destination: "/blog-news/uk-student-visa-requirements-nigeria",
        permanent: true,
      },
      {
        source: "/blog-news/top-10-tips-studying-abroad-2025",
        destination: "/blog-news/study-in-uk-from-nigeria",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
