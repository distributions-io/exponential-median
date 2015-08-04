'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	MEDIAN  = require( './number.js' );


// MEDIAN //

/**
* FUNCTION: median( arr, path[, sep] )
*	Computes the distribution median and deep sets the input array.
*
* @param {Array} arrays - input array
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function median( arr, path, sep ) {
	var len = arr.length,
		opts = {},
		dget,
		dset,
		v, i;
	if ( arguments.length > 2 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		for ( i = 0; i < len; i++ ) {
			v = dget( arr[ i ] );
			if ( typeof v === 'number' ) {
				dset( arr[i], MEDIAN ( v ) );
			} else {
				dset( arr[i], NaN );
			}
		}
	}
	return arr;
} // end FUNCTION median()


// EXPORTS //

module.exports = median;
