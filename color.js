'use strict';

var aseUtils = require('ase-utils');


/**
 * Color constant
 * @property {String}
 */
var RED = "red";
/**
 * Color constant
 * @property {String}
 */
var GREEN = "green";
/**
 * Color constant
 * @property {String}
 */
var BLUE = "blue";
/**
 * Color constant
 * @property {String}
 */
var HUE = "hue";
/**
 * Color constant
 * @property {String}
 */
var SATURATION = "saturation";
/**
 * Color constant
 * @property {String}
 */
var BRIGHTNESS = "brightness";
/**
 * Color constant
 * @property {String}
 */
var GRAYSCALE = "grayscale";
/**
 * Color constant
 * @property {String}
 */
var ALPHA = "alpha";


/**
 * Sorts an array of colors according to the given method
 *
 * @method sortColors
 * @param {Array} colors An array of colors.
 * @param {String} method Either gd.RED, gd.GREEN, gd.BLUE, gd.HUE, gd.SATURATION, gd.BRIGHTNESS, gd.GRAYSCALE or gd.ALPHA.
 * @return {String} formated timestamp as string
 */
var sortColors = function(colors, method) {

   // sort red
  if (method == RED) colors.sort(function (a, b) {
    if (red(a) < red(b)) return -1;
    if (red(a) > red(b)) return 1;
    return 0;
  });

   // sort green
  if (method == GREEN) colors.sort(function (a, b) {
    if (green(a) < green(b)) return -1;
    if (green(a) > green(b)) return 1;
    return 0;
  });

   // sort blue
  if (method == BLUE) colors.sort(function (a, b) {
    if (blue(a) < blue(b)) return -1;
    if (blue(a) > blue(b)) return 1;
    return 0;
  });

  // sort hue
  if (method == HUE) colors.sort(function (a, b) {
    //convert a and b from RGB to HSV
    var aHue = chroma(red(a), green(a), blue(a)).get('hsv.h');
    var bHue = chroma(red(b), green(b), blue(b)).get('hsv.h');

    if (aHue < bHue) return -1;
    if (aHue > bHue) return 1;
    return 0;
  });

  // sort saturation
  if (method == SATURATION) colors.sort(function (a, b) {
    //convert a and b from RGB to HSV
    var aSat = chroma(red(a), green(a), blue(a)).get('hsv.s');
    var bSat = chroma(red(b), green(b), blue(b)).get('hsv.s');

    if (aSat < bSat) return -1;
    if (aSat > bSat) return 1;
    return 0;
  });

  // sort brightness
  if (method == BRIGHTNESS) colors.sort(function (a, b) {
    //convert a and b from RGB to HSV
    var aBright = chroma(red(a), green(a), blue(a)).get('hsv.v');
    var bBright = chroma(red(b), green(b), blue(b)).get('hsv.v');

    if (aBright < bBright) return -1;
    if (aBright > bBright) return 1;
    return 0;
  });

  // sort grayscale
  if (method == GRAYSCALE) colors.sort(function (a, b) {
    var aGrey = (red(a) * 0.222 + green(a) * 0.707 + blue(a) * 0.071);
    var bGrey = (red(b) * 0.222 + green(b) * 0.707 + blue(b) * 0.071);

    if (aGrey < bGrey) return -1;
    if (aGrey > bGrey) return 1;
    return 0;
  });

   // sort alpha
  if (method == ALPHA) colors.sort(function (a, b) {
    if (alpha(a) < alpha(b)) return -1;
    if (alpha(a) > alpha(b)) return 1;
    return 0;
  });

  return colors;
};


/**
 * Returns an ase swatch definition from an array of p5 colors.
 *
 * @method ase.encode
 * @param  {Array} p5colors an array of p5 colors
 * @return {String} an ase swatch definition
 */
var aseEncode = function(p5colors){
	var swatches = {
	  "version": "1.0",
	  "groups": [],
	  "colors": []
	};

	if (Array.isArray(p5colors)) {
    p5colors.forEach(function(c){
			checkAndAddSwatch(c);
		});
	} else {
		checkAndAddSwatch(p5colors);
	}

	function checkAndAddSwatch(c) {
		if (c instanceof p5.Color) {
  		swatches.colors.push({
  	    "name": c._array.slice(0,3).join('-'),
  	    "model": "RGB",
  	    "color": c._array.slice(0,3),
  	    "type": "global"
    	});
		} else {
		  throw new Error('Needs p5.Color array as argument.');
		}
	}

	return aseUtils.encode(swatches);
};


module.exports.RED        = RED;
module.exports.GREEN      = GREEN;
module.exports.BLUE       = BLUE;
module.exports.HUE        = HUE;
module.exports.SATURATION = SATURATION;
module.exports.BRIGHTNESS = BRIGHTNESS;
module.exports.GRAYSCALE  = GRAYSCALE;
module.exports.ALPHA      = ALPHA;
module.exports.sortColors = sortColors;

module.exports.ase = {};
module.exports.ase.encode = aseEncode;
