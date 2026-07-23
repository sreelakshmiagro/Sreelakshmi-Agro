import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remote patterns for images (Supabase storage & Unsplash avatars optimization)
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Security Headers implementation (Production only to keep dev HMR fast)
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google-analytics.com https://*.googletagmanager.com;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://*.google-analytics.com https://maps.gstatic.com https://maps.googleapis.com;",
              "font-src 'self' data:;",
              "connect-src 'self' https://*.supabase.co https://*.google-analytics.com;",
              "frame-src 'self' https://www.google.com https://maps.google.com https://*.google.com;",
              "object-src 'none';",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
