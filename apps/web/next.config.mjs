import { fileURLToPath } from "url";
import createJiti from "jiti";
import { withContentlayer } from "next-contentlayer";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@designali/api",
    "@designali/auth",
    "@designali/emails",
    "@designali/db",
    "@designali/ui",
    "@designali/validators",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "khhamnquzieyqedqyvfw.supabase.co",
      },
    ],
    domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
  },

  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
    ],
    optimizePackageImports: ["@tremor/react"],
    // FIXME: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    missingSuspenseWithCSRBailout: false,
  },

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withContentlayer(nextConfig);
