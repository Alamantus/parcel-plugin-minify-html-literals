module.exports = function (bundler) {
  bundler.addAssetType('js', require.resolve('./module.js'));
}