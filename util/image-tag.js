var fs = require('fs'),
    path = require('path'),
    imageSize = require('fast-image-size');

module.exports = function(publicDir) {
  return function(imageSrc, attributes) {
    var baseImg = path.join(publicDir, imageSrc),
        foundImages = [baseImg + '.png', baseImg + '@2x.png'].filter(fs.existsSync);

    if (!foundImages[0]) {
      throw new Error('Missing sprite: ' + imageSrc);
    }

    var dimensions = imageSize(foundImages[0]);

    var srcSet = '';

    if (foundImages.length > 1) {
      srcSet += ' srcset="' + foundImages.map(function(f) {
        return '/' + path.relative(publicDir, f) + ' ' + (f.indexOf('@2x') > -1 ? 2 : 1) + 'x';
      }).join(', ') + '"';
    }

    var attrs = '';

    if (typeof attributes === 'string') {
      attrs += ' class="' + attributes + '"';
      attributes = arguments[2];
    }

    for (var prop in attributes) {
      attrs += ' ' + prop + '="' + attributes[prop] + '"';
    }

    return [
      '<img src="/', imageSrc, '.png"',
      ' height="', dimensions.height, '"',
      ' width="', dimensions.width, '"',
      srcSet,
      attrs,
      '>'
    ].join('');
  };
};
