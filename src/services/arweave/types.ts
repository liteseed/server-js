import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Representation of a value transfer between wallets, in both winson and ar. */
export type Amount = {
  __typename?: 'Amount';
  /** Amount as an AR string e.g. \`"0.000000000001"\`. */
  ar: Scalars['String']['output'];
  /** Amount as a winston string e.g. \`"1000000000000"\`. */
  winston: Scalars['String']['output'];
};

/** Block Schema */
export type Block = {
  __typename?: 'Block';
  /** The block height. */
  height: Scalars['Int']['output'];
  /** The block ID. */
  id: Scalars['ID']['output'];
  /** The previous block ID. */
  previous: Scalars['ID']['output'];
  /** The block timestamp (UTC). */
  timestamp: Scalars['Int']['output'];
};

/**
 * Paginated result set using the GraphQL cursor spec,
 * see: https://relay.dev/graphql/connections.htm.
 */
export type BlockConnection = {
  __typename?: 'BlockConnection';
  edges: Array<BlockEdge>;
  pageInfo: PageInfo;
};

/** Paginated result set using the GraphQL cursor spec. */
export type BlockEdge = {
  __typename?: 'BlockEdge';
  /**
   * The cursor value for fetching the next page.
   *
   * Pass this to the after parameter in blocks(after: $cursor), the next page will start from the next item after this.
   */
  cursor: Scalars['String']['output'];
  /** A block object. */
  node: Block;
};

/**
 * The data bundle containing the current data item.
 * See: https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md.
 */
export type Bundle = {
  __typename?: 'Bundle';
  /** ID of the containing data bundle. */
  id: Scalars['ID']['output'];
};

/** Basic metadata about the transaction data payload. */
export type MetaData = {
  __typename?: 'MetaData';
  /** Size of the associated data in bytes. */
  size: Scalars['String']['output'];
  /** Type is derived from the \`content-type\` tag on a transaction. */
  type?: Maybe<Scalars['String']['output']>;
};

/** Representation of a transaction owner. */
export type Owner = {
  __typename?: 'Owner';
  /** The owner's wallet address. */
  address: Scalars['String']['output'];
  /** The owner's public key as a base64url encoded string. */
  key: Scalars['String']['output'];
};

/** Paginated page info using the GraphQL cursor spec. */
export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
};

/**
 * The parent transaction for bundled transactions,
 * see: https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-102.md.
 */
export type Parent = {
  __typename?: 'Parent';
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  block?: Maybe<Block>;
  blocks: BlockConnection;
  /** Get a transaction by its id */
  transaction?: Maybe<Transaction>;
  /** Get a paginated set of matching transactions using filters. */
  transactions: TransactionConnection;
};


export type QueryBlockArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBlocksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<RangeFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  sort?: InputMaybe<SortOrder>;
};


export type QueryTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<RangeFilter>;
  bundledIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  ingested_at?: InputMaybe<RangeFilter>;
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  recipients?: InputMaybe<Array<Scalars['String']['input']>>;
  sort?: InputMaybe<SortOrder>;
  tags?: InputMaybe<Array<TagFilter>>;
};

/** Filter with a min and max */
export type RangeFilter = {
  /** Maximum integer to filter to */
  max?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum integer to filter from */
  min?: InputMaybe<Scalars['Int']['input']>;
};

/** Optionally reverse the result sort order from `HEIGHT_DESC` (default) to `HEIGHT_ASC`. */
export enum SortOrder {
  /** Results are sorted by the transaction block height in ascending order, with the oldest transactions appearing first, and the most recent and pending/unconfirmed appearing last. */
  HeightAsc = 'HEIGHT_ASC',
  /** Results are sorted by the transaction block height in descending order, with the most recent and unconfirmed/pending transactions appearing first. */
  HeightDesc = 'HEIGHT_DESC'
}

/** Tag Schema */
export type Tag = {
  __typename?: 'Tag';
  /** UTF-8 tag name */
  name: Scalars['String']['output'];
  /** UTF-8 tag value */
  value: Scalars['String']['output'];
};

