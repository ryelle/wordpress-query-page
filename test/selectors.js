/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { keyBy } from 'lodash';

/**
 * Internal dependencies
 */
import * as selectors from '../src/selectors';
import pageSample from './fixtures/2';
import pageAbout from './fixtures/1086';

const pagesById = keyBy( [ pageSample, pageAbout ], 'id' );

const state = deepFreeze( {
	pages: {
		items: pagesById,
		requests: {
			'/about': false,
			'/sample-page': true,
		},
		paths: {
			'/about': 1086,
		}
	}
} );

describe( 'Post selectors', function() {
	it( 'should contain getPage method', function() {
		expect( selectors.getPage ).to.be.a( 'function' );
	} );

	it( 'should contain isRequestingPage method', function() {
		expect( selectors.isRequestingPage ).to.be.a( 'function' );
	} );

	it( 'should contain getPageIdFromPath method', function() {
		expect( selectors.getPageIdFromPath ).to.be.a( 'function' );
	} );

	describe( 'isRequestingPage', function() {
		it( 'Should get `false` if the page has not been requested yet', function() {
			expect( selectors.isRequestingPage( state, '/unrequested-page' ) ).to.be.false;
		} );

		it( 'Should get `false` if this page has already been fetched', function() {
			expect( selectors.isRequestingPage( state, '/about' ) ).to.be.false;
		} );

		it( 'Should get `true` if this page is being fetched', function() {
			expect( selectors.isRequestingPage( state, '/sample-page' ) ).to.be.true;
		} );
	} );

	describe( 'getPageIdFromPath', function() {
		it( 'Should get `false` if the page has not been requested yet', function() {
			expect( selectors.getPageIdFromPath( state, '/unrequested-page' ) ).to.be.false;
		} );

		it( 'Should get the page ID if this page is in our state', function() {
			expect( selectors.getPageIdFromPath( state, '/about' ) ).to.eql( 1086 );
		} );
	} );

	describe( 'getPage', function() {
		it( 'Should get `undefined` if the post has not been requested yet', function() {
			expect( selectors.getPage( state, 3 ) ).to.be.undefined;
		} );

		it( 'Should get the post object if this post is in our state', function() {
			expect( selectors.getPage( state, 1086 ) ).to.eql( pageAbout );
		} );
	} );
} );
