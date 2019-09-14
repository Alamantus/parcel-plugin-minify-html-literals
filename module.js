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
    if (!this.name.includes('node_modules')) {
      const minified = minify.minifyHTMLLiterals(code, {
        fileName: this.name,
      });
      this.contents = minified.code;
    }

    // Parse result to format as normal
    return super.parse(this.contents)
  }
}

module.exports = minifyHtmlJSAsset;