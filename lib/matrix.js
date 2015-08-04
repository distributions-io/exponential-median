'use strict';

// MODULES //

var MEDIAN = require( './number.js' );


// MEDIAN //

/**
* FUNCTION: median( out, x )
*	Computes the distribution median for each parameter stored in a matrix.
*
* @param {Matrix} out - output matrix
* @param {Matrix} x - input matrix
* @returns {Matrix} output matrix
*/
function median( out, x ) {
	var len = x.length,
		i;
	if ( out.length !== len ) {
		throw new Error( 'median()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = MEDIAN( x.data[ i ] );
	}
	return out;
} // end FUNCTION median()


// EXPORTS //

module.exports = median;
