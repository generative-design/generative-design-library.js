'use strict';

// http://www.wacomeng.com/web/
// http://www.wacomeng.com/web/TestFBPluginTable.html

/**
 * Use a Wacom tablet in your browser. Currently works only in Safari. Support of the Wacom browser plugin seems to be fading out. You have to add this to your html:
 *
 * `<object id="wtPlugin" type="application/x-wacomtabletplugin"></object>`
 *
 * @see {@link http://www.wacomeng.com/web/}
 * @class
 * @constructor
 */
function WacomTablet() {
	this.penValues = {
		// wacom
		isWacom: null,
		isEraser: null,
		pressure: null,
		sysX: null,
		sysY: null,
		tabX: null,
		tabY: null,
		rotationDeg: null,
		rotationRad: null,
		tiltX: null,
		tiltY: null,
		tangPressure: null,
		version: null,
		pointerType: null,
		tabletModel: null,
		// calculated
		azimuth: null,
		altitude: null
	}
};

// http://jpen.sourceforge.net/api/current/src-html/jpen/PLevel.html
WacomTablet.prototype._calcAzimuthXAndAltitude = function(tiltX, tiltY) {
	var PI_over_2 = Math.PI/2;
	var azimuthXAndAltitude = [];
	if (tiltX < 0) {
	  azimuthXAndAltitude[0] = PI;
	} else if (tiltX == 0 && tiltY == 0){
    azimuthXAndAltitude[0] = 0;
    azimuthXAndAltitude[1] = PI_over_2;
    return azimuthXAndAltitude;
	} else {
		azimuthXAndAltitude[0] = 0;
	}
	var tanTiltY = Math.tan(tiltY);
	azimuthXAndAltitude[0] += Math.atan(tanTiltY/Math.tan(tiltX));
	azimuthXAndAltitude[1] = azimuthXAndAltitude[0]==0 ? PI_over_2-tiltX : Math.abs(Math.atan(Math.sin(azimuthXAndAltitude[0])/tanTiltY));
	return azimuthXAndAltitude;
};

WacomTablet.prototype._getWacomPlugin = function() {
	return document.getElementById('wtPlugin');
};

WacomTablet.prototype._update = function() {
	var wtPlugin = this._getWacomPlugin();

	// is wacom tablet around?
	if (!wtPlugin) return this.penValues;
	if (!wtPlugin.penAPI) return this.penValues;

	this.penValues.isWacom = wtPlugin.penAPI.isWacom;
	this.penValues.isEraser = wtPlugin.penAPI.isEraser;
	this.penValues.pressure = wtPlugin.penAPI.pressure;
	this.penValues.sysX = wtPlugin.penAPI.sysX;
	this.penValues.sysY = wtPlugin.penAPI.sysY;
	this.penValues.tabX = Number(wtPlugin.penAPI.tabX);
	this.penValues.tabY = Number(wtPlugin.penAPI.tabY);
	this.penValues.rotationDeg = wtPlugin.penAPI.rotationDeg;
	this.penValues.rotationRad = wtPlugin.penAPI.rotationRad;
	this.penValues.tiltX = wtPlugin.penAPI.tiltX;
	this.penValues.tiltY = wtPlugin.penAPI.tiltY;
	this.penValues.tangPressure = wtPlugin.penAPI.tangPressure;
	this.penValues.version = wtPlugin.penAPI.version;
	this.penValues.pointerType = Number(wtPlugin.penAPI.pointerType);
	this.penValues.tabletModel = wtPlugin.penAPI.tabletModel;

	var evalAzimuthXAndAltitude = this._calcAzimuthXAndAltitude(
		this.penValues.tiltX,
		this.penValues.tiltY
	);
	this.penValues.azimuth = evalAzimuthXAndAltitude[0];
	this.penValues.altitude = evalAzimuthXAndAltitude[1];

	return this.penValues;
};

/**
 * Get the current values a Wacom tablet
 *
 * @return {Object} with properties: isWacom, isEraser, pressure, sysX, sysY, tabX, tabY, rotationDeg, rotationRad, tiltX, tiltY, tangPressure, version, pointerType, tabletModel, azimuth, altitude
 */
WacomTablet.prototype.values = function() {
	return this._update();
};


module.exports = WacomTablet;
