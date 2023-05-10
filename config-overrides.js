/* config-overrides.js */
/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, override } = require('customize-cra');

module.exports = override(useBabelRc());

/*const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...useBabelRc(config),
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      services: path.resolve(__dirname, 'src/shared/services'),
      interfaces: path.resolve(__dirname, 'src/shared/interfaces'),
    },
  };

  return config;
};*/
