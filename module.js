const path = require('path');
const minify = require('minify-html-literals');
const JSAsset = parseInt(process.versions.node, 10) < 8
  ? require('parcel-bundler/lib/assets/JSAsset')
  : require('parcel-bundler/src/assets/JSAsset');

class minifyHtmlJSAsset extends JSAsset {
  constructor(name, options) {
    super(name, options);
  }

  parse(code) {
    let customMinifyHtmlLiteralsConfig = {};
    try {
      customMinifyHtmlLiteralsConfig = require('../../.minifyhtmlliteralsrc');
    } catch (ex) {}
    console.log(customMinifyHtmlLiteralsConfig);

    if (!this.name.includes('node_modules')) {
      const minified = minify.minifyHTMLLiterals(code, {
        fileName: this.name,
        minifyOptions: Object.assign({}, minify.defaultMinifyOptions, customMinifyHtmlLiteralsConfig),
      });
      this.contents = minified.code;
    }

    // Parse result to format as normal
    return super.parse(this.contents)
  }
}

module.exports = minifyHtmlJSAsset;