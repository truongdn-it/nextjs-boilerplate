/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error'],
          }
        : false,
  },
}
