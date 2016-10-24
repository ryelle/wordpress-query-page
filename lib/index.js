'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _selectors = require('./selectors');

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Internal dependencies
 */


var debug = (0, _debug2.default)('query:page');

var QueryPage = function (_Component) {
	_inherits(QueryPage, _Component);

	function QueryPage() {
		_classCallCheck(this, QueryPage);

		return _possibleConstructorReturn(this, (QueryPage.__proto__ || Object.getPrototypeOf(QueryPage)).apply(this, arguments));
	}

	_createClass(QueryPage, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.request(this.props);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.pagePath === nextProps.pagePath) {
				return;
			}

			this.request(nextProps);
		}
	}, {
		key: 'request',
		value: function request(props) {
			if (!props.requestingPage) {
				debug('Request single page ' + props.pagePath);
				props.requestPage(props.pagePath);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return QueryPage;
}(_react.Component);

QueryPage.propTypes = {
	pagePath: _react.PropTypes.string.isRequired,
	requestingPage: _react.PropTypes.bool,
	requestPage: _react.PropTypes.func
};

QueryPage.defaultProps = {
	requestPage: function requestPage() {}
};

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	var pagePath = ownProps.pagePath;
	return {
		requestingPage: (0, _selectors.isRequestingPage)(state, pagePath)
	};
}, function (dispatch) {
	return (0, _redux.bindActionCreators)({
		requestPage: _state.requestPage
	}, dispatch);
})(QueryPage);
module.exports = exports['default'];