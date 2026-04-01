import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** App root so Turbopack resolves `node_modules` from this folder (not a parent `package.json`). */
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const nextConfig: NextConfig = {
  /**
   * When you open the dev app from another device (e.g. http://192.168.1.18:3000),
   * Next must allow that host for /_next/webpack-hmr or Fast Refresh will not run.
   * Add your LAN IP here if it changes (router DHCP).
   */
  allowedDevOrigins: ["192.168.1.18"],
  turbopack: {
    root: projectRoot,
  },
  /**
   * Projects under `Pictures` are often OneDrive-synced; native FS watchers miss saves.
   * Polling makes `next dev` see CSS/component edits. Opt out: NEXT_DISABLE_POLL=1
   */
  watchOptions:
    process.env.NEXT_DISABLE_POLL === "1"
      ? undefined
      : { pollIntervalMs: 500 },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 500,
        aggregateTimeout: 200,
      };
    }
    return config;
  },
};

export default nextConfig;
