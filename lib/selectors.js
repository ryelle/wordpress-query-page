"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPage = getPage;
exports.isRequestingPage = isRequestingPage;
exports.getPageIdFromPath = getPageIdFromPath;
/**
 * Returns a page object by its global ID.
 *
 * @param  {Object} state    Global state tree
 * @param  {String} globalId Page global ID
 * @return {Object}          Page object
 */
function getPage(state, globalId) {
  return state.pages.items[globalId];
}

/**
 * Returns true if a request is in progress for the specified page, or
 * false otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @param  {String}  path   Page path
 * @return {Boolean}        Whether request is in progress
 */
function isRequestingPage(state, path) {
  if (!state.pages || !state.pages.requests) {
    return false;
  }

  return !!state.pages.requests[path];
}

/**
 * Returns the Page ID for a given path
 *
 * @param  {Object}  state  Global state tree
 * @param  {String}  path   Page path
 * @return {int}            Page ID
 */
function getPageIdFromPath(state, path) {
  if (!state.pages || !state.pages.paths || !state.pages.paths[path]) {
    return false;
  }

  return state.pages.paths[path];
}