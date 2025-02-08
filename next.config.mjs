import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const nextConfig = {
  webpack(config, { isServer }) {
    // Ensure mini-css-extract-plugin is only added for client-side bundling
    if (!isServer) {
      config.plugins.push(new MiniCssExtractPlugin());
    }
    return config;
  },
};

export default nextConfig;
