const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

const imageConfig = {
  images: {
    domains: ['localhost', 'union.dev.catbellcompany'],
    disableStaticImages: true,
  }
}

module.exports = withPlugins([withImages], imageConfig);

