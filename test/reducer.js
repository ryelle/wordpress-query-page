/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { keyBy } from 'lodash';

/**
 * Internal dependencies
 */
import {
	// action-types
	PAGE_REQUEST,
	PAGE_REQUEST_SUCCESS,
	PAGE_REQUEST_FAILURE,
	// reducers
	items,
	requests,
	paths
} from '../src/state';

import pageSample from './fixtures/2';
import pageAbout from './fixtures/1086';

describe( 'Post reducer', () => {
	describe( 'items', () => {
		it( 'should have no change by default', () => {
			const newState = items( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should store the new posts in state', () => {
			const newState = items( undefined, { type: PAGE_REQUEST_SUCCESS, page: pageSample } );
			const pagesById = keyBy( [ pageSample ], 'id' );
			expect( newState ).to.eql( pagesById );
		} );

		it( 'should add new posts onto the existing post array', () => {
			const originalState = deepFreeze( keyBy( [ pageSample ], 'id' ) );
			const newState = items( originalState, { type: PAGE_REQUEST_SUCCESS, page: pageAbout } );
			expect( newState ).to.eql( { ...originalState, 1086: pageAbout } );
		} );
	} );

	describe( 'requests', () => {
		it( 'should have no change by default', () => {
			const newState = requests( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should track the requesting state of a new post', () => {
			const newState = requests( undefined, { type: PAGE_REQUEST, pagePath: '/about' } );
			expect( newState ).to.eql( { '/about': true } );
		} );

		it( 'should track the requesting state of successful post requests', () => {
			const originalState = deepFreeze( { '/about': true } );
			const newState = requests( originalState, { type: PAGE_REQUEST_SUCCESS, pagePath: '/about' } );
			expect( newState ).to.eql( { '/about': false } );
		} );

		it( 'should track the requesting state of failed post requests', () => {
			const originalState = deepFreeze( { '/about': true } );
			const newState = requests( originalState, { type: PAGE_REQUEST_FAILURE, pagePath: '/about' } );
			expect( newState ).to.eql( { '/about': false } );
		} );

		it( 'should track the requesting state of additional post requests', () => {
			const originalState = deepFreeze( { '/about': true } );
			const newState = requests( originalState, { type: PAGE_REQUEST, pagePath: '/sample-page' } );
			expect( newState ).to.eql( { ...originalState, '/sample-page': true } );
		} );
	} );

	describe( 'paths', () => {
		it( 'should have no change by default', () => {
			const newState = paths( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should track the post IDs for requested queries', () => {
			const action = {
				type: PAGE_REQUEST_SUCCESS,
				pagePath: '/about',
				postId: 1086,
			};
			const newState = paths( undefined, action );
			expect( newState ).to.eql( { '/about': 1086 } );
		} );

		it( 'should track the post IDs for additional requested queries', () => {
			const originalState = deepFreeze( { '/about': 1086 } );
			const action = {
				type: PAGE_REQUEST_SUCCESS,
				pagePath: '/sample-page',
				postId: 2,
			};
			const newState = paths( originalState, action );
			expect( newState ).to.eql( {
				'/about': 1086,
				'/sample-page': 2
			} );
		} );
	} );
} );
