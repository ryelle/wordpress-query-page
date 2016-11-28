'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PAGE_REQUEST_FAILURE = exports.PAGE_REQUEST_SUCCESS = exports.PAGE_REQUEST = undefined;
exports.requestPage = requestPage;

var _redux = require('redux');

var _keyBy = require('lodash/keyBy');

var _keyBy2 = _interopRequireDefault(_keyBy);

var _wordpressRestApiOauth = require('wordpress-rest-api-oauth-1');

var _wordpressRestApiOauth2 = _interopRequireDefault(_wordpressRestApiOauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*global SiteSettings */
/**
 * External dependencies
 */


var api = new _wordpressRestApiOauth2.default({
	url: SiteSettings.endpoint
});

/**
 * Page actions
 */
var PAGE_REQUEST = exports.PAGE_REQUEST = 'wordpress-redux/page/REQUEST';
var PAGE_REQUEST_SUCCESS = exports.PAGE_REQUEST_SUCCESS = 'wordpress-redux/page/REQUEST_SUCCESS';
var PAGE_REQUEST_FAILURE = exports.PAGE_REQUEST_FAILURE = 'wordpress-redux/page/REQUEST_FAILURE';

/**
 * Tracks all known page objects, indexed by post global ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function items() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case PAGE_REQUEST_SUCCESS:
			var posts = (0, _keyBy2.default)([action.page], 'id');
			return Object.assign({}, state, posts);
		default:
			return state;
	}
}

/**
 * Returns the updated page requests state after an action has been
 * dispatched. The state reflects a mapping of page ID to a
 * boolean reflecting whether a request for the page is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function requests() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case PAGE_REQUEST:
		case PAGE_REQUEST_SUCCESS:
		case PAGE_REQUEST_FAILURE:
			return Object.assign({}, state, _defineProperty({}, action.pagePath, PAGE_REQUEST === action.type));
		default:
			return state;
	}
}

/**
 * Tracks the path->ID mapping for pages
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function paths() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case PAGE_REQUEST_SUCCESS:
			return Object.assign({}, state, _defineProperty({}, action.pagePath, action.postId));
		default:
			return state;
	}
}

exports.default = (0, _redux.combineReducers)({
	items: items,
	requests: requests,
	paths: paths
});

/**
 * Triggers a network request to fetch a specific page from a site.
 *
 * @param  {string}   path  Path path
 * @return {Function}       Action thunk
 */

function requestPage(path) {
	return function (dispatch) {
		dispatch({
			type: PAGE_REQUEST,
			pagePath: path
		});

		var query = {
			pagename: path,
			_embed: true
		};

		api.get('/wp/v2/pages', query).then(function (data) {
			var page = data[0];
			dispatch({
				type: PAGE_REQUEST_SUCCESS,
				postId: page.id,
				pagePath: path,
				page: page
			});
			return null;
		}).catch(function (error) {
			dispatch({
				type: PAGE_REQUEST_FAILURE,
				pagePath: path,
				error: error
			});
		});
	};
}