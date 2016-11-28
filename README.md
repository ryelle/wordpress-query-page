WordPress Query Page
====================

This package contains a query component, along with redux state & selectors for posts pulled from a WordPress site. This uses the [`node-wpapi`](https://github.com/WP-API/node-wpapi) package to get your site's data via Query Components ([inspired by calypso](https://github.com/Automattic/wp-calypso/blob/master/docs/our-approach-to-data.md#query-components)). The Query Components call the API, which via actions set your site's data into the state.

To use any of these helpers, you'll need to set your Site URL in a global (`SiteSettings`), so that the API knows what site to connect to. For example:

```js
window.SiteSettings = {
	endpoint: 'url.com/path-to-wordpress',
};
```

As of version 1.1, the URL should _not_ include `/wp_json` – `wordpress-rest-api-oauth-1` adds that for us.

Query Page
===========

Query Page is a React component used in managing the fetching of single pages.

## Usage

Render the component, passing in the `pagePath`. It does not accept any children, nor does it render any elements to the page. You can use it adjacent to other sibling components which make use of the fetched data made available through the global application state.

```jsx
import React from 'react';
import QueryPage from 'wordpress-query-page';
import MyPageItem from './page-item';

export default function MyPageComponent( { page } ) {
	return (
		<div>
			<QueryPage pagePath={ 'about/' } />
			<MyPageItem page={ page } />
		</div>
	);
}
```

## Props

### `pagePath`

<table>
	<tr><th>Type</th><td>String</td></tr>
	<tr><th>Required</th><td>Yes</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The path to be used in requesting the page.

Page Selectors
==============

You can import these into your project by grabbing them from the `selectors` file:

```jsx
import { getPage, isRequestingPage } from 'wordpress-query-page/lib/selectors';
```

#### `getPage( state, globalId )`

#### `isRequestingPage( state, path )`

#### `getPageIdFromPath( state, path )`

Page State
==========

If you need access to the reducers, action types, or action creators, you can import these from the `state` file. For example, to use this in your global redux state, mix it into your reducer tree like this:

```jsx
import pages from 'wordpress-query-page/lib/state';

let reducer = combineReducers( { ...otherReducers, pages } );
```

If you need to call an action (the query component should take care of this most of the time), you can pull the action out specifically:

```jsx
import { requestPage } from 'wordpress-query-page/lib/state';
```

[View the file itself](src/state.js) to see what else is available.
