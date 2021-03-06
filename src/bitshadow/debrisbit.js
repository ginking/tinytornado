var ColorPalette = require('colorpalette');
var System = require('bitshadowmachine').System;
var Utils = require('burner').Utils;
var Vector = require('burner').Vector;

/**
 * Creates a new DebrisBit.
 * @param {Object} [opt_options=] A map of initial properties.
 * @param {number} [opt_options.sizeMin = 1] Minimum particle size.
 * @param {number} [opt_options.sizeMax = 3] Maximum particle size.
 * @param {number} [opt_options.speedMin = 1] Minimum particle speed.
 * @param {number} [opt_options.speedMax = 20] Maximum particle speed.
 * @param {number} [opt_options.opacityMin = 0.1] Minimum opacity.
 * @param {number} [opt_options.opacityMax = 0.2] Maximum opacity.
 * @param {number} [opt_options.lifespanMin = 70] Minimum lifespan.
 * @param {number} [opt_options.lifespanMax = 120] Maximum lifespan.
 * @param {number} [opt_options.colorMin = 100] Minimum color. Valid values bw 0 - 255.
 * @param {number} [opt_options.colorMax = 200] Maximum color. Valid values bw 0 - 255.
 * @param {number} [opt_options.rate = 1] Particle emission rate.
 * @param {number} [opt_options.fade = false] Set to true for particles to fade in proportion to their lifespan.
 * @constructor
 */
function DebrisBit(opt_options) {

  var options = opt_options || {};

  this.sizeMin = typeof options.sizeMin !== 'undefined' ? options.sizeMin : 1;
  this.sizeMax = typeof options.sizeMax !== 'undefined' ? options.sizeMax : 2;
  this.speedMin = typeof options.speedMin !== 'undefined' ? options.speedMin : 1;
  this.speedMax = typeof options.speedMax !== 'undefined' ? options.speedMax : 30;
  this.opacityMin = typeof options.opacityMin !== 'undefined' ? options.opacityMin : 0.05;
  this.opacityMax = typeof options.opacityMax !== 'undefined' ? options.opacityMax : 0.3;
  this.lifespanMin = typeof options.lifespanMin !== 'undefined' ? options.lifespanMin : 70;
  this.lifespanMax = typeof options.lifespanMax !== 'undefined' ? options.lifespanMax : 120;
  this.colorMin = typeof options.colorMin !== 'undefined' ? options.colorMin : 100;
  this.colorMax = typeof options.colorMax !== 'undefined' ? options.colorMax : 200;
  this.rate = options.rate || 1;
  this.fade = !!options.fade;

  this.width = 0;
  this.height = 0;
  this.lifespan = -1;
  this.startColor = [100, 100, 100]; // TODO: make these options
  this.endColor = [200, 200, 200];
  this.pl = new ColorPalette();
  this.pl.addColor({ // adds a random sampling of colors to palette
    min: 12,
    max: 24,
    startColor: this.startColor,
    endColor: this.endColor
  });
  this.opacity = 0;
  this.beforeStep = this._beforeStep.bind(this);

}

/**
 * Called before each step function.
 * @private
 * @memberOf DebrisBit
 */
DebrisBit.prototype._beforeStep = function() {

  for (var i = 0; i < this.rate; i++) {

    var accel = new Vector(1, 1);
    accel.normalize();
    accel.mult(Utils.getRandomNumber(0.1, 0.25, true));
    accel.rotate(Utils.degreesToRadians(Utils.getRandomNumber(140, 310, true)));
    this.acceleration = accel;

    var size = Utils.getRandomNumber(this.sizeMin, this.sizeMax, this.sizeMin || this.sizeMax);
    var maxSpeed = Utils.getRandomNumber(this.speedMin, this.speedMax, true);
    var opacity = Utils.map(size, this.sizeMin, this.sizeMax, this.opacityMax, this.opacityMin);
    var lifespan = Utils.getRandomNumber(this.lifespanMin, this.lifespanMax);
    var color = Utils.getRandomNumber(this.colorMin, this.colorMax);

    System.add('Particle', {
      location: new Vector(this.parent.location.x, this.parent.location.y),
      acceleration: accel,
      scale: size,
      maxSpeed: maxSpeed,
      opacity: opacity,
      fade: this.fade,
      lifespan: lifespan
    });
  }
};

/**
 * Configures an instance of DebrisBit.
 * @param {Object} [opt_options=] A map of options.
 * @param {Object} [opt_options.parent = null] The DebrisBit's parent.
 * @memberOf DebrisBit
 */
DebrisBit.prototype.configure = function(opt_options) {
  var options = opt_options || {};
  this.parent = options.parent || null;
};

module.exports = DebrisBit;
