# Public API

## createFastifyApiAdapter

Kind: `function`
Module: `src/features/transport/createFastifyApiAdapter.ts`
Source: `src/features/transport/createFastifyApiAdapter.ts:11:1`

Create the Fastify transport mapper for the canonical Ankhorage API runtime.

### Signatures

- `() => ApiTransportAdapter<FastifyApiTransportRequest, unknown>`
  - returns: `ApiTransportAdapter<FastifyApiTransportRequest, unknown>`

## createFastifyApiServer

Kind: `function`
Module: `src/features/host/createFastifyApiServer.ts`
Source: `src/features/host/createFastifyApiServer.ts:7:1`

Create the Fastify server owned by the Ankhorage Fastify API adapter package.

### Signatures

- `(options?: FastifyServerOptions) => FastifyInstance<import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>`
  - options: `FastifyServerOptions` (optional)
  - returns: `FastifyInstance<import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>`

## FastifyApiTransportRequest

Kind: `type`
Module: `src/types/fastify.ts`
Source: `src/types/fastify.ts:18:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| reply | property | `FastifyReply<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown>` | yes |  |
| request | property | `FastifyRequest<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown, import("fastify").FastifyBaseLogger, import("fastify/types/type-provider").ResolveFastifyRequestType<import("fastify").FastifyTypeProviderDefault, import("fastify").FastifySchema, import("fastify").RouteGenericInterface>>` | yes |  |

## FastifyCorsOptions

Kind: `type`
Module: `node_modules/@fastify/cors/types/index.d.ts`
Source: `node_modules/@fastify/cors/types/index.d.ts:28:3`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| allowedHeaders | property | `string \| string[]` | no |  |
| cacheControl | property | `string \| number` | no |  |
| credentials | property | `boolean` | no |  |
| delegator | property | `FastifyCorsOptionsDelegate` | no |  |
| exposedHeaders | property | `string \| string[]` | no |  |
| hideOptionsRoute | property | `boolean` | no |  |
| hook | property | `FastifyCorsHook` | no |  |
| logLevel | property | `LogLevel` | no |  |
| maxAge | property | `number` | no |  |
| methods | property | `string \| string[]` | no |  |
| optionsSuccessStatus | property | `number` | no |  |
| origin | property | `ValueOrArray<OriginType> \| AsyncOriginFunction \| OriginFunction` | no |  |
| preflight | property | `boolean` | no |  |
| preflightContinue | property | `boolean` | no |  |
| strictPreflight | property | `boolean` | no |  |

## FastifyInstance

Kind: `type`
Module: `node_modules/fastify/types/instance.d.ts`
Source: `node_modules/fastify/types/instance.d.ts:120:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| __@asyncDispose@1486 | method | `() => Promise<undefined>` | yes |  |
| addConstraintStrategy | method | `(strategy: ConstraintStrategy<FindMyWayVersion<RawServer>, unknown>) => void` | yes |  |
| addContentTypeParser | property | `AddContentTypeParser<RawServer, RawRequest, RouteGenericInterface, FastifySchema, TypeProvider>` | yes |  |
| addHook | method | `{ <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger, Fn extends onRequestHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> \| onRequestAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> = onRequestHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>>(name: "onRequest", hook: Fn extends unknown ? Fn extends AsyncFunction ? onRequestAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : onRequestHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger, Fn extends preParsingHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> \| preParsingAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> = preParsingHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>>(name: "preParsing", hook: Fn extends unknown ? Fn extends AsyncFunction ? preParsingAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : preParsingHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger, Fn extends preValidationHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> \| preValidationAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> = preValidationHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>>(name: "preValidation", hook: Fn extends unknown ? Fn extends AsyncFunction ? preValidationAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : preValidationHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger, Fn extends preHandlerHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> \| preHandlerAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> = preHandlerHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>>(name: "preHandler", hook: Fn extends unknown ? Fn extends AsyncFunction ? preHandlerAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : preHandlerHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <PreSerializationPayload = unknown, RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger, Fn extends preSerializationHookHandler<PreSerializationPayload, RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> \| preSerializationAsyncHookHandler<PreSerializationPayload, RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> = preSerializationHookHandler<PreSerializationPayload, RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>>(name: "preSerialization", hook: Fn extends unknown ? Fn extends AsyncFunction ? preSerializationAsyncHookHandler<PreSerializationPayload, RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : preSerializationHookHandler<PreSerializationPayload, RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <OnSendPayload = unknown, RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger, Fn extends onSendHookHandler<OnSendPayload, RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> \| onSendAsyncHookHandler<OnSendPayload, RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> = onSendHookHandler<OnSendPayload, RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>>(name: "onSend", hook: Fn extends unknown ? Fn extends AsyncFunction ? onSendAsyncHookHandler<OnSendPayload, RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : onSendHookHandler<OnSendPayload, RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger, Fn extends onResponseHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> \| onResponseAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> = onResponseHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>>(name: "onResponse", hook: Fn extends unknown ? Fn extends AsyncFunction ? onResponseAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : onResponseHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger, Fn extends onTimeoutHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> \| onTimeoutAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> = onTimeoutHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>>(name: "onTimeout", hook: Fn extends unknown ? Fn extends AsyncFunction ? onTimeoutAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : onTimeoutHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger, Fn extends onRequestAbortHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> \| onRequestAbortAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> = onRequestAbortHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>>(name: "onRequestAbort", hook: Fn extends unknown ? Fn extends AsyncFunction ? onRequestAbortAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : onRequestAbortHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger, Fn extends onErrorHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, FastifyError, SchemaCompiler, TypeProvider, Logger> \| onErrorAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, FastifyError, SchemaCompiler, TypeProvider, Logger> = onErrorHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, FastifyError, SchemaCompiler, TypeProvider, Logger>>(name: "onError", hook: Fn extends unknown ? Fn extends AsyncFunction ? onErrorAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, FastifyError, SchemaCompiler, TypeProvider, Logger> : onErrorHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, FastifyError, SchemaCompiler, TypeProvider, Logger> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema, Logger extends FastifyBaseLogger = FastifyBaseLogger>(name: "onRoute", hook: onRouteHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; (name: "onRegister", hook: onRegisterHookHandler<RawServer, RawRequest, RawReply, Logger, TypeProvider>): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <Fn extends onReadyHookHandler \| onReadyAsyncHookHandler = onReadyHookHandler<RawServerDefault, http.IncomingMessage, http.ServerResponse<http.IncomingMessage>, FastifyBaseLogger, FastifyTypeProviderDefault>>(name: "onReady", hook: Fn extends unknown ? Fn extends AsyncFunction ? onReadyAsyncHookHandler : onReadyHookHandler : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <Fn extends onListenHookHandler<RawServer, RawRequest, RawReply, Logger, TypeProvider> \| onListenAsyncHookHandler<RawServer, RawRequest, RawReply, Logger, TypeProvider> = onListenHookHandler<RawServer, RawRequest, RawReply, Logger, TypeProvider>>(name: "onListen", hook: Fn extends unknown ? Fn extends AsyncFunction ? onListenAsyncHookHandler : onListenHookHandler : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <Fn extends onCloseHookHandler \| onCloseAsyncHookHandler = onCloseHookHandler<RawServerDefault, http.IncomingMessage, http.ServerResponse<http.IncomingMessage>, FastifyBaseLogger, FastifyTypeProviderDefault>>(name: "onClose", hook: Fn extends unknown ? Fn extends AsyncFunction ? onCloseAsyncHookHandler : onCloseHookHandler : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <Fn extends preCloseHookHandler \| preCloseAsyncHookHandler = preCloseHookHandler<RawServerDefault, http.IncomingMessage, http.ServerResponse<http.IncomingMessage>, FastifyBaseLogger, FastifyTypeProviderDefault>>(name: "preClose", hook: Fn extends unknown ? Fn extends AsyncFunction ? preCloseAsyncHookHandler : preCloseHookHandler : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <K extends ApplicationHook \| LifecycleHook, Fn extends (...args: any) => Promise<any> \| any>(name: K, hook: Fn extends unknown ? Fn extends AsyncFunction ? HookAsyncLookup<K> : HookLookup<K> : Fn): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; }` | yes |  |
| addHttpMethod | method | `(method: string, methodOptions?: { hasBody?: boolean; overrideExisting?: boolean; }) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| addresses | method | `() => AddressInfo[]` | yes |  |
| addSchema | method | `(schema: unknown) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| after | method | `{ (): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider> & SafePromiseLike<undefined>; (afterListener: (err: Error \| null) => void): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; }` | yes |  |
| all | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| childLoggerFactory | property | `FastifyChildLoggerFactory<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| close | method | `{ (): Promise<undefined>; (closeListener: () => void): undefined; }` | yes |  |
| copy | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| decorate | property | `DecorationMethod<FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>, FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>>` | yes |  |
| decorateReply | property | `DecorationMethod<FastifyReply<RouteGenericInterface, RawServerDefault, http.IncomingMessage, http.ServerResponse<http.IncomingMessage>, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>, FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>>` | yes |  |
| decorateRequest | property | `DecorationMethod<FastifyRequest<RouteGenericInterface, RawServerDefault, http.IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, import("./type-provider").ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>>` | yes |  |
| defaultTextParser | property | `FastifyBodyParser<string>` | yes |  |
| delete | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| errorHandler | property | `<TError = unknown>(error: TError, request: FastifyRequest, reply: FastifyReply) => void` | yes |  |
| findRoute | method | `<RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema>(opts: Pick<RouteOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider>, "method" \| "url" \| "constraints">) => Omit<FindMyWayFindResult<RawServer>, "store">` | yes |  |
| get | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| getDecorator | method | `<T>(name: string \| symbol) => T` | yes |  |
| getDefaultJsonParser | property | `getDefaultJsonParser` | yes |  |
| getSchema | method | `(schemaId: string) => unknown` | yes |  |
| getSchemas | method | `() => Record<string, unknown>` | yes |  |
| hasConstraintStrategy | method | `(strategyName: string) => boolean` | yes |  |
| hasContentTypeParser | property | `hasContentTypeParser` | yes |  |
| hasDecorator | method | `(decorator: string \| symbol) => boolean` | yes |  |
| hasPlugin | method | `(name: string) => boolean` | yes |  |
| hasReplyDecorator | method | `(decorator: string \| symbol) => boolean` | yes |  |
| hasRequestDecorator | method | `(decorator: string \| symbol) => boolean` | yes |  |
| hasRoute | method | `<RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, SchemaCompiler extends FastifySchema = FastifySchema>(opts: Pick<RouteOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider>, "method" \| "url" \| "constraints">) => boolean` | yes |  |
| head | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| initialConfig | property | `Readonly<{ connectionTimeout?: number; keepAliveTimeout?: number; forceCloseConnections?: boolean; bodyLimit?: number; caseSensitive?: boolean; allowUnsafeRegex?: boolean; http2?: boolean; https?: boolean \| Readonly<{ allowHTTP1: boolean; }>; ignoreTrailingSlash?: boolean; ignoreDuplicateSlashes?: boolean; disableRequestLogging?: boolean \| ((req: FastifyRequest) => boolean); maxParamLength?: number; onProtoPoisoning?: ProtoAction; onConstructorPoisoning?: ConstructorAction; pluginTimeout?: number; requestIdHeader?: string \| false; requestIdLogLabel?: string; http2SessionTimeout?: number; useSemicolonDelimiter?: boolean; routerOptions?: FastifyRouterOptions<RawServer>; }>` | yes |  |
| inject | method | `{ (opts: InjectOptions \| string, cb: LightMyRequestCallback): void; (opts: InjectOptions \| string): Promise<LightMyRequestResponse>; (): LightMyRequestChain; }` | yes |  |
| listen | method | `{ (opts: FastifyListenOptions, callback: (err: Error \| null, address: string) => void): void; (opts?: FastifyListenOptions): Promise<string>; (callback: (err: Error \| null, address: string) => void): void; }` | yes |  |
| listeningOrigin | property | `string` | yes |  |
| lock | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| log | property | `Logger` | yes |  |
| mkcalendar | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| mkcol | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| move | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| options | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| patch | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| pluginName | property | `string` | yes |  |
| post | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| prefix | property | `string` | yes |  |
| printPlugins | method | `() => string` | yes |  |
| printRoutes | method | `(opts?: PrintRoutesOptions) => string` | yes |  |
| propfind | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| proppatch | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| put | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| query | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| ready | method | `{ (): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider> & SafePromiseLike<undefined>; (readyListener: (err: Error \| null) => void \| Promise<void>): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; }` | yes |  |
| register | property | `FastifyRegister<FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider> & PromiseLike<undefined> & { __linterBrands: "SafePromiseLike"; }, RawServerDefault, FastifyTypeProvider, FastifyBaseLogger>` | yes |  |
| removeAllContentTypeParsers | property | `removeAllContentTypeParsers` | yes |  |
| removeContentTypeParser | property | `removeContentTypeParser` | yes |  |
| report | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| route | method | `<RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig = unknown, const SchemaCompiler extends FastifySchema = FastifySchema>(opts: RouteOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| routing | method | `(req: RawRequest, res: RawReply) => void` | yes |  |
| search | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| serializerCompiler | property | `FastifySerializerCompiler<any> \| undefined` | yes |  |
| server | property | `RawServer` | yes |  |
| setChildLoggerFactory | method | `(factory: FastifyChildLoggerFactory<RawServer, RawRequest, RawReply, Logger, TypeProvider>) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| setErrorHandler | method | `<TError = unknown, RouteGeneric extends RouteGenericInterface = RouteGenericInterface, SchemaCompiler extends FastifySchema = FastifySchema, TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault>(handler: (this: FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>, error: TError, request: FastifyRequest<RouteGeneric, RawServer, RawRequest, SchemaCompiler, TypeProvider>, reply: FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfigDefault, SchemaCompiler, TypeProvider>) => any \| Promise<any>) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| setGenReqId | method | `(fn: (req: RawRequestDefaultExpression<RawServer>) => string) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| setNotFoundHandler | method | `{ <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig extends ContextConfigDefault = unknown, TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault, SchemaCompiler extends FastifySchema = FastifySchema>(handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; <RouteGeneric extends RouteGenericInterface = RouteGenericInterface, ContextConfig extends ContextConfigDefault = unknown, TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault, SchemaCompiler extends FastifySchema = FastifySchema>(opts: { preValidation?: preValidationHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider> \| preValidationAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider> \| preValidationHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider>[] \| preValidationAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider>[]; preHandler?: preHandlerHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider> \| preHandlerAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider> \| preHandlerHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider>[] \| preHandlerAsyncHookHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider>[]; }, handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>): FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>; }` | yes |  |
| setReplySerializer | method | `(replySerializer: (payload: unknown, statusCode: number) => string) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| setSchemaController | method | `(schemaControllerOpts: FastifySchemaControllerOptions) => FastifyInstance<RawServer, RawRequest, RawReply, Logger>` | yes |  |
| setSchemaErrorFormatter | method | `(errorFormatter: SchemaErrorFormatter) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| setSerializerCompiler | method | `<T = FastifySchema>(schemaCompiler: FastifySerializerCompiler<T>) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| setValidatorCompiler | method | `<T = FastifySchema>(schemaCompiler: FastifySchemaCompiler<T>) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>` | yes |  |
| supportedMethods | property | `string[]` | yes |  |
| trace | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| unlock | property | `RouteShorthandMethod<RawServer, RawRequest, RawReply, TypeProvider, Logger>` | yes |  |
| validatorCompiler | property | `FastifySchemaCompiler<any> \| undefined` | yes |  |
| version | property | `string` | yes |  |
| withTypeProvider | method | `<Provider extends FastifyTypeProvider>() => FastifyInstance<RawServer, RawRequest, RawReply, Logger, Provider>` | yes |  |

## FastifyRegisteredOperation

Kind: `type`
Module: `src/types/fastify.ts`
Source: `src/types/fastify.ts:27:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| binding | property | `ApiOperationBinding` | yes |  |
| path | property | `string` | yes |  |

## FastifyReply

Kind: `type`
Module: `node_modules/fastify/types/reply.d.ts`
Source: `node_modules/fastify/types/reply.d.ts:33:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| callNotFound | method | `() => void` | yes |  |
| code | method | `<Code extends keyof SchemaCompiler["response"] extends never ? ReplyKeysToCodes<keyof RouteGeneric["Reply"]> : keyof SchemaCompiler["response"] extends ReplyKeysToCodes<keyof RouteGeneric["Reply"]> ? keyof SchemaCompiler["response"] : ReplyKeysToCodes<keyof RouteGeneric["Reply"]>>(statusCode: Code) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider, ResolveReplyTypeWithRouteGeneric<RouteGeneric["Reply"], Code, SchemaCompiler, TypeProvider>>` | yes |  |
| compileSerializationSchema | method | `(schema: { [key: string]: unknown; }, httpStatus?: string, contentType?: string) => (payload: { [key: string]: unknown; }) => string` | yes |  |
| elapsedTime | property | `number` | yes |  |
| getDecorator | method | `<T>(name: string \| symbol) => T` | yes |  |
| getHeader | method | `(key: HttpHeader) => number \| string \| string[] \| undefined` | yes |  |
| getHeaders | method | `() => Record<HttpHeader, number \| string \| string[] \| undefined>` | yes |  |
| getSerializationFunction | method | `{ (httpStatus: string, contentType?: string): ((payload: { [key: string]: unknown; }) => string) \| undefined; (schema: { [key: string]: unknown; }): ((payload: { [key: string]: unknown; }) => string) \| undefined; }` | yes |  |
| hasHeader | method | `(key: HttpHeader) => boolean` | yes |  |
| hasTrailer | method | `(key: string) => boolean` | yes |  |
| header | method | `(key: HttpHeader, value: any) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>` | yes |  |
| headers | method | `(values: Partial<Record<HttpHeader, number \| string \| string[] \| undefined>>) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>` | yes |  |
| hijack | method | `() => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>` | yes |  |
| log | property | `FastifyBaseLogger` | yes |  |
| raw | property | `RawReply` | yes |  |
| redirect | method | `(url: string, statusCode?: number) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>` | yes |  |
| removeHeader | method | `(key: HttpHeader) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>` | yes |  |
| removeTrailer | method | `(key: string) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>` | yes |  |
| request | property | `FastifyRequest<RouteGeneric, RawServer, RawRequest, SchemaCompiler, TypeProvider, unknown, FastifyBaseLogger, import("./type-provider").ResolveFastifyRequestType<TypeProvider, SchemaCompiler, RouteGeneric>>` | yes |  |
| routeOptions | property | `Readonly<RequestRouteOptions<ContextConfig, SchemaCompiler>>` | yes |  |
| send | method | `(...args: SendArgs<ReplyType>) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>` | yes |  |
| sent | property | `boolean` | yes |  |
| serialize | method | `(payload: any) => string \| ArrayBuffer \| Buffer` | yes |  |
| serializeInput | method | `{ (input: { [key: string]: unknown; }, schema: { [key: string]: unknown; }, httpStatus?: string, contentType?: string): string; (input: { [key: string]: unknown; }, httpStatus: string, contentType?: string): unknown; }` | yes |  |
| serializer | method | `(fn: (payload: any) => string) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>` | yes |  |
| server | property | `FastifyInstance<RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, FastifyBaseLogger, FastifyTypeProviderDefault>` | yes |  |
| status | method | `<Code extends keyof SchemaCompiler["response"] extends never ? ReplyKeysToCodes<keyof RouteGeneric["Reply"]> : keyof SchemaCompiler["response"] extends ReplyKeysToCodes<keyof RouteGeneric["Reply"]> ? keyof SchemaCompiler["response"] : ReplyKeysToCodes<keyof RouteGeneric["Reply"]>>(statusCode: Code) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider, ResolveReplyTypeWithRouteGeneric<RouteGeneric["Reply"], Code, SchemaCompiler, TypeProvider>>` | yes |  |
| statusCode | property | `number` | yes |  |
| then | method | `(fulfilled: () => void, rejected: (err: Error) => void) => void` | yes |  |
| trailer | property | `(key: string, fn: ((reply: FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>, payload: string \| Buffer \| null) => Promise<string>) \| ((reply: FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>, payload: string \| Buffer \| null, done: (err: Error \| null, value?: string) => void) => void)) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>` | yes |  |
| type | method | `(contentType: string) => FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider>` | yes |  |
| writeEarlyHints | method | `(hints: Record<string, string \| string[]>, callback?: () => void) => void` | yes |  |

## FastifyRequest

Kind: `type`
Module: `node_modules/fastify/types/request.d.ts`
Source: `node_modules/fastify/types/request.d.ts:43:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | property | `RequestType["body"]` | yes |  |
| compileValidationSchema | method | `(schema: { [key: string]: any; }, httpPart?: HTTPRequestPart) => ValidationFunction` | yes |  |
| getDecorator | method | `<T>(name: string \| symbol) => T` | yes |  |
| getValidationFunction | method | `{ (httpPart: HTTPRequestPart): ValidationFunction \| undefined; (schema: { [key: string]: any; }): ValidationFunction \| undefined; }` | yes |  |
| headers | property | `RawRequest["headers"] & RequestType["headers"]` | yes |  |
| host | property | `string` | yes |  |
| hostname | property | `string` | yes |  |
| id | property | `string` | yes |  |
| ip | property | `string` | yes |  |
| ips | property | `string[]` | no |  |
| is404 | property | `boolean` | yes |  |
| log | property | `Logger` | yes |  |
| mediaType | property | `string \| undefined` | yes |  |
| method | property | `string` | yes |  |
| originalUrl | property | `string` | yes |  |
| params | property | `RequestType["params"]` | yes |  |
| port | property | `number \| null` | yes |  |
| protocol | property | `"http" \| "https"` | yes |  |
| query | property | `RequestType["query"]` | yes |  |
| raw | property | `RawRequest` | yes |  |
| req | property | `RawRequest & RouteGeneric["Headers"]` | yes |  |
| routeOptions | property | `Readonly<RequestRouteOptions<ContextConfig, SchemaCompiler>>` | yes |  |
| server | property | `FastifyInstance<RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, FastifyBaseLogger, FastifyTypeProviderDefault>` | yes |  |
| setDecorator | method | `<T = unknown>(name: string \| symbol, value: T) => void` | yes |  |
| signal | property | `AbortSignal` | yes |  |
| socket | property | `RawRequest["socket"]` | yes |  |
| url | property | `string` | yes |  |
| validateInput | method | `{ (input: any, schema: { [key: string]: any; }, httpPart?: HTTPRequestPart): boolean; (input: any, httpPart?: HTTPRequestPart): boolean; }` | yes |  |
| validationError | property | `Error & { validation: any; validationContext: string; }` | no |  |

## FastifyServerOptions

Kind: `unknown`
Module: `node_modules/fastify/fastify.d.ts`
Source: `node_modules/fastify/fastify.d.ts:120:3`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| ajv | property | `({ onCreate?: (ajvInstance: import("@fastify/ajv-compiler").Ajv) => void; plugins?: (import("ajv").Plugin<unknown> \| [import("ajv").Plugin<unknown>, unknown])[]; } & { mode: "JTD"; customOptions?: import("ajv/dist/jtd").JTDOptions; }) \| ({ onCreate?: (ajvInstance: import("@fastify/ajv-compiler").Ajv) => void; plugins?: (import("ajv").Plugin<unknown> \| [import("ajv").Plugin<unknown>, unknown])[]; } & { mode?: never; customOptions?: import("@fastify/ajv-compiler").Options; }) \| undefined` | no |  |
| allowErrorHandlerOverride | property | `boolean` | no |  |
| allowUnsafeRegex | property | `boolean` | no |  |
| bodyLimit | property | `number` | no |  |
| caseSensitive | property | `boolean` | no |  |
| childLoggerFactory | property | `FastifyChildLoggerFactory<RawServerDefault, http.IncomingMessage, http.ServerResponse<http.IncomingMessage>, FastifyBaseLogger, FastifyTypeProviderDefault>` | no |  |
| clientErrorHandler | property | `(error: ConnectionError, socket: Socket) => void` | no |  |
| connectionTimeout | property | `number` | no |  |
| constraints | property | `{ [name: string]: ConstraintStrategy<RawServer extends http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> ? HTTPVersion.V1 : HTTPVersion.V2, unknown>; }` | no |  |
| disableRequestLogging | property | `boolean \| ((req: FastifyRequest) => boolean)` | no |  |
| exposeHeadRoutes | property | `boolean` | no |  |
| forceCloseConnections | property | `boolean \| "idle"` | no |  |
| frameworkErrors | property | `<RequestGeneric extends RequestGenericInterface = RequestGenericInterface, TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault, SchemaCompiler extends FastifySchema = FastifySchema>(error: FastifyError, req: FastifyRequest<RequestGeneric, RawServer, RawRequestDefaultExpression<RawServer>, FastifySchema, TypeProvider>, res: FastifyReply<RequestGeneric, RawServer, RawRequestDefaultExpression<RawServer>, RawReplyDefaultExpression<RawServer>, FastifyContextConfig, SchemaCompiler, TypeProvider>) => void` | no |  |
| genReqId | property | `(req: RawRequestDefaultExpression<RawServer>) => string` | no |  |
| handlerTimeout | property | `number` | no |  |
| ignoreDuplicateSlashes | property | `boolean` | no |  |
| ignoreTrailingSlash | property | `boolean` | no |  |
| keepAliveTimeout | property | `number` | no |  |
| logController | property | `LogControllerClass` | no |  |
| logger | property | `boolean \| (FastifyLoggerOptions<RawServer, FastifyRequest<RouteGenericInterface, RawServer, RawRequestDefaultExpression<RawServer>, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, import("./types/type-provider").ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, FastifyReply<RouteGenericInterface, RawServer, RawRequestDefaultExpression<RawServer>, RawReplyDefaultExpression<RawServer>, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>> & PinoLoggerOptions<never, boolean>)` | no |  |
| loggerInstance | property | `Logger` | no |  |
| maxParamLength | property | `number` | no |  |
| maxRequestsPerSocket | property | `number` | no |  |
| onConstructorPoisoning | property | `ConstructorAction` | no |  |
| onProtoPoisoning | property | `ProtoAction` | no |  |
| pluginTimeout | property | `number` | no |  |
| querystringParser | property | `(str: string) => { [key: string]: unknown; }` | no |  |
| requestIdHeader | property | `string \| false` | no |  |
| requestIdLogLabel | property | `string` | no |  |
| requestTimeout | property | `number` | no |  |
| return503OnClosing | property | `boolean` | no |  |
| rewriteUrl | property | `(this: FastifyInstance<RawServer, RawRequestDefaultExpression<RawServer>, RawReplyDefaultExpression<RawServer>, Logger, FastifyTypeProviderDefault>, req: RawRequestDefaultExpression<RawServer>) => string` | no |  |
| routerOptions | property | `FastifyRouterOptions<RawServer>` | no |  |
| schemaController | property | `{ bucket?: (parentSchemas?: unknown) => { add(schema: unknown): FastifyInstance; getSchema(schemaId: string): unknown; getSchemas(): Record<string, unknown>; }; compilersFactory?: { buildValidator?: ValidatorFactory; buildSerializer?: SerializerFactory; }; }` | no |  |
| schemaErrorFormatter | property | `SchemaErrorFormatter` | no |  |
| serializerOpts | property | `Record<string, unknown> \| FJSOptions` | no |  |
| serverFactory | property | `FastifyServerFactory<RawServer>` | no |  |
| trustProxy | property | `string \| boolean \| string[] \| ((address: string, hop: number) => boolean)` | no |  |
| useSemicolonDelimiter | property | `boolean` | no |  |

## registerFastifyApiAsync

Kind: `function`
Module: `src/features/transport/registerFastifyApiAsync.ts`
Source: `src/features/transport/registerFastifyApiAsync.ts:16:1`

Register every runtime operation as a Fastify route using one shared transport adapter.

### Signatures

- `(server: FastifyInstance<import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>, runtime: ApiRuntime, options?: RegisterFastifyApiOptions) => Promise<readonly FastifyRegisteredOperation[]>`
  - options: `RegisterFastifyApiOptions` (optional)
  - runtime: `ApiRuntime`
  - server: `FastifyInstance<import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>`
  - returns: `Promise<readonly FastifyRegisteredOperation[]>`

## RegisterFastifyApiOptions

Kind: `type`
Module: `src/types/fastify.ts`
Source: `src/types/fastify.ts:23:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| prefix | property | `string` | no |  |

## registerFastifyCorsAsync

Kind: `function`
Module: `src/features/host/registerFastifyCorsAsync.ts`
Source: `src/features/host/registerFastifyCorsAsync.ts:5:1`

Register Fastify CORS so consumers do not own the plugin directly.

### Signatures

- `(server: FastifyInstance<import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>, options: FastifyCorsOptions) => Promise<void>`
  - options: `FastifyCorsOptions`
  - server: `FastifyInstance<import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>`
  - returns: `Promise<void>`
