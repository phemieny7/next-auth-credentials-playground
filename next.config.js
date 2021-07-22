module.exports = {
  // target: 'serverless',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    // This should not be necessary in Next Auth v4
    config.externals.push(
      'mongodb',
      'hdb-pool',
      'mysql',
      'mysql2',
      'mssql',
      'oracledb',
      'pg',
      'pg-native',
      'pg-query-stream',
      'react-native-sqlite-storage',
      'redis',
      'sqlite3',
      'sql.js',
      'typeorm-aurora-data-api-driver',
      'ioredis',
      'better-sqlite3'
    )
    return config
  },
}
