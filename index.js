'use strict';

var packageInfo = require('./package.json');
var color = require('./color');
var WacomTablet = require('./WacomTablet.js');

console.log("%c * "+ packageInfo.name +" "+ packageInfo.version + " * ", "background: #948816; color: #fff");

/**
 * Returns neatly formated timestamp as string e.g. "151025_172441_790"
 *
 * @method timestamp
 * @return {String} formated timestamp as string
 */
var timestamp = function(){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var millis = date.getMilliseconds();

  year = year.toString().substr(2);
  month = ("00" + month).substr(-2,2);
  day = ("00" + day).substr(-2,2);
  minute = ("00" + minute).substr(-2,2);
  second = ("00" + second).substr(-2,2);

  return [year,month,day,"_",hour,minute,second,"_",millis].join('');
};


var RED = "red";
var GREEN = "green";
var BLUE = "blue";
var HUE = "hue";
var SATURATION = "saturation";
var BRIGHTNESS = "brightness";
var GRAYSCALE = "grayscale";
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



module.exports.version = packageInfo.version;
module.exports.timestamp = timestamp;
module.exports.ase = color.ase;
module.exports.WacomTablet = WacomTablet;

module.exports.RED        = RED;       
module.exports.GREEN      = GREEN;     
module.exports.BLUE       = BLUE;      
module.exports.HUE        = HUE;       
module.exports.SATURATION = SATURATION; 
module.exports.BRIGHTNESS = BRIGHTNESS; 
module.exports.GRAYSCALE  = GRAYSCALE; 
module.exports.ALPHA      = ALPHA;     
module.exports.sortColors = sortColors;

