'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isnan = require( 'validate.io-nan' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var median1 = require( './number.js' ),
	median2 = require( './array.js' ),
	median3 = require( './accessor.js' ),
	median4 = require( './deepset.js' ),
	median5 = require( './matrix.js' ),
	median6 = require( './typedarray.js' );


// MEDIAN //

/**
* FUNCTION: median( lambda[, opts] )
*	Computes the distribution median.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} lambda - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} distribution median(s)
*/
function median( lambda, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( isNumber( lambda ) || isnan( lambda ) ) {
		return median1( lambda );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( lambda ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'median()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( lambda.length );
			out = matrix( d, lambda.shape, dt );
		} else {
			out = lambda;
		}
		return median5( out, lambda );
	}
	if ( isTypedArrayLike( lambda ) ) {
		if ( opts.copy === false ) {
			out = lambda;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'median()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( lambda.length );
		}
		return median6( out, lambda );
	}
	if ( isArrayLike( lambda ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return median4( lambda, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = lambda;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'median()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( lambda.length );
		}
		else {
			out = new Array( lambda.length );
		}
		if ( opts.accessor ) {
			return median3( out, lambda, opts.accessor );
		}
		return median2( out, lambda );
	}
	return NaN;
} // end FUNCTION median()


// EXPORTS //

module.exports = median;
