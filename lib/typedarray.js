'use strict';

// MODULES //

var MEDIAN = require( './number.js' );


// MEDIAN //

/**
* FUNCTION: median( out, lambda )
*	Computes the distribution median for parameters stored in a typed array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} lambda - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function median( out, lambda ) {
	var len = lambda.length,
		i;
	for ( i = 0; i < len; i++ ) {
		out[ i ] = MEDIAN( lambda[ i ] );
	}
	return out;
} // end FUNCTION median()


// EXPORTS //

module.exports = median;
