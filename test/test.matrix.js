/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	median = require( './../lib/matrix.js' ),

	// Function to apply element-wise
	MEDIAN = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix median', function tests() {

	var out,
		mat,
		d1,
		d2,
		i;

	d1 = new Float64Array( 25 );
	d2 = new Float64Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i / 10;
		d2[ i ] = MEDIAN( i / 10 );
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'float64' );
		out = matrix( d2, [5,5], 'float64' );
	});

	it( 'should export a function', function test() {
		expect( median ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			median( matrix( [10,10] ), mat );
		}
	});

	it( 'should compute the distribution median for each matrix element', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = median( actual, mat );

		assert.deepEqual( actual.data, out.data );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( median( out, mat ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( median( out, mat ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( median( out, mat ).data, expected );
	});

});
