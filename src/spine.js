/**
 * Creates a new Spine.
 *
 * @param {Object} [opt_options=] A map of initial joint properties.
 * @param {number} [opt_options.density = 25] Determines number of joints in the spine. Lower values = more joints.
 * @param {number} [opt_options.opacity = 0] Opacity.
 * @param {string} [opt_options.easing = 'easeInCirc'] An easing function to determine joint distribution along the spine. See Easing docs for possible values.
 */
function Spine(opt_options) {

  var options = opt_options || {};

  this.density = options.density || 25;
  this.opacity = options.opacity || 0;
  this.easing = options.easing || 'easeInCirc';
}

module.exports = Spine;