/** Find transactions with the following tag name and value */
export type TagFilter = {
  /** How tag names and values are matched. Defaults to EXACT. */
  match?: InputMaybe<TagMatch>;
  /** The tag name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The operator to apply to to the tag filter. Defaults to EQ (equal). */
  op?: InputMaybe<TagOperator>;
  /**
   * An array of values to match against. If multiple values are passed then transactions with _any_ matching tag value from the set will be returned.
   *
   * e.g.
   *
   * `{name: "app-name", values: ["app-1"]}`
   *
   * Returns all transactions where the `app-name` tag has a value of `app-1`.
   *
   * `{name: "app-name", values: ["app-1", "app-2", "app-3"]}`
   *
   * Returns all transactions where the `app-name` tag has a value of either `app-1` _or_ `app-2` _or_ `app-3`.
   */
  values?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The method used to determine if tags match. */
export enum TagMatch {
  /** An exact match */
  Exact = 'EXACT',
  /** Fuzzy match containing all search terms */
  FuzzyAnd = 'FUZZY_AND',
  /** Fuzzy match containing at least one search term */
  FuzzyOr = 'FUZZY_OR',
  /** A wildcard match */
  Wildcard = 'WILDCARD'
}

/** The operator to apply to a tag value. */
export enum TagOperator {
  /** Equal */
  Eq = 'EQ',
  /** Not equal */
  Neq = 'NEQ'
}

/** Transaction Structure */
export type Transaction = {
  __typename?: 'Transaction';
  anchor: Scalars['String']['output'];
  /** Transactions with a null block are recent and unconfirmed, if they aren't mined into a block within 60 minutes they will be removed from results. */
  block?: Maybe<Block>;
  /**
   * For bundled data items this references the containing bundle ID.
   * See: https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md
   */
  bundledIn?: Maybe<Bundle>;
  data: MetaData;
  fee: Amount;
  id: Scalars['ID']['output'];
  /** When this transaction was made available for querying */
  ingested_at?: Maybe<Scalars['Int']['output']>;
  owner: Owner;
  /**
   * @deprecated Don't use, kept for backwards compatability only!
   * @deprecated Use `bundledIn`
   */
  parent?: Maybe<Parent>;
  quantity: Amount;
  recipient: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  tags: Array<Tag>;
};

/**
 * Paginated result set using the GraphQL cursor spec,
 * see: https://relay.dev/graphql/connections.htm.
 */
export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  /** The number of transactions that match this query. */
  count?: Maybe<Scalars['Int']['output']>;
  edges: Array<TransactionEdge>;
  pageInfo: PageInfo;
};

/** Paginated result set using the GraphQL cursor spec. */
export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  /**
   * The cursor value for fetching the next page.
   *
   * Pass this to the `after` parameter in ` transactions(after: $cursor)`, the next page will start from the next item after this.
   */
  cursor: Scalars['String']['output'];
  /** A transaction object. */
  node: Transaction;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Amount: ResolverTypeWrapper<Amount>;
  Block: ResolverTypeWrapper<Block>;
  BlockConnection: ResolverTypeWrapper<BlockConnection>;
  BlockEdge: ResolverTypeWrapper<BlockEdge>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bundle: ResolverTypeWrapper<Bundle>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MetaData: ResolverTypeWrapper<MetaData>;
  Owner: ResolverTypeWrapper<Owner>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Parent: ResolverTypeWrapper<Parent>;
  Query: ResolverTypeWrapper<{}>;
  RangeFilter: RangeFilter;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  TagFilter: TagFilter;
  TagMatch: TagMatch;
  TagOperator: TagOperator;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionConnection: ResolverTypeWrapper<TransactionConnection>;
  TransactionEdge: ResolverTypeWrapper<TransactionEdge>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Amount: Amount;
  Block: Block;
  BlockConnection: BlockConnection;
  BlockEdge: BlockEdge;
  Boolean: Scalars['Boolean']['output'];
  Bundle: Bundle;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  MetaData: MetaData;
  Owner: Owner;
  PageInfo: PageInfo;
  Parent: Parent;
  Query: {};
  RangeFilter: RangeFilter;
  String: Scalars['String']['output'];
  Tag: Tag;
  TagFilter: TagFilter;
  Transaction: Transaction;
  TransactionConnection: TransactionConnection;
  TransactionEdge: TransactionEdge;
};

export type AmountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Amount'] = ResolversParentTypes['Amount']> = {
  ar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  winston?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Block'] = ResolversParentTypes['Block']> = {
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  previous?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlockConnection'] = ResolversParentTypes['BlockConnection']> = {
  edges?: Resolver<Array<ResolversTypes['BlockEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlockEdge'] = ResolversParentTypes['BlockEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Block'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BundleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bundle'] = ResolversParentTypes['Bundle']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['MetaData'] = ResolversParentTypes['MetaData']> = {
  size?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Parent'] = ResolversParentTypes['Parent']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  block?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType, Partial<QueryBlockArgs>>;
  blocks?: Resolver<ResolversTypes['BlockConnection'], ParentType, ContextType, RequireFields<QueryBlocksArgs, 'first' | 'sort'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionArgs, 'id'>>;
  transactions?: Resolver<ResolversTypes['TransactionConnection'], ParentType, ContextType, RequireFields<QueryTransactionsArgs, 'first' | 'sort'>>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  anchor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  block?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType>;
  bundledIn?: Resolver<Maybe<ResolversTypes['Bundle']>, ParentType, ContextType>;
  data?: Resolver<ResolversTypes['MetaData'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['Amount'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ingested_at?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Owner'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Parent']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Amount'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signature?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionConnection'] = ResolversParentTypes['TransactionConnection']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['TransactionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionEdge'] = ResolversParentTypes['TransactionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Amount?: AmountResolvers<ContextType>;
  Block?: BlockResolvers<ContextType>;
  BlockConnection?: BlockConnectionResolvers<ContextType>;
  BlockEdge?: BlockEdgeResolvers<ContextType>;
  Bundle?: BundleResolvers<ContextType>;
  MetaData?: MetaDataResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Parent?: ParentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionConnection?: TransactionConnectionResolvers<ContextType>;
  TransactionEdge?: TransactionEdgeResolvers<ContextType>;
};

