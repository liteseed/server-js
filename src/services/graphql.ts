import { Client, cacheExchange, fetchExchange } from '@urql/core';

const graphql = new Client({
  url: 'https://arweave-search.goldsky.com/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

export default graphql;
