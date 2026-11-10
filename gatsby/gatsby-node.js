exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        react: require('path').dirname(require.resolve('react/package.json')),
        'react-dom': require('path').dirname(require.resolve('react-dom/package.json')),
      },
    },
  });
};
