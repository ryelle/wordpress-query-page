/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import { isRequestingPage } from './selectors';
import { requestPage } from './state';

const debug = debugFactory( 'query:page' );

class QueryPage extends Component {
	componentWillMount() {
		this.request( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.pagePath === nextProps.pagePath ) {
			return;
		}

		this.request( nextProps );
	}

	request( props ) {
		if ( ! props.requestingPage ) {
			debug( `Request single page ${ props.pagePath }` );
			props.requestPage( props.pagePath );
		}
	}

	render() {
		return null;
	}
}

QueryPage.propTypes = {
	pagePath: PropTypes.string.isRequired,
	requestingPage: PropTypes.bool,
	requestPage: PropTypes.func
};

QueryPage.defaultProps = {
	requestPage: () => {}
};

export default connect(
	( state, ownProps ) => {
		const pagePath = ownProps.pagePath;
		return {
			requestingPage: isRequestingPage( state, pagePath ),
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			requestPage
		}, dispatch );
	}
)( QueryPage );
