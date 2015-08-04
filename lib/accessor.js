'use strict';

// MODULES //

var MEDIAN = require( './number.js' );


// MEDIAN //

/**
* FUNCTION: median( out, arr, accessor )
*	Computes the distribution median for parameters stored in an array using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function median( out, arr, clbk ) {
	var len = arr.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( arr[ i ], i );
		if ( typeof v === 'number' ) {
			out[ i ] = MEDIAN( v );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION median()


// EXPORTS //

module.exports = median;
