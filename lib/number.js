'use strict';

// MODULES //

var isPositive = require( 'validate.io-positive-primitive' );


// MEDIAN //

/**
* FUNCTION median( lambda )
*	Computes the distribution median for a exponential distribution with parameter lambda.
*
* @param {Number} lambda - rate parameter
* @returns {Number} distribution median
*/
function median( lambda ) {
	if ( !isPositive( lambda ) ) {
		return NaN;
	}
	return ( 1 / lambda ) * ln( 2 );
} // end FUNCTION median()


// EXPORTS

module.exports =  median;
