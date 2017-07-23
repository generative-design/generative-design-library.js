'use strict';

var _ = require('lodash');
var aseUtils = require('ase-utils');


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

	if (_.isArray(p5colors)) {
		_.each(p5colors, function(c){
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


module.exports.ase = {};
module.exports.ase.encode = aseEncode;