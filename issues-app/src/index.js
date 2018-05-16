import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import App from './App';
import { ApolloProvider } from 'react-apollo';

import registerServiceWorker from './registerServiceWorker';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// -------BEGIN apollo client configuration ---------- //
const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
        authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
    },
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: httpLink,
    cache,
});


// ------- END apollo client configuration ---------- //


ReactDOM.render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>,
    document.getElementById('root'))
;
registerServiceWorker();
