'use strict';

var packageInfo = require('./package.json');
var color = require('./color');
var WacomTablet = require('./WacomTablet.js');
var Treemap = require('./Treemap.js');

console.log("%c * "+ packageInfo.name +" "+ packageInfo.version + " * ", "background: #3c3; color: black");


/**
 * Returns neatly formated timestamp e.g. "151025_172441_790"
 *
 * @method timestamp
 * @return {String} formated timestamp
 */
var timestamp = function(){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var millis = date.getMilliseconds();

  year = year.toString().substr(2);
  month = ("00" + month).substr(-2, 2);
  day = ("00" + day).substr(-2, 2);
  minute = ("00" + minute).substr(-2, 2);
  second = ("00" + second).substr(-2, 2);

  return [year, month, day, "_", hour, minute, second, "_", millis].join('');
};


module.exports.version = packageInfo.version;
module.exports.timestamp = timestamp;

module.exports.WacomTablet = WacomTablet;

module.exports.Treemap = Treemap;

module.exports.RED        = color.RED;
module.exports.GREEN      = color.GREEN;
module.exports.BLUE       = color.BLUE;
module.exports.HUE        = color.HUE;
module.exports.SATURATION = color.SATURATION;
module.exports.BRIGHTNESS = color.BRIGHTNESS;
module.exports.GRAYSCALE  = color.GRAYSCALE;
module.exports.ALPHA      = color.ALPHA;
module.exports.sortColors = color.sortColors;
module.exports.ase = color.ase;

