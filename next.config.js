module.exports = {
  // target: 'serverless',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.externals.push('mongodb', 'hdb-pool', 'mysql')
    return config
  },
}
