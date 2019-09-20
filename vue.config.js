module.exports = {
  devServer: {
    proxy: {
      '/zeus': {
        target: 'http://localhost:8080/api',
        // ws: true,
        changeOrigin: true,
      },
    },
  },
};
