/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: import.meta.resolve("stream-browserify"),
        crypto: import.meta.resolve("crypto-browserify"),
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
        }),
        new webpack.NormalModuleReplacementPlugin(/node:crypto/, resource => {
          resource.request = resource.request.replace(/^node:/, "");
        }),
      );
    }
    return config;
  },
};

export default nextConfig;
