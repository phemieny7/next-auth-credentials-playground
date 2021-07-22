module.exports = {
  // target: 'serverless',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.externals.push('mongodb')
    return config
  },
}
