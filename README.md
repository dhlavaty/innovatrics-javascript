# Innovatrics JavaScript Style Guide (version 2019-09-06)


We follow Airbnb JavaScript Style Guide (https://github.com/airbnb/javascript) and Airbnb React/JSX Style Guide (https://github.com/airbnb/javascript/tree/master/react). This document extends and/or overrides those guides, so it take precedence. We also define some basic rules for Redux and CSS stylings.

[![Downloads](https://img.shields.io/npm/dm/@innovatrics/eslint-config-innovatrics.svg)](https://www.npmjs.com/package/@innovatrics/eslint-config-innovatrics)
[![Downloads](https://img.shields.io/npm/dm/@innovatrics/eslint-config-innovatrics-base.svg)](https://www.npmjs.com/package/@innovatrics/eslint-config-innovatrics-base)


<a name="js"></a>
## [JavaScript](#js)


<a name="booleans"></a>
### [Booleans](#booleans)


If a property or variable is a boolean, or function returns boolean, use `is`, `has`, `can` or `should` prefix. ([Accessors - Booleans](https://github.com/airbnb/javascript/blob/master/README.md#accessors--boolean-prefix))

```javascript
// bad
if (!dragon.age()) {
    return false;
}
let good = false;
let sign = false;
let closeDocument = true;
export const updateQuery = function doSomething(createVersion) {}

// good
if (!dragon.hasAge()) {
    return false;
}
let isGood = false;
let canSign = false;
let shouldCloseDocument = true;
export const updateQuery = function doSomething(hasToOverwriteVersion) {}
```


<a name="react-images"></a>
### [Images in React components](#react-images)


Images are in a `/img` subfolder, has size suffix in its name, and imported into React component as a constant with `Png` suffix.

```javascript
// bad
import organization from './organization.png';

// good
import organizationPng from './img/organization-24x24.png';
```


<a name="react-ids"></a>
### [ID's in React components](#react-ids)


Correctly setup ID's are essential for proper QA/testing. IDs consist from two parts, `{LEFT}-{RIGHT}`, where `{LEFT}` part is the name of the component, and `{RIGHT}` is any string (words separated with dashes) that makes the whole ID unique. Only `{LEFT}` part is mandatory.

So for example in `our-example.component.jsx` file, there is a `OurExample` React component and every single ID will start with `our-example-` prefix.

```javascript
const OurExample = (props) => {
    const id = 'our-example';
    return (<h1 id={`${id}-heading`}>{props.text}</h1>);
}
```



<a name="redux-naming"></a>
### [Redux components / Redux containers naming convention](#redux-naming)


Redux containers (those React components which use Redux `connect()` to access state) has `Container` postfix in its name - for example `LoadingScreenContainer` is in `/loading-screen.container.jsx`.

Redux components has no special postfix, not even an `Component`. Example: `IconButton` is in `/components/buttons/icon-button.component.jsx`.

All imports must import components/containers under their original name. (So once full text search is used, it must be simple to find particular component)

```javascript

  // GOOD
  import LoadingScreenContainer from './loading-screen.container';

  // BAD
  import MyVeryCreativeImportName from './loading-screen.container';

```

<a name="react-event-handler-naming"></a>
### [Event handler naming in React](#react-event-handler-naming)

The handler functions should be named of the form `handle*`, for example `handleClick`
or `handleStart`. When sent as props to a component, the property-keys should
be named of the form `on*`, for example `onClick` or `onStart`.
example:

```javascript

function Activator(props) {
  return <button onClick={this.props.onActivation}>Activate</button>;
}

function Thing(props) {
  const [isActive, setActive] = useState(false);

  function handleActivation() {
    setActive(true);
  }

  return <div>
    Thing is {isActive ? 'Active' : 'Inactive'}
    <Activator onActivation={handleActivation}/>
  </div>;
}
```

<a name="flowtype"></a>
### [Using Flow](#flowtype)


If you need to add flow-types for a third-party (npm) module, use
[flow-typed](https://github.com/flowtype/flow-typed). The files are downloaded into the
`flow-typed/npm` folder. Commit them into our git-repository.
If the module does not have a type-definition at flow-typed, create the type-definition,
and put it into the `flow-typed` folder (not into it's `npm` subfolder). Also, try to
have the type-definition integrated into the `flow-typed` project. If that happens,
migrate to the file from flow-typed.

<a name="flowtype-bind-method"></a>
#### [Flowtype and binding react component methods](#flowtype-bind-method)


You often have to bind react-component-methods in the constructor, like this:

```
class Thing extends React.Component {
    constructor() {
        this.handleClick = this.handleClick.bind(this);
    }
}
```

Flow does not handle well these binding approaches, see bug
https://github.com/facebook/flow/issues/5874 , we recommend this workaround:

```
class Thing extends React.Component {
    constructor() {
        (this:any).handleClick = this.handleClick.bind(this);
    }
}
```



<a name="typed-redux"></a>
### [Typed Redux](#typed-redux)


Inspired by this [article](https://blog.callstack.io/typed-redux-2aa8bff926ff#.wfxvlbuox)


<a name="redux-actions"></a>
#### [How to write actions/action creators/action types](#redux-actions)


There are 3 types of action creators.

 - Simple action creator. Returns pure javascript object:

```javascript
function showSaveDocumentDialog(text: string): Action {
    return {
        type: actionTypes.SHOW_SAVE_DOCUMENT_DIALOG,
        queryText: text
    };
}
```

 All simple action creators should be described by a single, union type, called Action:

```javascript
// @flow

export type Action =
     { type: 'SHOW_SAVE_DOCUMENT_DIALOG', queryText: string }
    | { type: 'HIDE_SAVE_DOCUMENT_DIALOG' }
    | { type: 'MOVE_SAVED_DOCUMENT_REQUEST_SUCCESS', result: { folder_id: number } }
    ...
;
```

 - Thunk action creator. Uses redux-thunk:

```javascript
function cancelQueryPartialAccessDialog(): ThunkAction {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actionTypes.CANCEL_DOCUMENT_PARTIAL_ACCESS_DIALOG
        });
        dispatch(hideQueryPartialAccessDialog());
    };
}        
```

 Thunk actions should be described by ThunkAction type:

```javascript
// @flow
export type ThunkAction = (dispatch: Dispatch, getState?: GetState) => any;  
```


<a name="redux-reducers"></a>
#### [How to annotate reducers](#redux-reducers)


We always describe our state. All reducers should have `type` to avoid a type errors:

```javascript
type Friend = {
    name: string,
};

type FriendsState = {
    list: Array<Friend>,
    loading: boolean,
};

type AppState = {
    isMenuOpen: boolean,
};
```


Examples of `incorrect` code:

```javascript
/**
 * @flow
 */
import type { FriendState } from '../types';

type State = FriendsState;

const initialState = {
    loading: false,
    list: null,
};

export function friends(
    state: State = initialState,
    action: Object
): State {
    return state;
}
```

It returns:

```javascript
src/reducers/friends.js:9
 9: list: null,
 ^^^ null. This type is incompatible with
 2: list: Array<{ name: string }>,
 ^^^^^^^^^^^^^^^^^^^^^ array type. See: src/types.js:2
```

Thanks to Flow and the state having a corresponding type, we were able to catch that tiny mistake as early as it happened.

Examples of `correct` code:

```javascript
/**
 * @flow
 */
import type { FriendState } from '../types';

type State = FriendsState;

const initialState: State = {
    loading: false,
    list: [],
};

export function friends(
    state: State = initialState,
    action: Object
): State {
    return state;
}
```

Note: now we use everywhere inexact type definition. It means that flow doesn't complain if some property is not defined in type.
To avoid this problem we should use `Exact` type:

```javascript
/**
 * @flow
 */
type Exact<T> = T & $Shape<T>;
import type { FriendState } from '../types';

type State = FriendsState;

const initialState: State = {
    loading: false,
    list: [],
};

export function friends(
    state: Exact<State> = initialState,
    action: Object
): Exact<State> {
    return state;
}
```

We use `Exact<T>` only in those 2 places in the definition of the reducer function. `Exact` type can be imported:

```javascript
import type { Exact } from 'app/types';
```


<a name="redux-mapStateToProps"></a>
#### [How to write mapStateToProps()](#redux-mapStateToProps)


State of whole application has own type called `State`. This type should be used when use `connect()` to map state to props of our containers.

```javascript
type State = {
    friends: FriendsState,
    app: AppState,
};
```

```javascript
/**
 * @flow
 */

import { connect } from 'react-redux';
import type { State } from '../types';

export default connect(
    (state: State) => ({
        list: state.friends.list,
    })
)(Container);
```

This pattern helps us to reason about the entire app state as well as eliminate common issues, like misspelling the property names.


<a name="css"></a>
## [CSS](#css)


<a name="css-class-names"></a>
### [CSS class naming convention](#css-class-names)


Our css classes use `in-*` naming conventions. Any css class without `in-` prefix, is a class
from an external css library (Twitter Bootstrap 4 for example). In case the css class is for QA purpose, use `in-qa-*` convention.

```html
<!-- BAD -->
<div className="modal-body" styleName="modal-body-red">...</div>

<!-- GOOD -->
<div className="modal-body" styleName="in-modal-body">...</div>
```

<a name="styled-components"></a>
### [Styled components naming convention](#styled-components)


Use `SC` suffix for styled components.

```javascript
const PanelSC = styled.div`
  background: blue;
`;
const BarSC = styled.div`
  color: red;
`;

const Bar = () => {
    // maybe some code here

    return (
        <BarSC>
            <PanelSC>earum nostrum cum</PanelSC>
            Aut minima assumenda.
        </BarSC>
    );
};
export default Bar;
```

**Do not** export styled components directly (as it has a lot of props), but wrap it into simple React component with fewer props.

```javascript
const FooterSC = styled.footer`
  text-align: center;
`;

const Footer = () => <FooterSC>doloremque quasi similique</FooterSC>;
export default Footer;
```

<a name="naming"></a>
## [Files and folders naming conventions](#naming)


Project structure is driven by [LIFT Principle](https://github.com/johnpapa/angular-styleguide/tree/master/a1#application-structure-lift-principle). Folder structure is organized with approach `“folders-by-feature”`, not `“folders-by-type”`

Folders and files are named with all-lowercase, words separated by dash. File name suffix says, what type of code is in the file. Suffix is full stop separated sequence, starting with the more specific identifier, to the less specific ones:

```
/save-file-dialog
|-- save-file-dialog.actions.js
|-- save-file-dialog.actions.spec.js
|-- save-file-dialog.reducers.js
|-- save-file-dialog.reducers.spec.js
|-- save-file-dialog.component.jsx
|-- save-file-dialog.component.scss
```

Test file has the same name, as the tested unit, with `“.spec.js”` suffix. Test file is in the same folder as the tested code.

```
/save-file-dialog
|-- save-file-dialog.actions.js
|-- save-file-dialog.actions.spec.js
```

Images are in the `/img` sub-folder of the component, in folder. See [React images](#react-images)

```
/button
|-- /img
|   |-- icon-24x24.png
|
|-- button.component.jsx
|-- button.component.scss
```


<a name="renaming"></a>
### [Renaming and/or moving files](#renaming)


**NEVER EVER rename a file, by just changing capitalization. Seriously, NEVER !**

```
$ # BAD - NEVER DO THIS
$ mv my-Source-Code-File.js my-source-code-file.js
```

If you desperately need to do it, you have to do it in 3 steps:

```
# STEP 1 - rename file by adding postfix
$ mv my-Source-Code-File.js my-source-code-file-ex.js

# STEP 2 - wait until change spreads into all open branches - this may take several weeks

# STEP 3 - rename file by removing postfix
$ mv my-source-code-file-ex.js my-source-code-file.js
```


<a name="gitrenaming"></a>
### [GIT Renaming and/or moving files](#gitrenaming)


To help git track changed files, never rename a file and change its content in one commit.

```
# BAD
$ mv my-file.js my-changed-name.js
# change content of my-changed-name.js file
$ git commit
```

```
# GOOD
$ mv my-file.js my-changed-name.js
$ git commit
# change content of my-changed-name.js file
$ git commit
```


<a name="reactstructure"></a>
### [React/Redux application structure example](#reactstructure)


```
/.storybook
/electron               # only Electron specific files
/web                    # Web/browser specific code
/test                   # Test/nodejs specific code
/common
|-- /app                # entry point to the application
|   |-- action-types.js
|   |-- app.actions.js
|   |-- app.component.jsx
|   |-- app.reducers.js
|   |-- index.js
|   |-- start-app.jsx
|   |-- store-configuration.js
|   |-- /middleware
|       |-- /oauth
|           |-- /authorization
|           |-- /fetch
|           |-- /global-error-handler
|           |-- ...
|-- /i18n
|   |-- en.json
|   |-- de.json
|   |-- sk.json
|   |-- ru.json
|
|-- /shared
    |-- /assets
    |   |-- innovatrics-ai.scss
    |
    |-- /components
    |   |-- /drop-down
    |   |   |-- /img
    |   |   |   |-- icon-24x24.png
    |   |   |
    |   |   |-- drop-down.component.jsx
    |   |   |-- drop-down.component.scss
    |   |-- /button
    |   |   |-- button.component.jsx
    |   |   |-- button.component.scss
    |   |-- /calendar
    |   |-- /chart
    |   |-- /context-menu
    |   |-- /collapsible
    |   |-- /modal-box
    |   |-- /switch-button
    |   |-- /toggle
    |   |-- ...
    |-- /helpers
    |-- /lib
        |-- /codemirror
        |-- /some-third-party-library

```

## GraphQL guideline

### Generating Typescript type definitions

When using typescript, use a tool like [GraphQL Code Generator](https://graphql-code-generator.com/) to automatically generate typescript type definitions for your graphql queries.

### Relay connection

When writing GraphQL query that includes Relay connection type, make sure to include `@connection` directive with `key` set to name of the connection (see example).
Connection results are saved in cache with its name and input arguments as key (`watchlistItemConnection(first: 10, after: "abcdefgh")`) - this means different pages are saved under diferent keys (`before`/`after` arguments are diferent each page). `key` in `@connection` directive makes sure results are saved and normalised under `key`, ingoring connection arguments. This is important for adding/removing data from cache after successful mutation, as we wouldn't be able to do it otherwise.


Example:

```
query watchlistQuery($id: ID!, $first: Int!) {
    ...
    watchlistItemConnection(first: $first) @connection(key: "watchlistItemConnection") {
        edges {
            node {...}
        }
    }
}
```

### Mutations

Mutations that update something, should always return every field that can go into its `input` parameter. Apollo can update cache automatically through the whole application.

Example:

```
input WatchlistItemUpdateInput {
    id: ID!
    displayName: String
    fullName: String
    note: String
    externalId: String
}

mutation updateWatchlistItem {
    updateWatchlistItem($input: WatchlistItemUpdateInput!) {
        watchlistItem {
            id
            displayName
            fullName
            note
            externalId
        }
    }
}
```

### Delete data from cache

Delete data from cache is a bit tricky, here is an example (using `watchlistItemConnection`):
```typescript
// we dont't use pagination arguments in queries reading from apollo cache,
// as we used `@connection` directive in the original (server) query/queries
const CACHE_QUERY = gql`
    ...
    watchlistItemConnection @connection(key: "watchlistItemConnection") { 
        edges {
            node {...}
        }
    }
`;

mutation({
    variables: { id: watchlistItemId },
    update: (store: DataProxy) => {
        const cache = store.readQuery({
            query: CACHE_QUERY,
        });
        cache.watchlistItemConnection.edges = cache.watchlistItemConnection.edges.filter(edge => edge.node.id !== watchlistItemId);
        store.writeQuery({
            query: CACHE_QUERY,
            data: cache,
        });
    }
})'
```