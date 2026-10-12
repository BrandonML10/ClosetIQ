
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Prenda
 * 
 */
export type Prenda = $Result.DefaultSelection<Prisma.$PrendaPayload>
/**
 * Model Outfit
 * 
 */
export type Outfit = $Result.DefaultSelection<Prisma.$OutfitPayload>
/**
 * Model OutfitPrenda
 * 
 */
export type OutfitPrenda = $Result.DefaultSelection<Prisma.$OutfitPrendaPayload>
/**
 * Model Calendario
 * 
 */
export type Calendario = $Result.DefaultSelection<Prisma.$CalendarioPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prenda`: Exposes CRUD operations for the **Prenda** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prendas
    * const prendas = await prisma.prenda.findMany()
    * ```
    */
  get prenda(): Prisma.PrendaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outfit`: Exposes CRUD operations for the **Outfit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Outfits
    * const outfits = await prisma.outfit.findMany()
    * ```
    */
  get outfit(): Prisma.OutfitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outfitPrenda`: Exposes CRUD operations for the **OutfitPrenda** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutfitPrendas
    * const outfitPrendas = await prisma.outfitPrenda.findMany()
    * ```
    */
  get outfitPrenda(): Prisma.OutfitPrendaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.calendario`: Exposes CRUD operations for the **Calendario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Calendarios
    * const calendarios = await prisma.calendario.findMany()
    * ```
    */
  get calendario(): Prisma.CalendarioDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Prenda: 'Prenda',
    Outfit: 'Outfit',
    OutfitPrenda: 'OutfitPrenda',
    Calendario: 'Calendario'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "prenda" | "outfit" | "outfitPrenda" | "calendario"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Prenda: {
        payload: Prisma.$PrendaPayload<ExtArgs>
        fields: Prisma.PrendaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrendaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrendaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload>
          }
          findFirst: {
            args: Prisma.PrendaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrendaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload>
          }
          findMany: {
            args: Prisma.PrendaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload>[]
          }
          create: {
            args: Prisma.PrendaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload>
          }
          createMany: {
            args: Prisma.PrendaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrendaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload>[]
          }
          delete: {
            args: Prisma.PrendaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload>
          }
          update: {
            args: Prisma.PrendaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload>
          }
          deleteMany: {
            args: Prisma.PrendaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrendaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrendaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload>[]
          }
          upsert: {
            args: Prisma.PrendaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrendaPayload>
          }
          aggregate: {
            args: Prisma.PrendaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrenda>
          }
          groupBy: {
            args: Prisma.PrendaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrendaGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrendaCountArgs<ExtArgs>
            result: $Utils.Optional<PrendaCountAggregateOutputType> | number
          }
        }
      }
      Outfit: {
        payload: Prisma.$OutfitPayload<ExtArgs>
        fields: Prisma.OutfitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutfitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutfitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          findFirst: {
            args: Prisma.OutfitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutfitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          findMany: {
            args: Prisma.OutfitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>[]
          }
          create: {
            args: Prisma.OutfitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          createMany: {
            args: Prisma.OutfitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutfitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>[]
          }
          delete: {
            args: Prisma.OutfitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          update: {
            args: Prisma.OutfitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          deleteMany: {
            args: Prisma.OutfitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutfitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OutfitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>[]
          }
          upsert: {
            args: Prisma.OutfitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          aggregate: {
            args: Prisma.OutfitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutfit>
          }
          groupBy: {
            args: Prisma.OutfitGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutfitGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutfitCountArgs<ExtArgs>
            result: $Utils.Optional<OutfitCountAggregateOutputType> | number
          }
        }
      }
      OutfitPrenda: {
        payload: Prisma.$OutfitPrendaPayload<ExtArgs>
        fields: Prisma.OutfitPrendaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutfitPrendaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutfitPrendaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload>
          }
          findFirst: {
            args: Prisma.OutfitPrendaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutfitPrendaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload>
          }
          findMany: {
            args: Prisma.OutfitPrendaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload>[]
          }
          create: {
            args: Prisma.OutfitPrendaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload>
          }
          createMany: {
            args: Prisma.OutfitPrendaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutfitPrendaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload>[]
          }
          delete: {
            args: Prisma.OutfitPrendaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload>
          }
          update: {
            args: Prisma.OutfitPrendaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload>
          }
          deleteMany: {
            args: Prisma.OutfitPrendaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutfitPrendaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OutfitPrendaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload>[]
          }
          upsert: {
            args: Prisma.OutfitPrendaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPrendaPayload>
          }
          aggregate: {
            args: Prisma.OutfitPrendaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutfitPrenda>
          }
          groupBy: {
            args: Prisma.OutfitPrendaGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutfitPrendaGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutfitPrendaCountArgs<ExtArgs>
            result: $Utils.Optional<OutfitPrendaCountAggregateOutputType> | number
          }
        }
      }
      Calendario: {
        payload: Prisma.$CalendarioPayload<ExtArgs>
        fields: Prisma.CalendarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CalendarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CalendarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload>
          }
          findFirst: {
            args: Prisma.CalendarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CalendarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload>
          }
          findMany: {
            args: Prisma.CalendarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload>[]
          }
          create: {
            args: Prisma.CalendarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload>
          }
          createMany: {
            args: Prisma.CalendarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CalendarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload>[]
          }
          delete: {
            args: Prisma.CalendarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload>
          }
          update: {
            args: Prisma.CalendarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload>
          }
          deleteMany: {
            args: Prisma.CalendarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CalendarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CalendarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload>[]
          }
          upsert: {
            args: Prisma.CalendarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarioPayload>
          }
          aggregate: {
            args: Prisma.CalendarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCalendario>
          }
          groupBy: {
            args: Prisma.CalendarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<CalendarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.CalendarioCountArgs<ExtArgs>
            result: $Utils.Optional<CalendarioCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    prenda?: PrendaOmit
    outfit?: OutfitOmit
    outfitPrenda?: OutfitPrendaOmit
    calendario?: CalendarioOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    prendas: number
    outfits: number
    calendarios: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prendas?: boolean | UsuarioCountOutputTypeCountPrendasArgs
    outfits?: boolean | UsuarioCountOutputTypeCountOutfitsArgs
    calendarios?: boolean | UsuarioCountOutputTypeCountCalendariosArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountPrendasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrendaWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountOutfitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountCalendariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarioWhereInput
  }


  /**
   * Count Type PrendaCountOutputType
   */

  export type PrendaCountOutputType = {
    outfits: number
  }

  export type PrendaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outfits?: boolean | PrendaCountOutputTypeCountOutfitsArgs
  }

  // Custom InputTypes
  /**
   * PrendaCountOutputType without action
   */
  export type PrendaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrendaCountOutputType
     */
    select?: PrendaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PrendaCountOutputType without action
   */
  export type PrendaCountOutputTypeCountOutfitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitPrendaWhereInput
  }


  /**
   * Count Type OutfitCountOutputType
   */

  export type OutfitCountOutputType = {
    prendas: number
    calendarios: number
  }

  export type OutfitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prendas?: boolean | OutfitCountOutputTypeCountPrendasArgs
    calendarios?: boolean | OutfitCountOutputTypeCountCalendariosArgs
  }

  // Custom InputTypes
  /**
   * OutfitCountOutputType without action
   */
  export type OutfitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitCountOutputType
     */
    select?: OutfitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OutfitCountOutputType without action
   */
  export type OutfitCountOutputTypeCountPrendasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitPrendaWhereInput
  }

  /**
   * OutfitCountOutputType without action
   */
  export type OutfitCountOutputTypeCountCalendariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarioWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    rol: string | null
    estilo_preferido: string | null
    fecha_registro: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    rol: string | null
    estilo_preferido: string | null
    fecha_registro: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    rol: number
    estilo_preferido: number
    fecha_registro: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    rol?: true
    estilo_preferido?: true
    fecha_registro?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    rol?: true
    estilo_preferido?: true
    fecha_registro?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    rol?: true
    estilo_preferido?: true
    fecha_registro?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    username: string
    email: string
    password: string
    rol: string
    estilo_preferido: string | null
    fecha_registro: Date
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    estilo_preferido?: boolean
    fecha_registro?: boolean
    prendas?: boolean | Usuario$prendasArgs<ExtArgs>
    outfits?: boolean | Usuario$outfitsArgs<ExtArgs>
    calendarios?: boolean | Usuario$calendariosArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    estilo_preferido?: boolean
    fecha_registro?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    estilo_preferido?: boolean
    fecha_registro?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    estilo_preferido?: boolean
    fecha_registro?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "rol" | "estilo_preferido" | "fecha_registro", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prendas?: boolean | Usuario$prendasArgs<ExtArgs>
    outfits?: boolean | Usuario$outfitsArgs<ExtArgs>
    calendarios?: boolean | Usuario$calendariosArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      prendas: Prisma.$PrendaPayload<ExtArgs>[]
      outfits: Prisma.$OutfitPayload<ExtArgs>[]
      calendarios: Prisma.$CalendarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      password: string
      rol: string
      estilo_preferido: string | null
      fecha_registro: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prendas<T extends Usuario$prendasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$prendasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    outfits<T extends Usuario$outfitsArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$outfitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    calendarios<T extends Usuario$calendariosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$calendariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly username: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly password: FieldRef<"Usuario", 'String'>
    readonly rol: FieldRef<"Usuario", 'String'>
    readonly estilo_preferido: FieldRef<"Usuario", 'String'>
    readonly fecha_registro: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.prendas
   */
  export type Usuario$prendasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
    where?: PrendaWhereInput
    orderBy?: PrendaOrderByWithRelationInput | PrendaOrderByWithRelationInput[]
    cursor?: PrendaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrendaScalarFieldEnum | PrendaScalarFieldEnum[]
  }

  /**
   * Usuario.outfits
   */
  export type Usuario$outfitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    where?: OutfitWhereInput
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    cursor?: OutfitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitScalarFieldEnum | OutfitScalarFieldEnum[]
  }

  /**
   * Usuario.calendarios
   */
  export type Usuario$calendariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    where?: CalendarioWhereInput
    orderBy?: CalendarioOrderByWithRelationInput | CalendarioOrderByWithRelationInput[]
    cursor?: CalendarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CalendarioScalarFieldEnum | CalendarioScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Prenda
   */

  export type AggregatePrenda = {
    _count: PrendaCountAggregateOutputType | null
    _avg: PrendaAvgAggregateOutputType | null
    _sum: PrendaSumAggregateOutputType | null
    _min: PrendaMinAggregateOutputType | null
    _max: PrendaMaxAggregateOutputType | null
  }

  export type PrendaAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
  }

  export type PrendaSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
  }

  export type PrendaMinAggregateOutputType = {
    id: number | null
    imagen_url: string | null
    categoria: string | null
    color_principal: string | null
    estado: string | null
    fecha_creacion: Date | null
    usuarioId: number | null
  }

  export type PrendaMaxAggregateOutputType = {
    id: number | null
    imagen_url: string | null
    categoria: string | null
    color_principal: string | null
    estado: string | null
    fecha_creacion: Date | null
    usuarioId: number | null
  }

  export type PrendaCountAggregateOutputType = {
    id: number
    imagen_url: number
    categoria: number
    color_principal: number
    estado: number
    fecha_creacion: number
    usuarioId: number
    _all: number
  }


  export type PrendaAvgAggregateInputType = {
    id?: true
    usuarioId?: true
  }

  export type PrendaSumAggregateInputType = {
    id?: true
    usuarioId?: true
  }

  export type PrendaMinAggregateInputType = {
    id?: true
    imagen_url?: true
    categoria?: true
    color_principal?: true
    estado?: true
    fecha_creacion?: true
    usuarioId?: true
  }

  export type PrendaMaxAggregateInputType = {
    id?: true
    imagen_url?: true
    categoria?: true
    color_principal?: true
    estado?: true
    fecha_creacion?: true
    usuarioId?: true
  }

  export type PrendaCountAggregateInputType = {
    id?: true
    imagen_url?: true
    categoria?: true
    color_principal?: true
    estado?: true
    fecha_creacion?: true
    usuarioId?: true
    _all?: true
  }

  export type PrendaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prenda to aggregate.
     */
    where?: PrendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prendas to fetch.
     */
    orderBy?: PrendaOrderByWithRelationInput | PrendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prendas
    **/
    _count?: true | PrendaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrendaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrendaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrendaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrendaMaxAggregateInputType
  }

  export type GetPrendaAggregateType<T extends PrendaAggregateArgs> = {
        [P in keyof T & keyof AggregatePrenda]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrenda[P]>
      : GetScalarType<T[P], AggregatePrenda[P]>
  }




  export type PrendaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrendaWhereInput
    orderBy?: PrendaOrderByWithAggregationInput | PrendaOrderByWithAggregationInput[]
    by: PrendaScalarFieldEnum[] | PrendaScalarFieldEnum
    having?: PrendaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrendaCountAggregateInputType | true
    _avg?: PrendaAvgAggregateInputType
    _sum?: PrendaSumAggregateInputType
    _min?: PrendaMinAggregateInputType
    _max?: PrendaMaxAggregateInputType
  }

  export type PrendaGroupByOutputType = {
    id: number
    imagen_url: string | null
    categoria: string | null
    color_principal: string | null
    estado: string
    fecha_creacion: Date
    usuarioId: number
    _count: PrendaCountAggregateOutputType | null
    _avg: PrendaAvgAggregateOutputType | null
    _sum: PrendaSumAggregateOutputType | null
    _min: PrendaMinAggregateOutputType | null
    _max: PrendaMaxAggregateOutputType | null
  }

  type GetPrendaGroupByPayload<T extends PrendaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrendaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrendaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrendaGroupByOutputType[P]>
            : GetScalarType<T[P], PrendaGroupByOutputType[P]>
        }
      >
    >


  export type PrendaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imagen_url?: boolean
    categoria?: boolean
    color_principal?: boolean
    estado?: boolean
    fecha_creacion?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    outfits?: boolean | Prenda$outfitsArgs<ExtArgs>
    _count?: boolean | PrendaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prenda"]>

  export type PrendaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imagen_url?: boolean
    categoria?: boolean
    color_principal?: boolean
    estado?: boolean
    fecha_creacion?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prenda"]>

  export type PrendaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imagen_url?: boolean
    categoria?: boolean
    color_principal?: boolean
    estado?: boolean
    fecha_creacion?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prenda"]>

  export type PrendaSelectScalar = {
    id?: boolean
    imagen_url?: boolean
    categoria?: boolean
    color_principal?: boolean
    estado?: boolean
    fecha_creacion?: boolean
    usuarioId?: boolean
  }

  export type PrendaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imagen_url" | "categoria" | "color_principal" | "estado" | "fecha_creacion" | "usuarioId", ExtArgs["result"]["prenda"]>
  export type PrendaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    outfits?: boolean | Prenda$outfitsArgs<ExtArgs>
    _count?: boolean | PrendaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PrendaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type PrendaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $PrendaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prenda"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      outfits: Prisma.$OutfitPrendaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      imagen_url: string | null
      categoria: string | null
      color_principal: string | null
      estado: string
      fecha_creacion: Date
      usuarioId: number
    }, ExtArgs["result"]["prenda"]>
    composites: {}
  }

  type PrendaGetPayload<S extends boolean | null | undefined | PrendaDefaultArgs> = $Result.GetResult<Prisma.$PrendaPayload, S>

  type PrendaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrendaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrendaCountAggregateInputType | true
    }

  export interface PrendaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prenda'], meta: { name: 'Prenda' } }
    /**
     * Find zero or one Prenda that matches the filter.
     * @param {PrendaFindUniqueArgs} args - Arguments to find a Prenda
     * @example
     * // Get one Prenda
     * const prenda = await prisma.prenda.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrendaFindUniqueArgs>(args: SelectSubset<T, PrendaFindUniqueArgs<ExtArgs>>): Prisma__PrendaClient<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prenda that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrendaFindUniqueOrThrowArgs} args - Arguments to find a Prenda
     * @example
     * // Get one Prenda
     * const prenda = await prisma.prenda.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrendaFindUniqueOrThrowArgs>(args: SelectSubset<T, PrendaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrendaClient<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prenda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrendaFindFirstArgs} args - Arguments to find a Prenda
     * @example
     * // Get one Prenda
     * const prenda = await prisma.prenda.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrendaFindFirstArgs>(args?: SelectSubset<T, PrendaFindFirstArgs<ExtArgs>>): Prisma__PrendaClient<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prenda that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrendaFindFirstOrThrowArgs} args - Arguments to find a Prenda
     * @example
     * // Get one Prenda
     * const prenda = await prisma.prenda.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrendaFindFirstOrThrowArgs>(args?: SelectSubset<T, PrendaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrendaClient<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prendas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrendaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prendas
     * const prendas = await prisma.prenda.findMany()
     * 
     * // Get first 10 Prendas
     * const prendas = await prisma.prenda.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prendaWithIdOnly = await prisma.prenda.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrendaFindManyArgs>(args?: SelectSubset<T, PrendaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prenda.
     * @param {PrendaCreateArgs} args - Arguments to create a Prenda.
     * @example
     * // Create one Prenda
     * const Prenda = await prisma.prenda.create({
     *   data: {
     *     // ... data to create a Prenda
     *   }
     * })
     * 
     */
    create<T extends PrendaCreateArgs>(args: SelectSubset<T, PrendaCreateArgs<ExtArgs>>): Prisma__PrendaClient<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prendas.
     * @param {PrendaCreateManyArgs} args - Arguments to create many Prendas.
     * @example
     * // Create many Prendas
     * const prenda = await prisma.prenda.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrendaCreateManyArgs>(args?: SelectSubset<T, PrendaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prendas and returns the data saved in the database.
     * @param {PrendaCreateManyAndReturnArgs} args - Arguments to create many Prendas.
     * @example
     * // Create many Prendas
     * const prenda = await prisma.prenda.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prendas and only return the `id`
     * const prendaWithIdOnly = await prisma.prenda.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrendaCreateManyAndReturnArgs>(args?: SelectSubset<T, PrendaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Prenda.
     * @param {PrendaDeleteArgs} args - Arguments to delete one Prenda.
     * @example
     * // Delete one Prenda
     * const Prenda = await prisma.prenda.delete({
     *   where: {
     *     // ... filter to delete one Prenda
     *   }
     * })
     * 
     */
    delete<T extends PrendaDeleteArgs>(args: SelectSubset<T, PrendaDeleteArgs<ExtArgs>>): Prisma__PrendaClient<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prenda.
     * @param {PrendaUpdateArgs} args - Arguments to update one Prenda.
     * @example
     * // Update one Prenda
     * const prenda = await prisma.prenda.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrendaUpdateArgs>(args: SelectSubset<T, PrendaUpdateArgs<ExtArgs>>): Prisma__PrendaClient<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prendas.
     * @param {PrendaDeleteManyArgs} args - Arguments to filter Prendas to delete.
     * @example
     * // Delete a few Prendas
     * const { count } = await prisma.prenda.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrendaDeleteManyArgs>(args?: SelectSubset<T, PrendaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrendaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prendas
     * const prenda = await prisma.prenda.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrendaUpdateManyArgs>(args: SelectSubset<T, PrendaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prendas and returns the data updated in the database.
     * @param {PrendaUpdateManyAndReturnArgs} args - Arguments to update many Prendas.
     * @example
     * // Update many Prendas
     * const prenda = await prisma.prenda.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prendas and only return the `id`
     * const prendaWithIdOnly = await prisma.prenda.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PrendaUpdateManyAndReturnArgs>(args: SelectSubset<T, PrendaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Prenda.
     * @param {PrendaUpsertArgs} args - Arguments to update or create a Prenda.
     * @example
     * // Update or create a Prenda
     * const prenda = await prisma.prenda.upsert({
     *   create: {
     *     // ... data to create a Prenda
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prenda we want to update
     *   }
     * })
     */
    upsert<T extends PrendaUpsertArgs>(args: SelectSubset<T, PrendaUpsertArgs<ExtArgs>>): Prisma__PrendaClient<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrendaCountArgs} args - Arguments to filter Prendas to count.
     * @example
     * // Count the number of Prendas
     * const count = await prisma.prenda.count({
     *   where: {
     *     // ... the filter for the Prendas we want to count
     *   }
     * })
    **/
    count<T extends PrendaCountArgs>(
      args?: Subset<T, PrendaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrendaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prenda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrendaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrendaAggregateArgs>(args: Subset<T, PrendaAggregateArgs>): Prisma.PrismaPromise<GetPrendaAggregateType<T>>

    /**
     * Group by Prenda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrendaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrendaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrendaGroupByArgs['orderBy'] }
        : { orderBy?: PrendaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrendaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrendaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prenda model
   */
  readonly fields: PrendaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prenda.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrendaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    outfits<T extends Prenda$outfitsArgs<ExtArgs> = {}>(args?: Subset<T, Prenda$outfitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prenda model
   */
  interface PrendaFieldRefs {
    readonly id: FieldRef<"Prenda", 'Int'>
    readonly imagen_url: FieldRef<"Prenda", 'String'>
    readonly categoria: FieldRef<"Prenda", 'String'>
    readonly color_principal: FieldRef<"Prenda", 'String'>
    readonly estado: FieldRef<"Prenda", 'String'>
    readonly fecha_creacion: FieldRef<"Prenda", 'DateTime'>
    readonly usuarioId: FieldRef<"Prenda", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Prenda findUnique
   */
  export type PrendaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
    /**
     * Filter, which Prenda to fetch.
     */
    where: PrendaWhereUniqueInput
  }

  /**
   * Prenda findUniqueOrThrow
   */
  export type PrendaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
    /**
     * Filter, which Prenda to fetch.
     */
    where: PrendaWhereUniqueInput
  }

  /**
   * Prenda findFirst
   */
  export type PrendaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
    /**
     * Filter, which Prenda to fetch.
     */
    where?: PrendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prendas to fetch.
     */
    orderBy?: PrendaOrderByWithRelationInput | PrendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prendas.
     */
    cursor?: PrendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prendas.
     */
    distinct?: PrendaScalarFieldEnum | PrendaScalarFieldEnum[]
  }

  /**
   * Prenda findFirstOrThrow
   */
  export type PrendaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
    /**
     * Filter, which Prenda to fetch.
     */
    where?: PrendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prendas to fetch.
     */
    orderBy?: PrendaOrderByWithRelationInput | PrendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prendas.
     */
    cursor?: PrendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prendas.
     */
    distinct?: PrendaScalarFieldEnum | PrendaScalarFieldEnum[]
  }

  /**
   * Prenda findMany
   */
  export type PrendaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
    /**
     * Filter, which Prendas to fetch.
     */
    where?: PrendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prendas to fetch.
     */
    orderBy?: PrendaOrderByWithRelationInput | PrendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prendas.
     */
    cursor?: PrendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prendas.
     */
    skip?: number
    distinct?: PrendaScalarFieldEnum | PrendaScalarFieldEnum[]
  }

  /**
   * Prenda create
   */
  export type PrendaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
    /**
     * The data needed to create a Prenda.
     */
    data: XOR<PrendaCreateInput, PrendaUncheckedCreateInput>
  }

  /**
   * Prenda createMany
   */
  export type PrendaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prendas.
     */
    data: PrendaCreateManyInput | PrendaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prenda createManyAndReturn
   */
  export type PrendaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * The data used to create many Prendas.
     */
    data: PrendaCreateManyInput | PrendaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prenda update
   */
  export type PrendaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
    /**
     * The data needed to update a Prenda.
     */
    data: XOR<PrendaUpdateInput, PrendaUncheckedUpdateInput>
    /**
     * Choose, which Prenda to update.
     */
    where: PrendaWhereUniqueInput
  }

  /**
   * Prenda updateMany
   */
  export type PrendaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prendas.
     */
    data: XOR<PrendaUpdateManyMutationInput, PrendaUncheckedUpdateManyInput>
    /**
     * Filter which Prendas to update
     */
    where?: PrendaWhereInput
    /**
     * Limit how many Prendas to update.
     */
    limit?: number
  }

  /**
   * Prenda updateManyAndReturn
   */
  export type PrendaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * The data used to update Prendas.
     */
    data: XOR<PrendaUpdateManyMutationInput, PrendaUncheckedUpdateManyInput>
    /**
     * Filter which Prendas to update
     */
    where?: PrendaWhereInput
    /**
     * Limit how many Prendas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prenda upsert
   */
  export type PrendaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
    /**
     * The filter to search for the Prenda to update in case it exists.
     */
    where: PrendaWhereUniqueInput
    /**
     * In case the Prenda found by the `where` argument doesn't exist, create a new Prenda with this data.
     */
    create: XOR<PrendaCreateInput, PrendaUncheckedCreateInput>
    /**
     * In case the Prenda was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrendaUpdateInput, PrendaUncheckedUpdateInput>
  }

  /**
   * Prenda delete
   */
  export type PrendaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
    /**
     * Filter which Prenda to delete.
     */
    where: PrendaWhereUniqueInput
  }

  /**
   * Prenda deleteMany
   */
  export type PrendaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prendas to delete
     */
    where?: PrendaWhereInput
    /**
     * Limit how many Prendas to delete.
     */
    limit?: number
  }

  /**
   * Prenda.outfits
   */
  export type Prenda$outfitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    where?: OutfitPrendaWhereInput
    orderBy?: OutfitPrendaOrderByWithRelationInput | OutfitPrendaOrderByWithRelationInput[]
    cursor?: OutfitPrendaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitPrendaScalarFieldEnum | OutfitPrendaScalarFieldEnum[]
  }

  /**
   * Prenda without action
   */
  export type PrendaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenda
     */
    select?: PrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prenda
     */
    omit?: PrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrendaInclude<ExtArgs> | null
  }


  /**
   * Model Outfit
   */

  export type AggregateOutfit = {
    _count: OutfitCountAggregateOutputType | null
    _avg: OutfitAvgAggregateOutputType | null
    _sum: OutfitSumAggregateOutputType | null
    _min: OutfitMinAggregateOutputType | null
    _max: OutfitMaxAggregateOutputType | null
  }

  export type OutfitAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
  }

  export type OutfitSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
  }

  export type OutfitMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    fecha_creacion: Date | null
    usuarioId: number | null
  }

  export type OutfitMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    fecha_creacion: Date | null
    usuarioId: number | null
  }

  export type OutfitCountAggregateOutputType = {
    id: number
    nombre: number
    fecha_creacion: number
    usuarioId: number
    _all: number
  }


  export type OutfitAvgAggregateInputType = {
    id?: true
    usuarioId?: true
  }

  export type OutfitSumAggregateInputType = {
    id?: true
    usuarioId?: true
  }

  export type OutfitMinAggregateInputType = {
    id?: true
    nombre?: true
    fecha_creacion?: true
    usuarioId?: true
  }

  export type OutfitMaxAggregateInputType = {
    id?: true
    nombre?: true
    fecha_creacion?: true
    usuarioId?: true
  }

  export type OutfitCountAggregateInputType = {
    id?: true
    nombre?: true
    fecha_creacion?: true
    usuarioId?: true
    _all?: true
  }

  export type OutfitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outfit to aggregate.
     */
    where?: OutfitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outfits to fetch.
     */
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutfitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outfits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outfits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Outfits
    **/
    _count?: true | OutfitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutfitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutfitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutfitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutfitMaxAggregateInputType
  }

  export type GetOutfitAggregateType<T extends OutfitAggregateArgs> = {
        [P in keyof T & keyof AggregateOutfit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutfit[P]>
      : GetScalarType<T[P], AggregateOutfit[P]>
  }




  export type OutfitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitWhereInput
    orderBy?: OutfitOrderByWithAggregationInput | OutfitOrderByWithAggregationInput[]
    by: OutfitScalarFieldEnum[] | OutfitScalarFieldEnum
    having?: OutfitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutfitCountAggregateInputType | true
    _avg?: OutfitAvgAggregateInputType
    _sum?: OutfitSumAggregateInputType
    _min?: OutfitMinAggregateInputType
    _max?: OutfitMaxAggregateInputType
  }

  export type OutfitGroupByOutputType = {
    id: number
    nombre: string
    fecha_creacion: Date
    usuarioId: number
    _count: OutfitCountAggregateOutputType | null
    _avg: OutfitAvgAggregateOutputType | null
    _sum: OutfitSumAggregateOutputType | null
    _min: OutfitMinAggregateOutputType | null
    _max: OutfitMaxAggregateOutputType | null
  }

  type GetOutfitGroupByPayload<T extends OutfitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutfitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutfitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutfitGroupByOutputType[P]>
            : GetScalarType<T[P], OutfitGroupByOutputType[P]>
        }
      >
    >


  export type OutfitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    fecha_creacion?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    prendas?: boolean | Outfit$prendasArgs<ExtArgs>
    calendarios?: boolean | Outfit$calendariosArgs<ExtArgs>
    _count?: boolean | OutfitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outfit"]>

  export type OutfitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    fecha_creacion?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outfit"]>

  export type OutfitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    fecha_creacion?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outfit"]>

  export type OutfitSelectScalar = {
    id?: boolean
    nombre?: boolean
    fecha_creacion?: boolean
    usuarioId?: boolean
  }

  export type OutfitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "fecha_creacion" | "usuarioId", ExtArgs["result"]["outfit"]>
  export type OutfitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    prendas?: boolean | Outfit$prendasArgs<ExtArgs>
    calendarios?: boolean | Outfit$calendariosArgs<ExtArgs>
    _count?: boolean | OutfitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OutfitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type OutfitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $OutfitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Outfit"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      prendas: Prisma.$OutfitPrendaPayload<ExtArgs>[]
      calendarios: Prisma.$CalendarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      fecha_creacion: Date
      usuarioId: number
    }, ExtArgs["result"]["outfit"]>
    composites: {}
  }

  type OutfitGetPayload<S extends boolean | null | undefined | OutfitDefaultArgs> = $Result.GetResult<Prisma.$OutfitPayload, S>

  type OutfitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutfitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutfitCountAggregateInputType | true
    }

  export interface OutfitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Outfit'], meta: { name: 'Outfit' } }
    /**
     * Find zero or one Outfit that matches the filter.
     * @param {OutfitFindUniqueArgs} args - Arguments to find a Outfit
     * @example
     * // Get one Outfit
     * const outfit = await prisma.outfit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutfitFindUniqueArgs>(args: SelectSubset<T, OutfitFindUniqueArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Outfit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutfitFindUniqueOrThrowArgs} args - Arguments to find a Outfit
     * @example
     * // Get one Outfit
     * const outfit = await prisma.outfit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutfitFindUniqueOrThrowArgs>(args: SelectSubset<T, OutfitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outfit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitFindFirstArgs} args - Arguments to find a Outfit
     * @example
     * // Get one Outfit
     * const outfit = await prisma.outfit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutfitFindFirstArgs>(args?: SelectSubset<T, OutfitFindFirstArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outfit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitFindFirstOrThrowArgs} args - Arguments to find a Outfit
     * @example
     * // Get one Outfit
     * const outfit = await prisma.outfit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutfitFindFirstOrThrowArgs>(args?: SelectSubset<T, OutfitFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Outfits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Outfits
     * const outfits = await prisma.outfit.findMany()
     * 
     * // Get first 10 Outfits
     * const outfits = await prisma.outfit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outfitWithIdOnly = await prisma.outfit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutfitFindManyArgs>(args?: SelectSubset<T, OutfitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Outfit.
     * @param {OutfitCreateArgs} args - Arguments to create a Outfit.
     * @example
     * // Create one Outfit
     * const Outfit = await prisma.outfit.create({
     *   data: {
     *     // ... data to create a Outfit
     *   }
     * })
     * 
     */
    create<T extends OutfitCreateArgs>(args: SelectSubset<T, OutfitCreateArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Outfits.
     * @param {OutfitCreateManyArgs} args - Arguments to create many Outfits.
     * @example
     * // Create many Outfits
     * const outfit = await prisma.outfit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutfitCreateManyArgs>(args?: SelectSubset<T, OutfitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Outfits and returns the data saved in the database.
     * @param {OutfitCreateManyAndReturnArgs} args - Arguments to create many Outfits.
     * @example
     * // Create many Outfits
     * const outfit = await prisma.outfit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Outfits and only return the `id`
     * const outfitWithIdOnly = await prisma.outfit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutfitCreateManyAndReturnArgs>(args?: SelectSubset<T, OutfitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Outfit.
     * @param {OutfitDeleteArgs} args - Arguments to delete one Outfit.
     * @example
     * // Delete one Outfit
     * const Outfit = await prisma.outfit.delete({
     *   where: {
     *     // ... filter to delete one Outfit
     *   }
     * })
     * 
     */
    delete<T extends OutfitDeleteArgs>(args: SelectSubset<T, OutfitDeleteArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Outfit.
     * @param {OutfitUpdateArgs} args - Arguments to update one Outfit.
     * @example
     * // Update one Outfit
     * const outfit = await prisma.outfit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutfitUpdateArgs>(args: SelectSubset<T, OutfitUpdateArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Outfits.
     * @param {OutfitDeleteManyArgs} args - Arguments to filter Outfits to delete.
     * @example
     * // Delete a few Outfits
     * const { count } = await prisma.outfit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutfitDeleteManyArgs>(args?: SelectSubset<T, OutfitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outfits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Outfits
     * const outfit = await prisma.outfit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutfitUpdateManyArgs>(args: SelectSubset<T, OutfitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outfits and returns the data updated in the database.
     * @param {OutfitUpdateManyAndReturnArgs} args - Arguments to update many Outfits.
     * @example
     * // Update many Outfits
     * const outfit = await prisma.outfit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Outfits and only return the `id`
     * const outfitWithIdOnly = await prisma.outfit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OutfitUpdateManyAndReturnArgs>(args: SelectSubset<T, OutfitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Outfit.
     * @param {OutfitUpsertArgs} args - Arguments to update or create a Outfit.
     * @example
     * // Update or create a Outfit
     * const outfit = await prisma.outfit.upsert({
     *   create: {
     *     // ... data to create a Outfit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Outfit we want to update
     *   }
     * })
     */
    upsert<T extends OutfitUpsertArgs>(args: SelectSubset<T, OutfitUpsertArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Outfits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitCountArgs} args - Arguments to filter Outfits to count.
     * @example
     * // Count the number of Outfits
     * const count = await prisma.outfit.count({
     *   where: {
     *     // ... the filter for the Outfits we want to count
     *   }
     * })
    **/
    count<T extends OutfitCountArgs>(
      args?: Subset<T, OutfitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutfitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Outfit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutfitAggregateArgs>(args: Subset<T, OutfitAggregateArgs>): Prisma.PrismaPromise<GetOutfitAggregateType<T>>

    /**
     * Group by Outfit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutfitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutfitGroupByArgs['orderBy'] }
        : { orderBy?: OutfitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutfitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutfitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Outfit model
   */
  readonly fields: OutfitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Outfit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutfitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    prendas<T extends Outfit$prendasArgs<ExtArgs> = {}>(args?: Subset<T, Outfit$prendasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    calendarios<T extends Outfit$calendariosArgs<ExtArgs> = {}>(args?: Subset<T, Outfit$calendariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Outfit model
   */
  interface OutfitFieldRefs {
    readonly id: FieldRef<"Outfit", 'Int'>
    readonly nombre: FieldRef<"Outfit", 'String'>
    readonly fecha_creacion: FieldRef<"Outfit", 'DateTime'>
    readonly usuarioId: FieldRef<"Outfit", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Outfit findUnique
   */
  export type OutfitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter, which Outfit to fetch.
     */
    where: OutfitWhereUniqueInput
  }

  /**
   * Outfit findUniqueOrThrow
   */
  export type OutfitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter, which Outfit to fetch.
     */
    where: OutfitWhereUniqueInput
  }

  /**
   * Outfit findFirst
   */
  export type OutfitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter, which Outfit to fetch.
     */
    where?: OutfitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outfits to fetch.
     */
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outfits.
     */
    cursor?: OutfitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outfits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outfits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outfits.
     */
    distinct?: OutfitScalarFieldEnum | OutfitScalarFieldEnum[]
  }

  /**
   * Outfit findFirstOrThrow
   */
  export type OutfitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter, which Outfit to fetch.
     */
    where?: OutfitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outfits to fetch.
     */
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outfits.
     */
    cursor?: OutfitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outfits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outfits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outfits.
     */
    distinct?: OutfitScalarFieldEnum | OutfitScalarFieldEnum[]
  }

  /**
   * Outfit findMany
   */
  export type OutfitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter, which Outfits to fetch.
     */
    where?: OutfitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outfits to fetch.
     */
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Outfits.
     */
    cursor?: OutfitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outfits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outfits.
     */
    skip?: number
    distinct?: OutfitScalarFieldEnum | OutfitScalarFieldEnum[]
  }

  /**
   * Outfit create
   */
  export type OutfitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * The data needed to create a Outfit.
     */
    data: XOR<OutfitCreateInput, OutfitUncheckedCreateInput>
  }

  /**
   * Outfit createMany
   */
  export type OutfitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Outfits.
     */
    data: OutfitCreateManyInput | OutfitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Outfit createManyAndReturn
   */
  export type OutfitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * The data used to create many Outfits.
     */
    data: OutfitCreateManyInput | OutfitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Outfit update
   */
  export type OutfitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * The data needed to update a Outfit.
     */
    data: XOR<OutfitUpdateInput, OutfitUncheckedUpdateInput>
    /**
     * Choose, which Outfit to update.
     */
    where: OutfitWhereUniqueInput
  }

  /**
   * Outfit updateMany
   */
  export type OutfitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Outfits.
     */
    data: XOR<OutfitUpdateManyMutationInput, OutfitUncheckedUpdateManyInput>
    /**
     * Filter which Outfits to update
     */
    where?: OutfitWhereInput
    /**
     * Limit how many Outfits to update.
     */
    limit?: number
  }

  /**
   * Outfit updateManyAndReturn
   */
  export type OutfitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * The data used to update Outfits.
     */
    data: XOR<OutfitUpdateManyMutationInput, OutfitUncheckedUpdateManyInput>
    /**
     * Filter which Outfits to update
     */
    where?: OutfitWhereInput
    /**
     * Limit how many Outfits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Outfit upsert
   */
  export type OutfitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * The filter to search for the Outfit to update in case it exists.
     */
    where: OutfitWhereUniqueInput
    /**
     * In case the Outfit found by the `where` argument doesn't exist, create a new Outfit with this data.
     */
    create: XOR<OutfitCreateInput, OutfitUncheckedCreateInput>
    /**
     * In case the Outfit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutfitUpdateInput, OutfitUncheckedUpdateInput>
  }

  /**
   * Outfit delete
   */
  export type OutfitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter which Outfit to delete.
     */
    where: OutfitWhereUniqueInput
  }

  /**
   * Outfit deleteMany
   */
  export type OutfitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outfits to delete
     */
    where?: OutfitWhereInput
    /**
     * Limit how many Outfits to delete.
     */
    limit?: number
  }

  /**
   * Outfit.prendas
   */
  export type Outfit$prendasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    where?: OutfitPrendaWhereInput
    orderBy?: OutfitPrendaOrderByWithRelationInput | OutfitPrendaOrderByWithRelationInput[]
    cursor?: OutfitPrendaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitPrendaScalarFieldEnum | OutfitPrendaScalarFieldEnum[]
  }

  /**
   * Outfit.calendarios
   */
  export type Outfit$calendariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    where?: CalendarioWhereInput
    orderBy?: CalendarioOrderByWithRelationInput | CalendarioOrderByWithRelationInput[]
    cursor?: CalendarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CalendarioScalarFieldEnum | CalendarioScalarFieldEnum[]
  }

  /**
   * Outfit without action
   */
  export type OutfitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
  }


  /**
   * Model OutfitPrenda
   */

  export type AggregateOutfitPrenda = {
    _count: OutfitPrendaCountAggregateOutputType | null
    _avg: OutfitPrendaAvgAggregateOutputType | null
    _sum: OutfitPrendaSumAggregateOutputType | null
    _min: OutfitPrendaMinAggregateOutputType | null
    _max: OutfitPrendaMaxAggregateOutputType | null
  }

  export type OutfitPrendaAvgAggregateOutputType = {
    id: number | null
    outfitId: number | null
    prendaId: number | null
  }

  export type OutfitPrendaSumAggregateOutputType = {
    id: number | null
    outfitId: number | null
    prendaId: number | null
  }

  export type OutfitPrendaMinAggregateOutputType = {
    id: number | null
    outfitId: number | null
    prendaId: number | null
  }

  export type OutfitPrendaMaxAggregateOutputType = {
    id: number | null
    outfitId: number | null
    prendaId: number | null
  }

  export type OutfitPrendaCountAggregateOutputType = {
    id: number
    outfitId: number
    prendaId: number
    _all: number
  }


  export type OutfitPrendaAvgAggregateInputType = {
    id?: true
    outfitId?: true
    prendaId?: true
  }

  export type OutfitPrendaSumAggregateInputType = {
    id?: true
    outfitId?: true
    prendaId?: true
  }

  export type OutfitPrendaMinAggregateInputType = {
    id?: true
    outfitId?: true
    prendaId?: true
  }

  export type OutfitPrendaMaxAggregateInputType = {
    id?: true
    outfitId?: true
    prendaId?: true
  }

  export type OutfitPrendaCountAggregateInputType = {
    id?: true
    outfitId?: true
    prendaId?: true
    _all?: true
  }

  export type OutfitPrendaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutfitPrenda to aggregate.
     */
    where?: OutfitPrendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitPrendas to fetch.
     */
    orderBy?: OutfitPrendaOrderByWithRelationInput | OutfitPrendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutfitPrendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitPrendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitPrendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutfitPrendas
    **/
    _count?: true | OutfitPrendaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutfitPrendaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutfitPrendaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutfitPrendaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutfitPrendaMaxAggregateInputType
  }

  export type GetOutfitPrendaAggregateType<T extends OutfitPrendaAggregateArgs> = {
        [P in keyof T & keyof AggregateOutfitPrenda]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutfitPrenda[P]>
      : GetScalarType<T[P], AggregateOutfitPrenda[P]>
  }




  export type OutfitPrendaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitPrendaWhereInput
    orderBy?: OutfitPrendaOrderByWithAggregationInput | OutfitPrendaOrderByWithAggregationInput[]
    by: OutfitPrendaScalarFieldEnum[] | OutfitPrendaScalarFieldEnum
    having?: OutfitPrendaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutfitPrendaCountAggregateInputType | true
    _avg?: OutfitPrendaAvgAggregateInputType
    _sum?: OutfitPrendaSumAggregateInputType
    _min?: OutfitPrendaMinAggregateInputType
    _max?: OutfitPrendaMaxAggregateInputType
  }

  export type OutfitPrendaGroupByOutputType = {
    id: number
    outfitId: number
    prendaId: number
    _count: OutfitPrendaCountAggregateOutputType | null
    _avg: OutfitPrendaAvgAggregateOutputType | null
    _sum: OutfitPrendaSumAggregateOutputType | null
    _min: OutfitPrendaMinAggregateOutputType | null
    _max: OutfitPrendaMaxAggregateOutputType | null
  }

  type GetOutfitPrendaGroupByPayload<T extends OutfitPrendaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutfitPrendaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutfitPrendaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutfitPrendaGroupByOutputType[P]>
            : GetScalarType<T[P], OutfitPrendaGroupByOutputType[P]>
        }
      >
    >


  export type OutfitPrendaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outfitId?: boolean
    prendaId?: boolean
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    prenda?: boolean | PrendaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outfitPrenda"]>

  export type OutfitPrendaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outfitId?: boolean
    prendaId?: boolean
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    prenda?: boolean | PrendaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outfitPrenda"]>

  export type OutfitPrendaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outfitId?: boolean
    prendaId?: boolean
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    prenda?: boolean | PrendaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outfitPrenda"]>

  export type OutfitPrendaSelectScalar = {
    id?: boolean
    outfitId?: boolean
    prendaId?: boolean
  }

  export type OutfitPrendaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "outfitId" | "prendaId", ExtArgs["result"]["outfitPrenda"]>
  export type OutfitPrendaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    prenda?: boolean | PrendaDefaultArgs<ExtArgs>
  }
  export type OutfitPrendaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    prenda?: boolean | PrendaDefaultArgs<ExtArgs>
  }
  export type OutfitPrendaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    prenda?: boolean | PrendaDefaultArgs<ExtArgs>
  }

  export type $OutfitPrendaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutfitPrenda"
    objects: {
      outfit: Prisma.$OutfitPayload<ExtArgs>
      prenda: Prisma.$PrendaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      outfitId: number
      prendaId: number
    }, ExtArgs["result"]["outfitPrenda"]>
    composites: {}
  }

  type OutfitPrendaGetPayload<S extends boolean | null | undefined | OutfitPrendaDefaultArgs> = $Result.GetResult<Prisma.$OutfitPrendaPayload, S>

  type OutfitPrendaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutfitPrendaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutfitPrendaCountAggregateInputType | true
    }

  export interface OutfitPrendaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OutfitPrenda'], meta: { name: 'OutfitPrenda' } }
    /**
     * Find zero or one OutfitPrenda that matches the filter.
     * @param {OutfitPrendaFindUniqueArgs} args - Arguments to find a OutfitPrenda
     * @example
     * // Get one OutfitPrenda
     * const outfitPrenda = await prisma.outfitPrenda.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutfitPrendaFindUniqueArgs>(args: SelectSubset<T, OutfitPrendaFindUniqueArgs<ExtArgs>>): Prisma__OutfitPrendaClient<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OutfitPrenda that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutfitPrendaFindUniqueOrThrowArgs} args - Arguments to find a OutfitPrenda
     * @example
     * // Get one OutfitPrenda
     * const outfitPrenda = await prisma.outfitPrenda.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutfitPrendaFindUniqueOrThrowArgs>(args: SelectSubset<T, OutfitPrendaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutfitPrendaClient<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutfitPrenda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitPrendaFindFirstArgs} args - Arguments to find a OutfitPrenda
     * @example
     * // Get one OutfitPrenda
     * const outfitPrenda = await prisma.outfitPrenda.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutfitPrendaFindFirstArgs>(args?: SelectSubset<T, OutfitPrendaFindFirstArgs<ExtArgs>>): Prisma__OutfitPrendaClient<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutfitPrenda that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitPrendaFindFirstOrThrowArgs} args - Arguments to find a OutfitPrenda
     * @example
     * // Get one OutfitPrenda
     * const outfitPrenda = await prisma.outfitPrenda.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutfitPrendaFindFirstOrThrowArgs>(args?: SelectSubset<T, OutfitPrendaFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutfitPrendaClient<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OutfitPrendas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitPrendaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutfitPrendas
     * const outfitPrendas = await prisma.outfitPrenda.findMany()
     * 
     * // Get first 10 OutfitPrendas
     * const outfitPrendas = await prisma.outfitPrenda.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outfitPrendaWithIdOnly = await prisma.outfitPrenda.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutfitPrendaFindManyArgs>(args?: SelectSubset<T, OutfitPrendaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OutfitPrenda.
     * @param {OutfitPrendaCreateArgs} args - Arguments to create a OutfitPrenda.
     * @example
     * // Create one OutfitPrenda
     * const OutfitPrenda = await prisma.outfitPrenda.create({
     *   data: {
     *     // ... data to create a OutfitPrenda
     *   }
     * })
     * 
     */
    create<T extends OutfitPrendaCreateArgs>(args: SelectSubset<T, OutfitPrendaCreateArgs<ExtArgs>>): Prisma__OutfitPrendaClient<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OutfitPrendas.
     * @param {OutfitPrendaCreateManyArgs} args - Arguments to create many OutfitPrendas.
     * @example
     * // Create many OutfitPrendas
     * const outfitPrenda = await prisma.outfitPrenda.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutfitPrendaCreateManyArgs>(args?: SelectSubset<T, OutfitPrendaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OutfitPrendas and returns the data saved in the database.
     * @param {OutfitPrendaCreateManyAndReturnArgs} args - Arguments to create many OutfitPrendas.
     * @example
     * // Create many OutfitPrendas
     * const outfitPrenda = await prisma.outfitPrenda.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OutfitPrendas and only return the `id`
     * const outfitPrendaWithIdOnly = await prisma.outfitPrenda.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutfitPrendaCreateManyAndReturnArgs>(args?: SelectSubset<T, OutfitPrendaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OutfitPrenda.
     * @param {OutfitPrendaDeleteArgs} args - Arguments to delete one OutfitPrenda.
     * @example
     * // Delete one OutfitPrenda
     * const OutfitPrenda = await prisma.outfitPrenda.delete({
     *   where: {
     *     // ... filter to delete one OutfitPrenda
     *   }
     * })
     * 
     */
    delete<T extends OutfitPrendaDeleteArgs>(args: SelectSubset<T, OutfitPrendaDeleteArgs<ExtArgs>>): Prisma__OutfitPrendaClient<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OutfitPrenda.
     * @param {OutfitPrendaUpdateArgs} args - Arguments to update one OutfitPrenda.
     * @example
     * // Update one OutfitPrenda
     * const outfitPrenda = await prisma.outfitPrenda.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutfitPrendaUpdateArgs>(args: SelectSubset<T, OutfitPrendaUpdateArgs<ExtArgs>>): Prisma__OutfitPrendaClient<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OutfitPrendas.
     * @param {OutfitPrendaDeleteManyArgs} args - Arguments to filter OutfitPrendas to delete.
     * @example
     * // Delete a few OutfitPrendas
     * const { count } = await prisma.outfitPrenda.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutfitPrendaDeleteManyArgs>(args?: SelectSubset<T, OutfitPrendaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutfitPrendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitPrendaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutfitPrendas
     * const outfitPrenda = await prisma.outfitPrenda.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutfitPrendaUpdateManyArgs>(args: SelectSubset<T, OutfitPrendaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutfitPrendas and returns the data updated in the database.
     * @param {OutfitPrendaUpdateManyAndReturnArgs} args - Arguments to update many OutfitPrendas.
     * @example
     * // Update many OutfitPrendas
     * const outfitPrenda = await prisma.outfitPrenda.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OutfitPrendas and only return the `id`
     * const outfitPrendaWithIdOnly = await prisma.outfitPrenda.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OutfitPrendaUpdateManyAndReturnArgs>(args: SelectSubset<T, OutfitPrendaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OutfitPrenda.
     * @param {OutfitPrendaUpsertArgs} args - Arguments to update or create a OutfitPrenda.
     * @example
     * // Update or create a OutfitPrenda
     * const outfitPrenda = await prisma.outfitPrenda.upsert({
     *   create: {
     *     // ... data to create a OutfitPrenda
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutfitPrenda we want to update
     *   }
     * })
     */
    upsert<T extends OutfitPrendaUpsertArgs>(args: SelectSubset<T, OutfitPrendaUpsertArgs<ExtArgs>>): Prisma__OutfitPrendaClient<$Result.GetResult<Prisma.$OutfitPrendaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OutfitPrendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitPrendaCountArgs} args - Arguments to filter OutfitPrendas to count.
     * @example
     * // Count the number of OutfitPrendas
     * const count = await prisma.outfitPrenda.count({
     *   where: {
     *     // ... the filter for the OutfitPrendas we want to count
     *   }
     * })
    **/
    count<T extends OutfitPrendaCountArgs>(
      args?: Subset<T, OutfitPrendaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutfitPrendaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutfitPrenda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitPrendaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutfitPrendaAggregateArgs>(args: Subset<T, OutfitPrendaAggregateArgs>): Prisma.PrismaPromise<GetOutfitPrendaAggregateType<T>>

    /**
     * Group by OutfitPrenda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitPrendaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutfitPrendaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutfitPrendaGroupByArgs['orderBy'] }
        : { orderBy?: OutfitPrendaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutfitPrendaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutfitPrendaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OutfitPrenda model
   */
  readonly fields: OutfitPrendaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutfitPrenda.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutfitPrendaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    outfit<T extends OutfitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OutfitDefaultArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    prenda<T extends PrendaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PrendaDefaultArgs<ExtArgs>>): Prisma__PrendaClient<$Result.GetResult<Prisma.$PrendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OutfitPrenda model
   */
  interface OutfitPrendaFieldRefs {
    readonly id: FieldRef<"OutfitPrenda", 'Int'>
    readonly outfitId: FieldRef<"OutfitPrenda", 'Int'>
    readonly prendaId: FieldRef<"OutfitPrenda", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * OutfitPrenda findUnique
   */
  export type OutfitPrendaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    /**
     * Filter, which OutfitPrenda to fetch.
     */
    where: OutfitPrendaWhereUniqueInput
  }

  /**
   * OutfitPrenda findUniqueOrThrow
   */
  export type OutfitPrendaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    /**
     * Filter, which OutfitPrenda to fetch.
     */
    where: OutfitPrendaWhereUniqueInput
  }

  /**
   * OutfitPrenda findFirst
   */
  export type OutfitPrendaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    /**
     * Filter, which OutfitPrenda to fetch.
     */
    where?: OutfitPrendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitPrendas to fetch.
     */
    orderBy?: OutfitPrendaOrderByWithRelationInput | OutfitPrendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutfitPrendas.
     */
    cursor?: OutfitPrendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitPrendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitPrendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutfitPrendas.
     */
    distinct?: OutfitPrendaScalarFieldEnum | OutfitPrendaScalarFieldEnum[]
  }

  /**
   * OutfitPrenda findFirstOrThrow
   */
  export type OutfitPrendaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    /**
     * Filter, which OutfitPrenda to fetch.
     */
    where?: OutfitPrendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitPrendas to fetch.
     */
    orderBy?: OutfitPrendaOrderByWithRelationInput | OutfitPrendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutfitPrendas.
     */
    cursor?: OutfitPrendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitPrendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitPrendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutfitPrendas.
     */
    distinct?: OutfitPrendaScalarFieldEnum | OutfitPrendaScalarFieldEnum[]
  }

  /**
   * OutfitPrenda findMany
   */
  export type OutfitPrendaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    /**
     * Filter, which OutfitPrendas to fetch.
     */
    where?: OutfitPrendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitPrendas to fetch.
     */
    orderBy?: OutfitPrendaOrderByWithRelationInput | OutfitPrendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutfitPrendas.
     */
    cursor?: OutfitPrendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitPrendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitPrendas.
     */
    skip?: number
    distinct?: OutfitPrendaScalarFieldEnum | OutfitPrendaScalarFieldEnum[]
  }

  /**
   * OutfitPrenda create
   */
  export type OutfitPrendaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    /**
     * The data needed to create a OutfitPrenda.
     */
    data: XOR<OutfitPrendaCreateInput, OutfitPrendaUncheckedCreateInput>
  }

  /**
   * OutfitPrenda createMany
   */
  export type OutfitPrendaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OutfitPrendas.
     */
    data: OutfitPrendaCreateManyInput | OutfitPrendaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutfitPrenda createManyAndReturn
   */
  export type OutfitPrendaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * The data used to create many OutfitPrendas.
     */
    data: OutfitPrendaCreateManyInput | OutfitPrendaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OutfitPrenda update
   */
  export type OutfitPrendaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    /**
     * The data needed to update a OutfitPrenda.
     */
    data: XOR<OutfitPrendaUpdateInput, OutfitPrendaUncheckedUpdateInput>
    /**
     * Choose, which OutfitPrenda to update.
     */
    where: OutfitPrendaWhereUniqueInput
  }

  /**
   * OutfitPrenda updateMany
   */
  export type OutfitPrendaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OutfitPrendas.
     */
    data: XOR<OutfitPrendaUpdateManyMutationInput, OutfitPrendaUncheckedUpdateManyInput>
    /**
     * Filter which OutfitPrendas to update
     */
    where?: OutfitPrendaWhereInput
    /**
     * Limit how many OutfitPrendas to update.
     */
    limit?: number
  }

  /**
   * OutfitPrenda updateManyAndReturn
   */
  export type OutfitPrendaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * The data used to update OutfitPrendas.
     */
    data: XOR<OutfitPrendaUpdateManyMutationInput, OutfitPrendaUncheckedUpdateManyInput>
    /**
     * Filter which OutfitPrendas to update
     */
    where?: OutfitPrendaWhereInput
    /**
     * Limit how many OutfitPrendas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OutfitPrenda upsert
   */
  export type OutfitPrendaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    /**
     * The filter to search for the OutfitPrenda to update in case it exists.
     */
    where: OutfitPrendaWhereUniqueInput
    /**
     * In case the OutfitPrenda found by the `where` argument doesn't exist, create a new OutfitPrenda with this data.
     */
    create: XOR<OutfitPrendaCreateInput, OutfitPrendaUncheckedCreateInput>
    /**
     * In case the OutfitPrenda was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutfitPrendaUpdateInput, OutfitPrendaUncheckedUpdateInput>
  }

  /**
   * OutfitPrenda delete
   */
  export type OutfitPrendaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
    /**
     * Filter which OutfitPrenda to delete.
     */
    where: OutfitPrendaWhereUniqueInput
  }

  /**
   * OutfitPrenda deleteMany
   */
  export type OutfitPrendaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutfitPrendas to delete
     */
    where?: OutfitPrendaWhereInput
    /**
     * Limit how many OutfitPrendas to delete.
     */
    limit?: number
  }

  /**
   * OutfitPrenda without action
   */
  export type OutfitPrendaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitPrenda
     */
    select?: OutfitPrendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitPrenda
     */
    omit?: OutfitPrendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitPrendaInclude<ExtArgs> | null
  }


  /**
   * Model Calendario
   */

  export type AggregateCalendario = {
    _count: CalendarioCountAggregateOutputType | null
    _avg: CalendarioAvgAggregateOutputType | null
    _sum: CalendarioSumAggregateOutputType | null
    _min: CalendarioMinAggregateOutputType | null
    _max: CalendarioMaxAggregateOutputType | null
  }

  export type CalendarioAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    outfitId: number | null
  }

  export type CalendarioSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    outfitId: number | null
  }

  export type CalendarioMinAggregateOutputType = {
    id: number | null
    fecha: Date | null
    ocasion: string | null
    usuarioId: number | null
    outfitId: number | null
  }

  export type CalendarioMaxAggregateOutputType = {
    id: number | null
    fecha: Date | null
    ocasion: string | null
    usuarioId: number | null
    outfitId: number | null
  }

  export type CalendarioCountAggregateOutputType = {
    id: number
    fecha: number
    ocasion: number
    usuarioId: number
    outfitId: number
    _all: number
  }


  export type CalendarioAvgAggregateInputType = {
    id?: true
    usuarioId?: true
    outfitId?: true
  }

  export type CalendarioSumAggregateInputType = {
    id?: true
    usuarioId?: true
    outfitId?: true
  }

  export type CalendarioMinAggregateInputType = {
    id?: true
    fecha?: true
    ocasion?: true
    usuarioId?: true
    outfitId?: true
  }

  export type CalendarioMaxAggregateInputType = {
    id?: true
    fecha?: true
    ocasion?: true
    usuarioId?: true
    outfitId?: true
  }

  export type CalendarioCountAggregateInputType = {
    id?: true
    fecha?: true
    ocasion?: true
    usuarioId?: true
    outfitId?: true
    _all?: true
  }

  export type CalendarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Calendario to aggregate.
     */
    where?: CalendarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calendarios to fetch.
     */
    orderBy?: CalendarioOrderByWithRelationInput | CalendarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CalendarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calendarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calendarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Calendarios
    **/
    _count?: true | CalendarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CalendarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CalendarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CalendarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CalendarioMaxAggregateInputType
  }

  export type GetCalendarioAggregateType<T extends CalendarioAggregateArgs> = {
        [P in keyof T & keyof AggregateCalendario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCalendario[P]>
      : GetScalarType<T[P], AggregateCalendario[P]>
  }




  export type CalendarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarioWhereInput
    orderBy?: CalendarioOrderByWithAggregationInput | CalendarioOrderByWithAggregationInput[]
    by: CalendarioScalarFieldEnum[] | CalendarioScalarFieldEnum
    having?: CalendarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CalendarioCountAggregateInputType | true
    _avg?: CalendarioAvgAggregateInputType
    _sum?: CalendarioSumAggregateInputType
    _min?: CalendarioMinAggregateInputType
    _max?: CalendarioMaxAggregateInputType
  }

  export type CalendarioGroupByOutputType = {
    id: number
    fecha: Date
    ocasion: string | null
    usuarioId: number
    outfitId: number
    _count: CalendarioCountAggregateOutputType | null
    _avg: CalendarioAvgAggregateOutputType | null
    _sum: CalendarioSumAggregateOutputType | null
    _min: CalendarioMinAggregateOutputType | null
    _max: CalendarioMaxAggregateOutputType | null
  }

  type GetCalendarioGroupByPayload<T extends CalendarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CalendarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CalendarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CalendarioGroupByOutputType[P]>
            : GetScalarType<T[P], CalendarioGroupByOutputType[P]>
        }
      >
    >


  export type CalendarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fecha?: boolean
    ocasion?: boolean
    usuarioId?: boolean
    outfitId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendario"]>

  export type CalendarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fecha?: boolean
    ocasion?: boolean
    usuarioId?: boolean
    outfitId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendario"]>

  export type CalendarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fecha?: boolean
    ocasion?: boolean
    usuarioId?: boolean
    outfitId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendario"]>

  export type CalendarioSelectScalar = {
    id?: boolean
    fecha?: boolean
    ocasion?: boolean
    usuarioId?: boolean
    outfitId?: boolean
  }

  export type CalendarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fecha" | "ocasion" | "usuarioId" | "outfitId", ExtArgs["result"]["calendario"]>
  export type CalendarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
  }
  export type CalendarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
  }
  export type CalendarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
  }

  export type $CalendarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Calendario"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      outfit: Prisma.$OutfitPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fecha: Date
      ocasion: string | null
      usuarioId: number
      outfitId: number
    }, ExtArgs["result"]["calendario"]>
    composites: {}
  }

  type CalendarioGetPayload<S extends boolean | null | undefined | CalendarioDefaultArgs> = $Result.GetResult<Prisma.$CalendarioPayload, S>

  type CalendarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CalendarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CalendarioCountAggregateInputType | true
    }

  export interface CalendarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Calendario'], meta: { name: 'Calendario' } }
    /**
     * Find zero or one Calendario that matches the filter.
     * @param {CalendarioFindUniqueArgs} args - Arguments to find a Calendario
     * @example
     * // Get one Calendario
     * const calendario = await prisma.calendario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CalendarioFindUniqueArgs>(args: SelectSubset<T, CalendarioFindUniqueArgs<ExtArgs>>): Prisma__CalendarioClient<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Calendario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CalendarioFindUniqueOrThrowArgs} args - Arguments to find a Calendario
     * @example
     * // Get one Calendario
     * const calendario = await prisma.calendario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CalendarioFindUniqueOrThrowArgs>(args: SelectSubset<T, CalendarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CalendarioClient<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Calendario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarioFindFirstArgs} args - Arguments to find a Calendario
     * @example
     * // Get one Calendario
     * const calendario = await prisma.calendario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CalendarioFindFirstArgs>(args?: SelectSubset<T, CalendarioFindFirstArgs<ExtArgs>>): Prisma__CalendarioClient<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Calendario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarioFindFirstOrThrowArgs} args - Arguments to find a Calendario
     * @example
     * // Get one Calendario
     * const calendario = await prisma.calendario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CalendarioFindFirstOrThrowArgs>(args?: SelectSubset<T, CalendarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__CalendarioClient<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Calendarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Calendarios
     * const calendarios = await prisma.calendario.findMany()
     * 
     * // Get first 10 Calendarios
     * const calendarios = await prisma.calendario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const calendarioWithIdOnly = await prisma.calendario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CalendarioFindManyArgs>(args?: SelectSubset<T, CalendarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Calendario.
     * @param {CalendarioCreateArgs} args - Arguments to create a Calendario.
     * @example
     * // Create one Calendario
     * const Calendario = await prisma.calendario.create({
     *   data: {
     *     // ... data to create a Calendario
     *   }
     * })
     * 
     */
    create<T extends CalendarioCreateArgs>(args: SelectSubset<T, CalendarioCreateArgs<ExtArgs>>): Prisma__CalendarioClient<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Calendarios.
     * @param {CalendarioCreateManyArgs} args - Arguments to create many Calendarios.
     * @example
     * // Create many Calendarios
     * const calendario = await prisma.calendario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CalendarioCreateManyArgs>(args?: SelectSubset<T, CalendarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Calendarios and returns the data saved in the database.
     * @param {CalendarioCreateManyAndReturnArgs} args - Arguments to create many Calendarios.
     * @example
     * // Create many Calendarios
     * const calendario = await prisma.calendario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Calendarios and only return the `id`
     * const calendarioWithIdOnly = await prisma.calendario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CalendarioCreateManyAndReturnArgs>(args?: SelectSubset<T, CalendarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Calendario.
     * @param {CalendarioDeleteArgs} args - Arguments to delete one Calendario.
     * @example
     * // Delete one Calendario
     * const Calendario = await prisma.calendario.delete({
     *   where: {
     *     // ... filter to delete one Calendario
     *   }
     * })
     * 
     */
    delete<T extends CalendarioDeleteArgs>(args: SelectSubset<T, CalendarioDeleteArgs<ExtArgs>>): Prisma__CalendarioClient<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Calendario.
     * @param {CalendarioUpdateArgs} args - Arguments to update one Calendario.
     * @example
     * // Update one Calendario
     * const calendario = await prisma.calendario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CalendarioUpdateArgs>(args: SelectSubset<T, CalendarioUpdateArgs<ExtArgs>>): Prisma__CalendarioClient<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Calendarios.
     * @param {CalendarioDeleteManyArgs} args - Arguments to filter Calendarios to delete.
     * @example
     * // Delete a few Calendarios
     * const { count } = await prisma.calendario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CalendarioDeleteManyArgs>(args?: SelectSubset<T, CalendarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calendarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Calendarios
     * const calendario = await prisma.calendario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CalendarioUpdateManyArgs>(args: SelectSubset<T, CalendarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calendarios and returns the data updated in the database.
     * @param {CalendarioUpdateManyAndReturnArgs} args - Arguments to update many Calendarios.
     * @example
     * // Update many Calendarios
     * const calendario = await prisma.calendario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Calendarios and only return the `id`
     * const calendarioWithIdOnly = await prisma.calendario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CalendarioUpdateManyAndReturnArgs>(args: SelectSubset<T, CalendarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Calendario.
     * @param {CalendarioUpsertArgs} args - Arguments to update or create a Calendario.
     * @example
     * // Update or create a Calendario
     * const calendario = await prisma.calendario.upsert({
     *   create: {
     *     // ... data to create a Calendario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Calendario we want to update
     *   }
     * })
     */
    upsert<T extends CalendarioUpsertArgs>(args: SelectSubset<T, CalendarioUpsertArgs<ExtArgs>>): Prisma__CalendarioClient<$Result.GetResult<Prisma.$CalendarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Calendarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarioCountArgs} args - Arguments to filter Calendarios to count.
     * @example
     * // Count the number of Calendarios
     * const count = await prisma.calendario.count({
     *   where: {
     *     // ... the filter for the Calendarios we want to count
     *   }
     * })
    **/
    count<T extends CalendarioCountArgs>(
      args?: Subset<T, CalendarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CalendarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Calendario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CalendarioAggregateArgs>(args: Subset<T, CalendarioAggregateArgs>): Prisma.PrismaPromise<GetCalendarioAggregateType<T>>

    /**
     * Group by Calendario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CalendarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CalendarioGroupByArgs['orderBy'] }
        : { orderBy?: CalendarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CalendarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCalendarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Calendario model
   */
  readonly fields: CalendarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Calendario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CalendarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    outfit<T extends OutfitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OutfitDefaultArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Calendario model
   */
  interface CalendarioFieldRefs {
    readonly id: FieldRef<"Calendario", 'Int'>
    readonly fecha: FieldRef<"Calendario", 'DateTime'>
    readonly ocasion: FieldRef<"Calendario", 'String'>
    readonly usuarioId: FieldRef<"Calendario", 'Int'>
    readonly outfitId: FieldRef<"Calendario", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Calendario findUnique
   */
  export type CalendarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    /**
     * Filter, which Calendario to fetch.
     */
    where: CalendarioWhereUniqueInput
  }

  /**
   * Calendario findUniqueOrThrow
   */
  export type CalendarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    /**
     * Filter, which Calendario to fetch.
     */
    where: CalendarioWhereUniqueInput
  }

  /**
   * Calendario findFirst
   */
  export type CalendarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    /**
     * Filter, which Calendario to fetch.
     */
    where?: CalendarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calendarios to fetch.
     */
    orderBy?: CalendarioOrderByWithRelationInput | CalendarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Calendarios.
     */
    cursor?: CalendarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calendarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calendarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Calendarios.
     */
    distinct?: CalendarioScalarFieldEnum | CalendarioScalarFieldEnum[]
  }

  /**
   * Calendario findFirstOrThrow
   */
  export type CalendarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    /**
     * Filter, which Calendario to fetch.
     */
    where?: CalendarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calendarios to fetch.
     */
    orderBy?: CalendarioOrderByWithRelationInput | CalendarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Calendarios.
     */
    cursor?: CalendarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calendarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calendarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Calendarios.
     */
    distinct?: CalendarioScalarFieldEnum | CalendarioScalarFieldEnum[]
  }

  /**
   * Calendario findMany
   */
  export type CalendarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    /**
     * Filter, which Calendarios to fetch.
     */
    where?: CalendarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calendarios to fetch.
     */
    orderBy?: CalendarioOrderByWithRelationInput | CalendarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Calendarios.
     */
    cursor?: CalendarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calendarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calendarios.
     */
    skip?: number
    distinct?: CalendarioScalarFieldEnum | CalendarioScalarFieldEnum[]
  }

  /**
   * Calendario create
   */
  export type CalendarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Calendario.
     */
    data: XOR<CalendarioCreateInput, CalendarioUncheckedCreateInput>
  }

  /**
   * Calendario createMany
   */
  export type CalendarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Calendarios.
     */
    data: CalendarioCreateManyInput | CalendarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Calendario createManyAndReturn
   */
  export type CalendarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * The data used to create many Calendarios.
     */
    data: CalendarioCreateManyInput | CalendarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Calendario update
   */
  export type CalendarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Calendario.
     */
    data: XOR<CalendarioUpdateInput, CalendarioUncheckedUpdateInput>
    /**
     * Choose, which Calendario to update.
     */
    where: CalendarioWhereUniqueInput
  }

  /**
   * Calendario updateMany
   */
  export type CalendarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Calendarios.
     */
    data: XOR<CalendarioUpdateManyMutationInput, CalendarioUncheckedUpdateManyInput>
    /**
     * Filter which Calendarios to update
     */
    where?: CalendarioWhereInput
    /**
     * Limit how many Calendarios to update.
     */
    limit?: number
  }

  /**
   * Calendario updateManyAndReturn
   */
  export type CalendarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * The data used to update Calendarios.
     */
    data: XOR<CalendarioUpdateManyMutationInput, CalendarioUncheckedUpdateManyInput>
    /**
     * Filter which Calendarios to update
     */
    where?: CalendarioWhereInput
    /**
     * Limit how many Calendarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Calendario upsert
   */
  export type CalendarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Calendario to update in case it exists.
     */
    where: CalendarioWhereUniqueInput
    /**
     * In case the Calendario found by the `where` argument doesn't exist, create a new Calendario with this data.
     */
    create: XOR<CalendarioCreateInput, CalendarioUncheckedCreateInput>
    /**
     * In case the Calendario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CalendarioUpdateInput, CalendarioUncheckedUpdateInput>
  }

  /**
   * Calendario delete
   */
  export type CalendarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
    /**
     * Filter which Calendario to delete.
     */
    where: CalendarioWhereUniqueInput
  }

  /**
   * Calendario deleteMany
   */
  export type CalendarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Calendarios to delete
     */
    where?: CalendarioWhereInput
    /**
     * Limit how many Calendarios to delete.
     */
    limit?: number
  }

  /**
   * Calendario without action
   */
  export type CalendarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calendario
     */
    select?: CalendarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calendario
     */
    omit?: CalendarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarioInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    rol: 'rol',
    estilo_preferido: 'estilo_preferido',
    fecha_registro: 'fecha_registro'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const PrendaScalarFieldEnum: {
    id: 'id',
    imagen_url: 'imagen_url',
    categoria: 'categoria',
    color_principal: 'color_principal',
    estado: 'estado',
    fecha_creacion: 'fecha_creacion',
    usuarioId: 'usuarioId'
  };

  export type PrendaScalarFieldEnum = (typeof PrendaScalarFieldEnum)[keyof typeof PrendaScalarFieldEnum]


  export const OutfitScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    fecha_creacion: 'fecha_creacion',
    usuarioId: 'usuarioId'
  };

  export type OutfitScalarFieldEnum = (typeof OutfitScalarFieldEnum)[keyof typeof OutfitScalarFieldEnum]


  export const OutfitPrendaScalarFieldEnum: {
    id: 'id',
    outfitId: 'outfitId',
    prendaId: 'prendaId'
  };

  export type OutfitPrendaScalarFieldEnum = (typeof OutfitPrendaScalarFieldEnum)[keyof typeof OutfitPrendaScalarFieldEnum]


  export const CalendarioScalarFieldEnum: {
    id: 'id',
    fecha: 'fecha',
    ocasion: 'ocasion',
    usuarioId: 'usuarioId',
    outfitId: 'outfitId'
  };

  export type CalendarioScalarFieldEnum = (typeof CalendarioScalarFieldEnum)[keyof typeof CalendarioScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    username?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: StringFilter<"Usuario"> | string
    estilo_preferido?: StringNullableFilter<"Usuario"> | string | null
    fecha_registro?: DateTimeFilter<"Usuario"> | Date | string
    prendas?: PrendaListRelationFilter
    outfits?: OutfitListRelationFilter
    calendarios?: CalendarioListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    estilo_preferido?: SortOrderInput | SortOrder
    fecha_registro?: SortOrder
    prendas?: PrendaOrderByRelationAggregateInput
    outfits?: OutfitOrderByRelationAggregateInput
    calendarios?: CalendarioOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    username?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: StringFilter<"Usuario"> | string
    estilo_preferido?: StringNullableFilter<"Usuario"> | string | null
    fecha_registro?: DateTimeFilter<"Usuario"> | Date | string
    prendas?: PrendaListRelationFilter
    outfits?: OutfitListRelationFilter
    calendarios?: CalendarioListRelationFilter
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    estilo_preferido?: SortOrderInput | SortOrder
    fecha_registro?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    username?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    password?: StringWithAggregatesFilter<"Usuario"> | string
    rol?: StringWithAggregatesFilter<"Usuario"> | string
    estilo_preferido?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    fecha_registro?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type PrendaWhereInput = {
    AND?: PrendaWhereInput | PrendaWhereInput[]
    OR?: PrendaWhereInput[]
    NOT?: PrendaWhereInput | PrendaWhereInput[]
    id?: IntFilter<"Prenda"> | number
    imagen_url?: StringNullableFilter<"Prenda"> | string | null
    categoria?: StringNullableFilter<"Prenda"> | string | null
    color_principal?: StringNullableFilter<"Prenda"> | string | null
    estado?: StringFilter<"Prenda"> | string
    fecha_creacion?: DateTimeFilter<"Prenda"> | Date | string
    usuarioId?: IntFilter<"Prenda"> | number
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    outfits?: OutfitPrendaListRelationFilter
  }

  export type PrendaOrderByWithRelationInput = {
    id?: SortOrder
    imagen_url?: SortOrderInput | SortOrder
    categoria?: SortOrderInput | SortOrder
    color_principal?: SortOrderInput | SortOrder
    estado?: SortOrder
    fecha_creacion?: SortOrder
    usuarioId?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    outfits?: OutfitPrendaOrderByRelationAggregateInput
  }

  export type PrendaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PrendaWhereInput | PrendaWhereInput[]
    OR?: PrendaWhereInput[]
    NOT?: PrendaWhereInput | PrendaWhereInput[]
    imagen_url?: StringNullableFilter<"Prenda"> | string | null
    categoria?: StringNullableFilter<"Prenda"> | string | null
    color_principal?: StringNullableFilter<"Prenda"> | string | null
    estado?: StringFilter<"Prenda"> | string
    fecha_creacion?: DateTimeFilter<"Prenda"> | Date | string
    usuarioId?: IntFilter<"Prenda"> | number
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    outfits?: OutfitPrendaListRelationFilter
  }, "id">

  export type PrendaOrderByWithAggregationInput = {
    id?: SortOrder
    imagen_url?: SortOrderInput | SortOrder
    categoria?: SortOrderInput | SortOrder
    color_principal?: SortOrderInput | SortOrder
    estado?: SortOrder
    fecha_creacion?: SortOrder
    usuarioId?: SortOrder
    _count?: PrendaCountOrderByAggregateInput
    _avg?: PrendaAvgOrderByAggregateInput
    _max?: PrendaMaxOrderByAggregateInput
    _min?: PrendaMinOrderByAggregateInput
    _sum?: PrendaSumOrderByAggregateInput
  }

  export type PrendaScalarWhereWithAggregatesInput = {
    AND?: PrendaScalarWhereWithAggregatesInput | PrendaScalarWhereWithAggregatesInput[]
    OR?: PrendaScalarWhereWithAggregatesInput[]
    NOT?: PrendaScalarWhereWithAggregatesInput | PrendaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Prenda"> | number
    imagen_url?: StringNullableWithAggregatesFilter<"Prenda"> | string | null
    categoria?: StringNullableWithAggregatesFilter<"Prenda"> | string | null
    color_principal?: StringNullableWithAggregatesFilter<"Prenda"> | string | null
    estado?: StringWithAggregatesFilter<"Prenda"> | string
    fecha_creacion?: DateTimeWithAggregatesFilter<"Prenda"> | Date | string
    usuarioId?: IntWithAggregatesFilter<"Prenda"> | number
  }

  export type OutfitWhereInput = {
    AND?: OutfitWhereInput | OutfitWhereInput[]
    OR?: OutfitWhereInput[]
    NOT?: OutfitWhereInput | OutfitWhereInput[]
    id?: IntFilter<"Outfit"> | number
    nombre?: StringFilter<"Outfit"> | string
    fecha_creacion?: DateTimeFilter<"Outfit"> | Date | string
    usuarioId?: IntFilter<"Outfit"> | number
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    prendas?: OutfitPrendaListRelationFilter
    calendarios?: CalendarioListRelationFilter
  }

  export type OutfitOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    fecha_creacion?: SortOrder
    usuarioId?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    prendas?: OutfitPrendaOrderByRelationAggregateInput
    calendarios?: CalendarioOrderByRelationAggregateInput
  }

  export type OutfitWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OutfitWhereInput | OutfitWhereInput[]
    OR?: OutfitWhereInput[]
    NOT?: OutfitWhereInput | OutfitWhereInput[]
    nombre?: StringFilter<"Outfit"> | string
    fecha_creacion?: DateTimeFilter<"Outfit"> | Date | string
    usuarioId?: IntFilter<"Outfit"> | number
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    prendas?: OutfitPrendaListRelationFilter
    calendarios?: CalendarioListRelationFilter
  }, "id">

  export type OutfitOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    fecha_creacion?: SortOrder
    usuarioId?: SortOrder
    _count?: OutfitCountOrderByAggregateInput
    _avg?: OutfitAvgOrderByAggregateInput
    _max?: OutfitMaxOrderByAggregateInput
    _min?: OutfitMinOrderByAggregateInput
    _sum?: OutfitSumOrderByAggregateInput
  }

  export type OutfitScalarWhereWithAggregatesInput = {
    AND?: OutfitScalarWhereWithAggregatesInput | OutfitScalarWhereWithAggregatesInput[]
    OR?: OutfitScalarWhereWithAggregatesInput[]
    NOT?: OutfitScalarWhereWithAggregatesInput | OutfitScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Outfit"> | number
    nombre?: StringWithAggregatesFilter<"Outfit"> | string
    fecha_creacion?: DateTimeWithAggregatesFilter<"Outfit"> | Date | string
    usuarioId?: IntWithAggregatesFilter<"Outfit"> | number
  }

  export type OutfitPrendaWhereInput = {
    AND?: OutfitPrendaWhereInput | OutfitPrendaWhereInput[]
    OR?: OutfitPrendaWhereInput[]
    NOT?: OutfitPrendaWhereInput | OutfitPrendaWhereInput[]
    id?: IntFilter<"OutfitPrenda"> | number
    outfitId?: IntFilter<"OutfitPrenda"> | number
    prendaId?: IntFilter<"OutfitPrenda"> | number
    outfit?: XOR<OutfitScalarRelationFilter, OutfitWhereInput>
    prenda?: XOR<PrendaScalarRelationFilter, PrendaWhereInput>
  }

  export type OutfitPrendaOrderByWithRelationInput = {
    id?: SortOrder
    outfitId?: SortOrder
    prendaId?: SortOrder
    outfit?: OutfitOrderByWithRelationInput
    prenda?: PrendaOrderByWithRelationInput
  }

  export type OutfitPrendaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OutfitPrendaWhereInput | OutfitPrendaWhereInput[]
    OR?: OutfitPrendaWhereInput[]
    NOT?: OutfitPrendaWhereInput | OutfitPrendaWhereInput[]
    outfitId?: IntFilter<"OutfitPrenda"> | number
    prendaId?: IntFilter<"OutfitPrenda"> | number
    outfit?: XOR<OutfitScalarRelationFilter, OutfitWhereInput>
    prenda?: XOR<PrendaScalarRelationFilter, PrendaWhereInput>
  }, "id">

  export type OutfitPrendaOrderByWithAggregationInput = {
    id?: SortOrder
    outfitId?: SortOrder
    prendaId?: SortOrder
    _count?: OutfitPrendaCountOrderByAggregateInput
    _avg?: OutfitPrendaAvgOrderByAggregateInput
    _max?: OutfitPrendaMaxOrderByAggregateInput
    _min?: OutfitPrendaMinOrderByAggregateInput
    _sum?: OutfitPrendaSumOrderByAggregateInput
  }

  export type OutfitPrendaScalarWhereWithAggregatesInput = {
    AND?: OutfitPrendaScalarWhereWithAggregatesInput | OutfitPrendaScalarWhereWithAggregatesInput[]
    OR?: OutfitPrendaScalarWhereWithAggregatesInput[]
    NOT?: OutfitPrendaScalarWhereWithAggregatesInput | OutfitPrendaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OutfitPrenda"> | number
    outfitId?: IntWithAggregatesFilter<"OutfitPrenda"> | number
    prendaId?: IntWithAggregatesFilter<"OutfitPrenda"> | number
  }

  export type CalendarioWhereInput = {
    AND?: CalendarioWhereInput | CalendarioWhereInput[]
    OR?: CalendarioWhereInput[]
    NOT?: CalendarioWhereInput | CalendarioWhereInput[]
    id?: IntFilter<"Calendario"> | number
    fecha?: DateTimeFilter<"Calendario"> | Date | string
    ocasion?: StringNullableFilter<"Calendario"> | string | null
    usuarioId?: IntFilter<"Calendario"> | number
    outfitId?: IntFilter<"Calendario"> | number
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    outfit?: XOR<OutfitScalarRelationFilter, OutfitWhereInput>
  }

  export type CalendarioOrderByWithRelationInput = {
    id?: SortOrder
    fecha?: SortOrder
    ocasion?: SortOrderInput | SortOrder
    usuarioId?: SortOrder
    outfitId?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    outfit?: OutfitOrderByWithRelationInput
  }

  export type CalendarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CalendarioWhereInput | CalendarioWhereInput[]
    OR?: CalendarioWhereInput[]
    NOT?: CalendarioWhereInput | CalendarioWhereInput[]
    fecha?: DateTimeFilter<"Calendario"> | Date | string
    ocasion?: StringNullableFilter<"Calendario"> | string | null
    usuarioId?: IntFilter<"Calendario"> | number
    outfitId?: IntFilter<"Calendario"> | number
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    outfit?: XOR<OutfitScalarRelationFilter, OutfitWhereInput>
  }, "id">

  export type CalendarioOrderByWithAggregationInput = {
    id?: SortOrder
    fecha?: SortOrder
    ocasion?: SortOrderInput | SortOrder
    usuarioId?: SortOrder
    outfitId?: SortOrder
    _count?: CalendarioCountOrderByAggregateInput
    _avg?: CalendarioAvgOrderByAggregateInput
    _max?: CalendarioMaxOrderByAggregateInput
    _min?: CalendarioMinOrderByAggregateInput
    _sum?: CalendarioSumOrderByAggregateInput
  }

  export type CalendarioScalarWhereWithAggregatesInput = {
    AND?: CalendarioScalarWhereWithAggregatesInput | CalendarioScalarWhereWithAggregatesInput[]
    OR?: CalendarioScalarWhereWithAggregatesInput[]
    NOT?: CalendarioScalarWhereWithAggregatesInput | CalendarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Calendario"> | number
    fecha?: DateTimeWithAggregatesFilter<"Calendario"> | Date | string
    ocasion?: StringNullableWithAggregatesFilter<"Calendario"> | string | null
    usuarioId?: IntWithAggregatesFilter<"Calendario"> | number
    outfitId?: IntWithAggregatesFilter<"Calendario"> | number
  }

  export type UsuarioCreateInput = {
    username: string
    email: string
    password: string
    rol?: string
    estilo_preferido?: string | null
    fecha_registro?: Date | string
    prendas?: PrendaCreateNestedManyWithoutUsuarioInput
    outfits?: OutfitCreateNestedManyWithoutUsuarioInput
    calendarios?: CalendarioCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password: string
    rol?: string
    estilo_preferido?: string | null
    fecha_registro?: Date | string
    prendas?: PrendaUncheckedCreateNestedManyWithoutUsuarioInput
    outfits?: OutfitUncheckedCreateNestedManyWithoutUsuarioInput
    calendarios?: CalendarioUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    estilo_preferido?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: DateTimeFieldUpdateOperationsInput | Date | string
    prendas?: PrendaUpdateManyWithoutUsuarioNestedInput
    outfits?: OutfitUpdateManyWithoutUsuarioNestedInput
    calendarios?: CalendarioUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    estilo_preferido?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: DateTimeFieldUpdateOperationsInput | Date | string
    prendas?: PrendaUncheckedUpdateManyWithoutUsuarioNestedInput
    outfits?: OutfitUncheckedUpdateManyWithoutUsuarioNestedInput
    calendarios?: CalendarioUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: number
    username: string
    email: string
    password: string
    rol?: string
    estilo_preferido?: string | null
    fecha_registro?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    estilo_preferido?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    estilo_preferido?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrendaCreateInput = {
    imagen_url?: string | null
    categoria?: string | null
    color_principal?: string | null
    estado?: string
    fecha_creacion?: Date | string
    usuario: UsuarioCreateNestedOneWithoutPrendasInput
    outfits?: OutfitPrendaCreateNestedManyWithoutPrendaInput
  }

  export type PrendaUncheckedCreateInput = {
    id?: number
    imagen_url?: string | null
    categoria?: string | null
    color_principal?: string | null
    estado?: string
    fecha_creacion?: Date | string
    usuarioId: number
    outfits?: OutfitPrendaUncheckedCreateNestedManyWithoutPrendaInput
  }

  export type PrendaUpdateInput = {
    imagen_url?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    color_principal?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutPrendasNestedInput
    outfits?: OutfitPrendaUpdateManyWithoutPrendaNestedInput
  }

  export type PrendaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    imagen_url?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    color_principal?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    outfits?: OutfitPrendaUncheckedUpdateManyWithoutPrendaNestedInput
  }

  export type PrendaCreateManyInput = {
    id?: number
    imagen_url?: string | null
    categoria?: string | null
    color_principal?: string | null
    estado?: string
    fecha_creacion?: Date | string
    usuarioId: number
  }

  export type PrendaUpdateManyMutationInput = {
    imagen_url?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    color_principal?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrendaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    imagen_url?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    color_principal?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitCreateInput = {
    nombre: string
    fecha_creacion?: Date | string
    usuario: UsuarioCreateNestedOneWithoutOutfitsInput
    prendas?: OutfitPrendaCreateNestedManyWithoutOutfitInput
    calendarios?: CalendarioCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUncheckedCreateInput = {
    id?: number
    nombre: string
    fecha_creacion?: Date | string
    usuarioId: number
    prendas?: OutfitPrendaUncheckedCreateNestedManyWithoutOutfitInput
    calendarios?: CalendarioUncheckedCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutOutfitsNestedInput
    prendas?: OutfitPrendaUpdateManyWithoutOutfitNestedInput
    calendarios?: CalendarioUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    prendas?: OutfitPrendaUncheckedUpdateManyWithoutOutfitNestedInput
    calendarios?: CalendarioUncheckedUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitCreateManyInput = {
    id?: number
    nombre: string
    fecha_creacion?: Date | string
    usuarioId: number
  }

  export type OutfitUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutfitUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitPrendaCreateInput = {
    outfit: OutfitCreateNestedOneWithoutPrendasInput
    prenda: PrendaCreateNestedOneWithoutOutfitsInput
  }

  export type OutfitPrendaUncheckedCreateInput = {
    id?: number
    outfitId: number
    prendaId: number
  }

  export type OutfitPrendaUpdateInput = {
    outfit?: OutfitUpdateOneRequiredWithoutPrendasNestedInput
    prenda?: PrendaUpdateOneRequiredWithoutOutfitsNestedInput
  }

  export type OutfitPrendaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
    prendaId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitPrendaCreateManyInput = {
    id?: number
    outfitId: number
    prendaId: number
  }

  export type OutfitPrendaUpdateManyMutationInput = {

  }

  export type OutfitPrendaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
    prendaId?: IntFieldUpdateOperationsInput | number
  }

  export type CalendarioCreateInput = {
    fecha: Date | string
    ocasion?: string | null
    usuario: UsuarioCreateNestedOneWithoutCalendariosInput
    outfit: OutfitCreateNestedOneWithoutCalendariosInput
  }

  export type CalendarioUncheckedCreateInput = {
    id?: number
    fecha: Date | string
    ocasion?: string | null
    usuarioId: number
    outfitId: number
  }

  export type CalendarioUpdateInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ocasion?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: UsuarioUpdateOneRequiredWithoutCalendariosNestedInput
    outfit?: OutfitUpdateOneRequiredWithoutCalendariosNestedInput
  }

  export type CalendarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ocasion?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type CalendarioCreateManyInput = {
    id?: number
    fecha: Date | string
    ocasion?: string | null
    usuarioId: number
    outfitId: number
  }

  export type CalendarioUpdateManyMutationInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ocasion?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CalendarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ocasion?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PrendaListRelationFilter = {
    every?: PrendaWhereInput
    some?: PrendaWhereInput
    none?: PrendaWhereInput
  }

  export type OutfitListRelationFilter = {
    every?: OutfitWhereInput
    some?: OutfitWhereInput
    none?: OutfitWhereInput
  }

  export type CalendarioListRelationFilter = {
    every?: CalendarioWhereInput
    some?: CalendarioWhereInput
    none?: CalendarioWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PrendaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OutfitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CalendarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    estilo_preferido?: SortOrder
    fecha_registro?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    estilo_preferido?: SortOrder
    fecha_registro?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    estilo_preferido?: SortOrder
    fecha_registro?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type OutfitPrendaListRelationFilter = {
    every?: OutfitPrendaWhereInput
    some?: OutfitPrendaWhereInput
    none?: OutfitPrendaWhereInput
  }

  export type OutfitPrendaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PrendaCountOrderByAggregateInput = {
    id?: SortOrder
    imagen_url?: SortOrder
    categoria?: SortOrder
    color_principal?: SortOrder
    estado?: SortOrder
    fecha_creacion?: SortOrder
    usuarioId?: SortOrder
  }

  export type PrendaAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
  }

  export type PrendaMaxOrderByAggregateInput = {
    id?: SortOrder
    imagen_url?: SortOrder
    categoria?: SortOrder
    color_principal?: SortOrder
    estado?: SortOrder
    fecha_creacion?: SortOrder
    usuarioId?: SortOrder
  }

  export type PrendaMinOrderByAggregateInput = {
    id?: SortOrder
    imagen_url?: SortOrder
    categoria?: SortOrder
    color_principal?: SortOrder
    estado?: SortOrder
    fecha_creacion?: SortOrder
    usuarioId?: SortOrder
  }

  export type PrendaSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
  }

  export type OutfitCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    fecha_creacion?: SortOrder
    usuarioId?: SortOrder
  }

  export type OutfitAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
  }

  export type OutfitMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    fecha_creacion?: SortOrder
    usuarioId?: SortOrder
  }

  export type OutfitMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    fecha_creacion?: SortOrder
    usuarioId?: SortOrder
  }

  export type OutfitSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
  }

  export type OutfitScalarRelationFilter = {
    is?: OutfitWhereInput
    isNot?: OutfitWhereInput
  }

  export type PrendaScalarRelationFilter = {
    is?: PrendaWhereInput
    isNot?: PrendaWhereInput
  }

  export type OutfitPrendaCountOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    prendaId?: SortOrder
  }

  export type OutfitPrendaAvgOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    prendaId?: SortOrder
  }

  export type OutfitPrendaMaxOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    prendaId?: SortOrder
  }

  export type OutfitPrendaMinOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    prendaId?: SortOrder
  }

  export type OutfitPrendaSumOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    prendaId?: SortOrder
  }

  export type CalendarioCountOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    ocasion?: SortOrder
    usuarioId?: SortOrder
    outfitId?: SortOrder
  }

  export type CalendarioAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    outfitId?: SortOrder
  }

  export type CalendarioMaxOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    ocasion?: SortOrder
    usuarioId?: SortOrder
    outfitId?: SortOrder
  }

  export type CalendarioMinOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    ocasion?: SortOrder
    usuarioId?: SortOrder
    outfitId?: SortOrder
  }

  export type CalendarioSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    outfitId?: SortOrder
  }

  export type PrendaCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PrendaCreateWithoutUsuarioInput, PrendaUncheckedCreateWithoutUsuarioInput> | PrendaCreateWithoutUsuarioInput[] | PrendaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PrendaCreateOrConnectWithoutUsuarioInput | PrendaCreateOrConnectWithoutUsuarioInput[]
    createMany?: PrendaCreateManyUsuarioInputEnvelope
    connect?: PrendaWhereUniqueInput | PrendaWhereUniqueInput[]
  }

  export type OutfitCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<OutfitCreateWithoutUsuarioInput, OutfitUncheckedCreateWithoutUsuarioInput> | OutfitCreateWithoutUsuarioInput[] | OutfitUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutUsuarioInput | OutfitCreateOrConnectWithoutUsuarioInput[]
    createMany?: OutfitCreateManyUsuarioInputEnvelope
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
  }

  export type CalendarioCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<CalendarioCreateWithoutUsuarioInput, CalendarioUncheckedCreateWithoutUsuarioInput> | CalendarioCreateWithoutUsuarioInput[] | CalendarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CalendarioCreateOrConnectWithoutUsuarioInput | CalendarioCreateOrConnectWithoutUsuarioInput[]
    createMany?: CalendarioCreateManyUsuarioInputEnvelope
    connect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
  }

  export type PrendaUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PrendaCreateWithoutUsuarioInput, PrendaUncheckedCreateWithoutUsuarioInput> | PrendaCreateWithoutUsuarioInput[] | PrendaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PrendaCreateOrConnectWithoutUsuarioInput | PrendaCreateOrConnectWithoutUsuarioInput[]
    createMany?: PrendaCreateManyUsuarioInputEnvelope
    connect?: PrendaWhereUniqueInput | PrendaWhereUniqueInput[]
  }

  export type OutfitUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<OutfitCreateWithoutUsuarioInput, OutfitUncheckedCreateWithoutUsuarioInput> | OutfitCreateWithoutUsuarioInput[] | OutfitUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutUsuarioInput | OutfitCreateOrConnectWithoutUsuarioInput[]
    createMany?: OutfitCreateManyUsuarioInputEnvelope
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
  }

  export type CalendarioUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<CalendarioCreateWithoutUsuarioInput, CalendarioUncheckedCreateWithoutUsuarioInput> | CalendarioCreateWithoutUsuarioInput[] | CalendarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CalendarioCreateOrConnectWithoutUsuarioInput | CalendarioCreateOrConnectWithoutUsuarioInput[]
    createMany?: CalendarioCreateManyUsuarioInputEnvelope
    connect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PrendaUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PrendaCreateWithoutUsuarioInput, PrendaUncheckedCreateWithoutUsuarioInput> | PrendaCreateWithoutUsuarioInput[] | PrendaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PrendaCreateOrConnectWithoutUsuarioInput | PrendaCreateOrConnectWithoutUsuarioInput[]
    upsert?: PrendaUpsertWithWhereUniqueWithoutUsuarioInput | PrendaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PrendaCreateManyUsuarioInputEnvelope
    set?: PrendaWhereUniqueInput | PrendaWhereUniqueInput[]
    disconnect?: PrendaWhereUniqueInput | PrendaWhereUniqueInput[]
    delete?: PrendaWhereUniqueInput | PrendaWhereUniqueInput[]
    connect?: PrendaWhereUniqueInput | PrendaWhereUniqueInput[]
    update?: PrendaUpdateWithWhereUniqueWithoutUsuarioInput | PrendaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PrendaUpdateManyWithWhereWithoutUsuarioInput | PrendaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PrendaScalarWhereInput | PrendaScalarWhereInput[]
  }

  export type OutfitUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<OutfitCreateWithoutUsuarioInput, OutfitUncheckedCreateWithoutUsuarioInput> | OutfitCreateWithoutUsuarioInput[] | OutfitUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutUsuarioInput | OutfitCreateOrConnectWithoutUsuarioInput[]
    upsert?: OutfitUpsertWithWhereUniqueWithoutUsuarioInput | OutfitUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: OutfitCreateManyUsuarioInputEnvelope
    set?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    disconnect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    delete?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    update?: OutfitUpdateWithWhereUniqueWithoutUsuarioInput | OutfitUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: OutfitUpdateManyWithWhereWithoutUsuarioInput | OutfitUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: OutfitScalarWhereInput | OutfitScalarWhereInput[]
  }

  export type CalendarioUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<CalendarioCreateWithoutUsuarioInput, CalendarioUncheckedCreateWithoutUsuarioInput> | CalendarioCreateWithoutUsuarioInput[] | CalendarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CalendarioCreateOrConnectWithoutUsuarioInput | CalendarioCreateOrConnectWithoutUsuarioInput[]
    upsert?: CalendarioUpsertWithWhereUniqueWithoutUsuarioInput | CalendarioUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: CalendarioCreateManyUsuarioInputEnvelope
    set?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    disconnect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    delete?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    connect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    update?: CalendarioUpdateWithWhereUniqueWithoutUsuarioInput | CalendarioUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: CalendarioUpdateManyWithWhereWithoutUsuarioInput | CalendarioUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: CalendarioScalarWhereInput | CalendarioScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PrendaUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PrendaCreateWithoutUsuarioInput, PrendaUncheckedCreateWithoutUsuarioInput> | PrendaCreateWithoutUsuarioInput[] | PrendaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PrendaCreateOrConnectWithoutUsuarioInput | PrendaCreateOrConnectWithoutUsuarioInput[]
    upsert?: PrendaUpsertWithWhereUniqueWithoutUsuarioInput | PrendaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PrendaCreateManyUsuarioInputEnvelope
    set?: PrendaWhereUniqueInput | PrendaWhereUniqueInput[]
    disconnect?: PrendaWhereUniqueInput | PrendaWhereUniqueInput[]
    delete?: PrendaWhereUniqueInput | PrendaWhereUniqueInput[]
    connect?: PrendaWhereUniqueInput | PrendaWhereUniqueInput[]
    update?: PrendaUpdateWithWhereUniqueWithoutUsuarioInput | PrendaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PrendaUpdateManyWithWhereWithoutUsuarioInput | PrendaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PrendaScalarWhereInput | PrendaScalarWhereInput[]
  }

  export type OutfitUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<OutfitCreateWithoutUsuarioInput, OutfitUncheckedCreateWithoutUsuarioInput> | OutfitCreateWithoutUsuarioInput[] | OutfitUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutUsuarioInput | OutfitCreateOrConnectWithoutUsuarioInput[]
    upsert?: OutfitUpsertWithWhereUniqueWithoutUsuarioInput | OutfitUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: OutfitCreateManyUsuarioInputEnvelope
    set?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    disconnect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    delete?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    update?: OutfitUpdateWithWhereUniqueWithoutUsuarioInput | OutfitUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: OutfitUpdateManyWithWhereWithoutUsuarioInput | OutfitUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: OutfitScalarWhereInput | OutfitScalarWhereInput[]
  }

  export type CalendarioUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<CalendarioCreateWithoutUsuarioInput, CalendarioUncheckedCreateWithoutUsuarioInput> | CalendarioCreateWithoutUsuarioInput[] | CalendarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CalendarioCreateOrConnectWithoutUsuarioInput | CalendarioCreateOrConnectWithoutUsuarioInput[]
    upsert?: CalendarioUpsertWithWhereUniqueWithoutUsuarioInput | CalendarioUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: CalendarioCreateManyUsuarioInputEnvelope
    set?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    disconnect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    delete?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    connect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    update?: CalendarioUpdateWithWhereUniqueWithoutUsuarioInput | CalendarioUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: CalendarioUpdateManyWithWhereWithoutUsuarioInput | CalendarioUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: CalendarioScalarWhereInput | CalendarioScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutPrendasInput = {
    create?: XOR<UsuarioCreateWithoutPrendasInput, UsuarioUncheckedCreateWithoutPrendasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutPrendasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type OutfitPrendaCreateNestedManyWithoutPrendaInput = {
    create?: XOR<OutfitPrendaCreateWithoutPrendaInput, OutfitPrendaUncheckedCreateWithoutPrendaInput> | OutfitPrendaCreateWithoutPrendaInput[] | OutfitPrendaUncheckedCreateWithoutPrendaInput[]
    connectOrCreate?: OutfitPrendaCreateOrConnectWithoutPrendaInput | OutfitPrendaCreateOrConnectWithoutPrendaInput[]
    createMany?: OutfitPrendaCreateManyPrendaInputEnvelope
    connect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
  }

  export type OutfitPrendaUncheckedCreateNestedManyWithoutPrendaInput = {
    create?: XOR<OutfitPrendaCreateWithoutPrendaInput, OutfitPrendaUncheckedCreateWithoutPrendaInput> | OutfitPrendaCreateWithoutPrendaInput[] | OutfitPrendaUncheckedCreateWithoutPrendaInput[]
    connectOrCreate?: OutfitPrendaCreateOrConnectWithoutPrendaInput | OutfitPrendaCreateOrConnectWithoutPrendaInput[]
    createMany?: OutfitPrendaCreateManyPrendaInputEnvelope
    connect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
  }

  export type UsuarioUpdateOneRequiredWithoutPrendasNestedInput = {
    create?: XOR<UsuarioCreateWithoutPrendasInput, UsuarioUncheckedCreateWithoutPrendasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutPrendasInput
    upsert?: UsuarioUpsertWithoutPrendasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutPrendasInput, UsuarioUpdateWithoutPrendasInput>, UsuarioUncheckedUpdateWithoutPrendasInput>
  }

  export type OutfitPrendaUpdateManyWithoutPrendaNestedInput = {
    create?: XOR<OutfitPrendaCreateWithoutPrendaInput, OutfitPrendaUncheckedCreateWithoutPrendaInput> | OutfitPrendaCreateWithoutPrendaInput[] | OutfitPrendaUncheckedCreateWithoutPrendaInput[]
    connectOrCreate?: OutfitPrendaCreateOrConnectWithoutPrendaInput | OutfitPrendaCreateOrConnectWithoutPrendaInput[]
    upsert?: OutfitPrendaUpsertWithWhereUniqueWithoutPrendaInput | OutfitPrendaUpsertWithWhereUniqueWithoutPrendaInput[]
    createMany?: OutfitPrendaCreateManyPrendaInputEnvelope
    set?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    disconnect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    delete?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    connect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    update?: OutfitPrendaUpdateWithWhereUniqueWithoutPrendaInput | OutfitPrendaUpdateWithWhereUniqueWithoutPrendaInput[]
    updateMany?: OutfitPrendaUpdateManyWithWhereWithoutPrendaInput | OutfitPrendaUpdateManyWithWhereWithoutPrendaInput[]
    deleteMany?: OutfitPrendaScalarWhereInput | OutfitPrendaScalarWhereInput[]
  }

  export type OutfitPrendaUncheckedUpdateManyWithoutPrendaNestedInput = {
    create?: XOR<OutfitPrendaCreateWithoutPrendaInput, OutfitPrendaUncheckedCreateWithoutPrendaInput> | OutfitPrendaCreateWithoutPrendaInput[] | OutfitPrendaUncheckedCreateWithoutPrendaInput[]
    connectOrCreate?: OutfitPrendaCreateOrConnectWithoutPrendaInput | OutfitPrendaCreateOrConnectWithoutPrendaInput[]
    upsert?: OutfitPrendaUpsertWithWhereUniqueWithoutPrendaInput | OutfitPrendaUpsertWithWhereUniqueWithoutPrendaInput[]
    createMany?: OutfitPrendaCreateManyPrendaInputEnvelope
    set?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    disconnect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    delete?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    connect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    update?: OutfitPrendaUpdateWithWhereUniqueWithoutPrendaInput | OutfitPrendaUpdateWithWhereUniqueWithoutPrendaInput[]
    updateMany?: OutfitPrendaUpdateManyWithWhereWithoutPrendaInput | OutfitPrendaUpdateManyWithWhereWithoutPrendaInput[]
    deleteMany?: OutfitPrendaScalarWhereInput | OutfitPrendaScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutOutfitsInput = {
    create?: XOR<UsuarioCreateWithoutOutfitsInput, UsuarioUncheckedCreateWithoutOutfitsInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutOutfitsInput
    connect?: UsuarioWhereUniqueInput
  }

  export type OutfitPrendaCreateNestedManyWithoutOutfitInput = {
    create?: XOR<OutfitPrendaCreateWithoutOutfitInput, OutfitPrendaUncheckedCreateWithoutOutfitInput> | OutfitPrendaCreateWithoutOutfitInput[] | OutfitPrendaUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitPrendaCreateOrConnectWithoutOutfitInput | OutfitPrendaCreateOrConnectWithoutOutfitInput[]
    createMany?: OutfitPrendaCreateManyOutfitInputEnvelope
    connect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
  }

  export type CalendarioCreateNestedManyWithoutOutfitInput = {
    create?: XOR<CalendarioCreateWithoutOutfitInput, CalendarioUncheckedCreateWithoutOutfitInput> | CalendarioCreateWithoutOutfitInput[] | CalendarioUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: CalendarioCreateOrConnectWithoutOutfitInput | CalendarioCreateOrConnectWithoutOutfitInput[]
    createMany?: CalendarioCreateManyOutfitInputEnvelope
    connect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
  }

  export type OutfitPrendaUncheckedCreateNestedManyWithoutOutfitInput = {
    create?: XOR<OutfitPrendaCreateWithoutOutfitInput, OutfitPrendaUncheckedCreateWithoutOutfitInput> | OutfitPrendaCreateWithoutOutfitInput[] | OutfitPrendaUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitPrendaCreateOrConnectWithoutOutfitInput | OutfitPrendaCreateOrConnectWithoutOutfitInput[]
    createMany?: OutfitPrendaCreateManyOutfitInputEnvelope
    connect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
  }

  export type CalendarioUncheckedCreateNestedManyWithoutOutfitInput = {
    create?: XOR<CalendarioCreateWithoutOutfitInput, CalendarioUncheckedCreateWithoutOutfitInput> | CalendarioCreateWithoutOutfitInput[] | CalendarioUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: CalendarioCreateOrConnectWithoutOutfitInput | CalendarioCreateOrConnectWithoutOutfitInput[]
    createMany?: CalendarioCreateManyOutfitInputEnvelope
    connect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
  }

  export type UsuarioUpdateOneRequiredWithoutOutfitsNestedInput = {
    create?: XOR<UsuarioCreateWithoutOutfitsInput, UsuarioUncheckedCreateWithoutOutfitsInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutOutfitsInput
    upsert?: UsuarioUpsertWithoutOutfitsInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutOutfitsInput, UsuarioUpdateWithoutOutfitsInput>, UsuarioUncheckedUpdateWithoutOutfitsInput>
  }

  export type OutfitPrendaUpdateManyWithoutOutfitNestedInput = {
    create?: XOR<OutfitPrendaCreateWithoutOutfitInput, OutfitPrendaUncheckedCreateWithoutOutfitInput> | OutfitPrendaCreateWithoutOutfitInput[] | OutfitPrendaUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitPrendaCreateOrConnectWithoutOutfitInput | OutfitPrendaCreateOrConnectWithoutOutfitInput[]
    upsert?: OutfitPrendaUpsertWithWhereUniqueWithoutOutfitInput | OutfitPrendaUpsertWithWhereUniqueWithoutOutfitInput[]
    createMany?: OutfitPrendaCreateManyOutfitInputEnvelope
    set?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    disconnect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    delete?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    connect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    update?: OutfitPrendaUpdateWithWhereUniqueWithoutOutfitInput | OutfitPrendaUpdateWithWhereUniqueWithoutOutfitInput[]
    updateMany?: OutfitPrendaUpdateManyWithWhereWithoutOutfitInput | OutfitPrendaUpdateManyWithWhereWithoutOutfitInput[]
    deleteMany?: OutfitPrendaScalarWhereInput | OutfitPrendaScalarWhereInput[]
  }

  export type CalendarioUpdateManyWithoutOutfitNestedInput = {
    create?: XOR<CalendarioCreateWithoutOutfitInput, CalendarioUncheckedCreateWithoutOutfitInput> | CalendarioCreateWithoutOutfitInput[] | CalendarioUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: CalendarioCreateOrConnectWithoutOutfitInput | CalendarioCreateOrConnectWithoutOutfitInput[]
    upsert?: CalendarioUpsertWithWhereUniqueWithoutOutfitInput | CalendarioUpsertWithWhereUniqueWithoutOutfitInput[]
    createMany?: CalendarioCreateManyOutfitInputEnvelope
    set?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    disconnect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    delete?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    connect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    update?: CalendarioUpdateWithWhereUniqueWithoutOutfitInput | CalendarioUpdateWithWhereUniqueWithoutOutfitInput[]
    updateMany?: CalendarioUpdateManyWithWhereWithoutOutfitInput | CalendarioUpdateManyWithWhereWithoutOutfitInput[]
    deleteMany?: CalendarioScalarWhereInput | CalendarioScalarWhereInput[]
  }

  export type OutfitPrendaUncheckedUpdateManyWithoutOutfitNestedInput = {
    create?: XOR<OutfitPrendaCreateWithoutOutfitInput, OutfitPrendaUncheckedCreateWithoutOutfitInput> | OutfitPrendaCreateWithoutOutfitInput[] | OutfitPrendaUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitPrendaCreateOrConnectWithoutOutfitInput | OutfitPrendaCreateOrConnectWithoutOutfitInput[]
    upsert?: OutfitPrendaUpsertWithWhereUniqueWithoutOutfitInput | OutfitPrendaUpsertWithWhereUniqueWithoutOutfitInput[]
    createMany?: OutfitPrendaCreateManyOutfitInputEnvelope
    set?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    disconnect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    delete?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    connect?: OutfitPrendaWhereUniqueInput | OutfitPrendaWhereUniqueInput[]
    update?: OutfitPrendaUpdateWithWhereUniqueWithoutOutfitInput | OutfitPrendaUpdateWithWhereUniqueWithoutOutfitInput[]
    updateMany?: OutfitPrendaUpdateManyWithWhereWithoutOutfitInput | OutfitPrendaUpdateManyWithWhereWithoutOutfitInput[]
    deleteMany?: OutfitPrendaScalarWhereInput | OutfitPrendaScalarWhereInput[]
  }

  export type CalendarioUncheckedUpdateManyWithoutOutfitNestedInput = {
    create?: XOR<CalendarioCreateWithoutOutfitInput, CalendarioUncheckedCreateWithoutOutfitInput> | CalendarioCreateWithoutOutfitInput[] | CalendarioUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: CalendarioCreateOrConnectWithoutOutfitInput | CalendarioCreateOrConnectWithoutOutfitInput[]
    upsert?: CalendarioUpsertWithWhereUniqueWithoutOutfitInput | CalendarioUpsertWithWhereUniqueWithoutOutfitInput[]
    createMany?: CalendarioCreateManyOutfitInputEnvelope
    set?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    disconnect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    delete?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    connect?: CalendarioWhereUniqueInput | CalendarioWhereUniqueInput[]
    update?: CalendarioUpdateWithWhereUniqueWithoutOutfitInput | CalendarioUpdateWithWhereUniqueWithoutOutfitInput[]
    updateMany?: CalendarioUpdateManyWithWhereWithoutOutfitInput | CalendarioUpdateManyWithWhereWithoutOutfitInput[]
    deleteMany?: CalendarioScalarWhereInput | CalendarioScalarWhereInput[]
  }

  export type OutfitCreateNestedOneWithoutPrendasInput = {
    create?: XOR<OutfitCreateWithoutPrendasInput, OutfitUncheckedCreateWithoutPrendasInput>
    connectOrCreate?: OutfitCreateOrConnectWithoutPrendasInput
    connect?: OutfitWhereUniqueInput
  }

  export type PrendaCreateNestedOneWithoutOutfitsInput = {
    create?: XOR<PrendaCreateWithoutOutfitsInput, PrendaUncheckedCreateWithoutOutfitsInput>
    connectOrCreate?: PrendaCreateOrConnectWithoutOutfitsInput
    connect?: PrendaWhereUniqueInput
  }

  export type OutfitUpdateOneRequiredWithoutPrendasNestedInput = {
    create?: XOR<OutfitCreateWithoutPrendasInput, OutfitUncheckedCreateWithoutPrendasInput>
    connectOrCreate?: OutfitCreateOrConnectWithoutPrendasInput
    upsert?: OutfitUpsertWithoutPrendasInput
    connect?: OutfitWhereUniqueInput
    update?: XOR<XOR<OutfitUpdateToOneWithWhereWithoutPrendasInput, OutfitUpdateWithoutPrendasInput>, OutfitUncheckedUpdateWithoutPrendasInput>
  }

  export type PrendaUpdateOneRequiredWithoutOutfitsNestedInput = {
    create?: XOR<PrendaCreateWithoutOutfitsInput, PrendaUncheckedCreateWithoutOutfitsInput>
    connectOrCreate?: PrendaCreateOrConnectWithoutOutfitsInput
    upsert?: PrendaUpsertWithoutOutfitsInput
    connect?: PrendaWhereUniqueInput
    update?: XOR<XOR<PrendaUpdateToOneWithWhereWithoutOutfitsInput, PrendaUpdateWithoutOutfitsInput>, PrendaUncheckedUpdateWithoutOutfitsInput>
  }

  export type UsuarioCreateNestedOneWithoutCalendariosInput = {
    create?: XOR<UsuarioCreateWithoutCalendariosInput, UsuarioUncheckedCreateWithoutCalendariosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCalendariosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type OutfitCreateNestedOneWithoutCalendariosInput = {
    create?: XOR<OutfitCreateWithoutCalendariosInput, OutfitUncheckedCreateWithoutCalendariosInput>
    connectOrCreate?: OutfitCreateOrConnectWithoutCalendariosInput
    connect?: OutfitWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutCalendariosNestedInput = {
    create?: XOR<UsuarioCreateWithoutCalendariosInput, UsuarioUncheckedCreateWithoutCalendariosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCalendariosInput
    upsert?: UsuarioUpsertWithoutCalendariosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutCalendariosInput, UsuarioUpdateWithoutCalendariosInput>, UsuarioUncheckedUpdateWithoutCalendariosInput>
  }

  export type OutfitUpdateOneRequiredWithoutCalendariosNestedInput = {
    create?: XOR<OutfitCreateWithoutCalendariosInput, OutfitUncheckedCreateWithoutCalendariosInput>
    connectOrCreate?: OutfitCreateOrConnectWithoutCalendariosInput
    upsert?: OutfitUpsertWithoutCalendariosInput
    connect?: OutfitWhereUniqueInput
    update?: XOR<XOR<OutfitUpdateToOneWithWhereWithoutCalendariosInput, OutfitUpdateWithoutCalendariosInput>, OutfitUncheckedUpdateWithoutCalendariosInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PrendaCreateWithoutUsuarioInput = {
    imagen_url?: string | null
    categoria?: string | null
    color_principal?: string | null
    estado?: string
    fecha_creacion?: Date | string
    outfits?: OutfitPrendaCreateNestedManyWithoutPrendaInput
  }

  export type PrendaUncheckedCreateWithoutUsuarioInput = {
    id?: number
    imagen_url?: string | null
    categoria?: string | null
    color_principal?: string | null
    estado?: string
    fecha_creacion?: Date | string
    outfits?: OutfitPrendaUncheckedCreateNestedManyWithoutPrendaInput
  }

  export type PrendaCreateOrConnectWithoutUsuarioInput = {
    where: PrendaWhereUniqueInput
    create: XOR<PrendaCreateWithoutUsuarioInput, PrendaUncheckedCreateWithoutUsuarioInput>
  }

  export type PrendaCreateManyUsuarioInputEnvelope = {
    data: PrendaCreateManyUsuarioInput | PrendaCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type OutfitCreateWithoutUsuarioInput = {
    nombre: string
    fecha_creacion?: Date | string
    prendas?: OutfitPrendaCreateNestedManyWithoutOutfitInput
    calendarios?: CalendarioCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUncheckedCreateWithoutUsuarioInput = {
    id?: number
    nombre: string
    fecha_creacion?: Date | string
    prendas?: OutfitPrendaUncheckedCreateNestedManyWithoutOutfitInput
    calendarios?: CalendarioUncheckedCreateNestedManyWithoutOutfitInput
  }

  export type OutfitCreateOrConnectWithoutUsuarioInput = {
    where: OutfitWhereUniqueInput
    create: XOR<OutfitCreateWithoutUsuarioInput, OutfitUncheckedCreateWithoutUsuarioInput>
  }

  export type OutfitCreateManyUsuarioInputEnvelope = {
    data: OutfitCreateManyUsuarioInput | OutfitCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type CalendarioCreateWithoutUsuarioInput = {
    fecha: Date | string
    ocasion?: string | null
    outfit: OutfitCreateNestedOneWithoutCalendariosInput
  }

  export type CalendarioUncheckedCreateWithoutUsuarioInput = {
    id?: number
    fecha: Date | string
    ocasion?: string | null
    outfitId: number
  }

  export type CalendarioCreateOrConnectWithoutUsuarioInput = {
    where: CalendarioWhereUniqueInput
    create: XOR<CalendarioCreateWithoutUsuarioInput, CalendarioUncheckedCreateWithoutUsuarioInput>
  }

  export type CalendarioCreateManyUsuarioInputEnvelope = {
    data: CalendarioCreateManyUsuarioInput | CalendarioCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type PrendaUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: PrendaWhereUniqueInput
    update: XOR<PrendaUpdateWithoutUsuarioInput, PrendaUncheckedUpdateWithoutUsuarioInput>
    create: XOR<PrendaCreateWithoutUsuarioInput, PrendaUncheckedCreateWithoutUsuarioInput>
  }

  export type PrendaUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: PrendaWhereUniqueInput
    data: XOR<PrendaUpdateWithoutUsuarioInput, PrendaUncheckedUpdateWithoutUsuarioInput>
  }

  export type PrendaUpdateManyWithWhereWithoutUsuarioInput = {
    where: PrendaScalarWhereInput
    data: XOR<PrendaUpdateManyMutationInput, PrendaUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type PrendaScalarWhereInput = {
    AND?: PrendaScalarWhereInput | PrendaScalarWhereInput[]
    OR?: PrendaScalarWhereInput[]
    NOT?: PrendaScalarWhereInput | PrendaScalarWhereInput[]
    id?: IntFilter<"Prenda"> | number
    imagen_url?: StringNullableFilter<"Prenda"> | string | null
    categoria?: StringNullableFilter<"Prenda"> | string | null
    color_principal?: StringNullableFilter<"Prenda"> | string | null
    estado?: StringFilter<"Prenda"> | string
    fecha_creacion?: DateTimeFilter<"Prenda"> | Date | string
    usuarioId?: IntFilter<"Prenda"> | number
  }

  export type OutfitUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: OutfitWhereUniqueInput
    update: XOR<OutfitUpdateWithoutUsuarioInput, OutfitUncheckedUpdateWithoutUsuarioInput>
    create: XOR<OutfitCreateWithoutUsuarioInput, OutfitUncheckedCreateWithoutUsuarioInput>
  }

  export type OutfitUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: OutfitWhereUniqueInput
    data: XOR<OutfitUpdateWithoutUsuarioInput, OutfitUncheckedUpdateWithoutUsuarioInput>
  }

  export type OutfitUpdateManyWithWhereWithoutUsuarioInput = {
    where: OutfitScalarWhereInput
    data: XOR<OutfitUpdateManyMutationInput, OutfitUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type OutfitScalarWhereInput = {
    AND?: OutfitScalarWhereInput | OutfitScalarWhereInput[]
    OR?: OutfitScalarWhereInput[]
    NOT?: OutfitScalarWhereInput | OutfitScalarWhereInput[]
    id?: IntFilter<"Outfit"> | number
    nombre?: StringFilter<"Outfit"> | string
    fecha_creacion?: DateTimeFilter<"Outfit"> | Date | string
    usuarioId?: IntFilter<"Outfit"> | number
  }

  export type CalendarioUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: CalendarioWhereUniqueInput
    update: XOR<CalendarioUpdateWithoutUsuarioInput, CalendarioUncheckedUpdateWithoutUsuarioInput>
    create: XOR<CalendarioCreateWithoutUsuarioInput, CalendarioUncheckedCreateWithoutUsuarioInput>
  }

  export type CalendarioUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: CalendarioWhereUniqueInput
    data: XOR<CalendarioUpdateWithoutUsuarioInput, CalendarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type CalendarioUpdateManyWithWhereWithoutUsuarioInput = {
    where: CalendarioScalarWhereInput
    data: XOR<CalendarioUpdateManyMutationInput, CalendarioUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type CalendarioScalarWhereInput = {
    AND?: CalendarioScalarWhereInput | CalendarioScalarWhereInput[]
    OR?: CalendarioScalarWhereInput[]
    NOT?: CalendarioScalarWhereInput | CalendarioScalarWhereInput[]
    id?: IntFilter<"Calendario"> | number
    fecha?: DateTimeFilter<"Calendario"> | Date | string
    ocasion?: StringNullableFilter<"Calendario"> | string | null
    usuarioId?: IntFilter<"Calendario"> | number
    outfitId?: IntFilter<"Calendario"> | number
  }

  export type UsuarioCreateWithoutPrendasInput = {
    username: string
    email: string
    password: string
    rol?: string
    estilo_preferido?: string | null
    fecha_registro?: Date | string
    outfits?: OutfitCreateNestedManyWithoutUsuarioInput
    calendarios?: CalendarioCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutPrendasInput = {
    id?: number
    username: string
    email: string
    password: string
    rol?: string
    estilo_preferido?: string | null
    fecha_registro?: Date | string
    outfits?: OutfitUncheckedCreateNestedManyWithoutUsuarioInput
    calendarios?: CalendarioUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutPrendasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutPrendasInput, UsuarioUncheckedCreateWithoutPrendasInput>
  }

  export type OutfitPrendaCreateWithoutPrendaInput = {
    outfit: OutfitCreateNestedOneWithoutPrendasInput
  }

  export type OutfitPrendaUncheckedCreateWithoutPrendaInput = {
    id?: number
    outfitId: number
  }

  export type OutfitPrendaCreateOrConnectWithoutPrendaInput = {
    where: OutfitPrendaWhereUniqueInput
    create: XOR<OutfitPrendaCreateWithoutPrendaInput, OutfitPrendaUncheckedCreateWithoutPrendaInput>
  }

  export type OutfitPrendaCreateManyPrendaInputEnvelope = {
    data: OutfitPrendaCreateManyPrendaInput | OutfitPrendaCreateManyPrendaInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutPrendasInput = {
    update: XOR<UsuarioUpdateWithoutPrendasInput, UsuarioUncheckedUpdateWithoutPrendasInput>
    create: XOR<UsuarioCreateWithoutPrendasInput, UsuarioUncheckedCreateWithoutPrendasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutPrendasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutPrendasInput, UsuarioUncheckedUpdateWithoutPrendasInput>
  }

  export type UsuarioUpdateWithoutPrendasInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    estilo_preferido?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: DateTimeFieldUpdateOperationsInput | Date | string
    outfits?: OutfitUpdateManyWithoutUsuarioNestedInput
    calendarios?: CalendarioUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutPrendasInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    estilo_preferido?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: DateTimeFieldUpdateOperationsInput | Date | string
    outfits?: OutfitUncheckedUpdateManyWithoutUsuarioNestedInput
    calendarios?: CalendarioUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type OutfitPrendaUpsertWithWhereUniqueWithoutPrendaInput = {
    where: OutfitPrendaWhereUniqueInput
    update: XOR<OutfitPrendaUpdateWithoutPrendaInput, OutfitPrendaUncheckedUpdateWithoutPrendaInput>
    create: XOR<OutfitPrendaCreateWithoutPrendaInput, OutfitPrendaUncheckedCreateWithoutPrendaInput>
  }

  export type OutfitPrendaUpdateWithWhereUniqueWithoutPrendaInput = {
    where: OutfitPrendaWhereUniqueInput
    data: XOR<OutfitPrendaUpdateWithoutPrendaInput, OutfitPrendaUncheckedUpdateWithoutPrendaInput>
  }

  export type OutfitPrendaUpdateManyWithWhereWithoutPrendaInput = {
    where: OutfitPrendaScalarWhereInput
    data: XOR<OutfitPrendaUpdateManyMutationInput, OutfitPrendaUncheckedUpdateManyWithoutPrendaInput>
  }

  export type OutfitPrendaScalarWhereInput = {
    AND?: OutfitPrendaScalarWhereInput | OutfitPrendaScalarWhereInput[]
    OR?: OutfitPrendaScalarWhereInput[]
    NOT?: OutfitPrendaScalarWhereInput | OutfitPrendaScalarWhereInput[]
    id?: IntFilter<"OutfitPrenda"> | number
    outfitId?: IntFilter<"OutfitPrenda"> | number
    prendaId?: IntFilter<"OutfitPrenda"> | number
  }

  export type UsuarioCreateWithoutOutfitsInput = {
    username: string
    email: string
    password: string
    rol?: string
    estilo_preferido?: string | null
    fecha_registro?: Date | string
    prendas?: PrendaCreateNestedManyWithoutUsuarioInput
    calendarios?: CalendarioCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutOutfitsInput = {
    id?: number
    username: string
    email: string
    password: string
    rol?: string
    estilo_preferido?: string | null
    fecha_registro?: Date | string
    prendas?: PrendaUncheckedCreateNestedManyWithoutUsuarioInput
    calendarios?: CalendarioUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutOutfitsInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutOutfitsInput, UsuarioUncheckedCreateWithoutOutfitsInput>
  }

  export type OutfitPrendaCreateWithoutOutfitInput = {
    prenda: PrendaCreateNestedOneWithoutOutfitsInput
  }

  export type OutfitPrendaUncheckedCreateWithoutOutfitInput = {
    id?: number
    prendaId: number
  }

  export type OutfitPrendaCreateOrConnectWithoutOutfitInput = {
    where: OutfitPrendaWhereUniqueInput
    create: XOR<OutfitPrendaCreateWithoutOutfitInput, OutfitPrendaUncheckedCreateWithoutOutfitInput>
  }

  export type OutfitPrendaCreateManyOutfitInputEnvelope = {
    data: OutfitPrendaCreateManyOutfitInput | OutfitPrendaCreateManyOutfitInput[]
    skipDuplicates?: boolean
  }

  export type CalendarioCreateWithoutOutfitInput = {
    fecha: Date | string
    ocasion?: string | null
    usuario: UsuarioCreateNestedOneWithoutCalendariosInput
  }

  export type CalendarioUncheckedCreateWithoutOutfitInput = {
    id?: number
    fecha: Date | string
    ocasion?: string | null
    usuarioId: number
  }

  export type CalendarioCreateOrConnectWithoutOutfitInput = {
    where: CalendarioWhereUniqueInput
    create: XOR<CalendarioCreateWithoutOutfitInput, CalendarioUncheckedCreateWithoutOutfitInput>
  }

  export type CalendarioCreateManyOutfitInputEnvelope = {
    data: CalendarioCreateManyOutfitInput | CalendarioCreateManyOutfitInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutOutfitsInput = {
    update: XOR<UsuarioUpdateWithoutOutfitsInput, UsuarioUncheckedUpdateWithoutOutfitsInput>
    create: XOR<UsuarioCreateWithoutOutfitsInput, UsuarioUncheckedCreateWithoutOutfitsInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutOutfitsInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutOutfitsInput, UsuarioUncheckedUpdateWithoutOutfitsInput>
  }

  export type UsuarioUpdateWithoutOutfitsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    estilo_preferido?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: DateTimeFieldUpdateOperationsInput | Date | string
    prendas?: PrendaUpdateManyWithoutUsuarioNestedInput
    calendarios?: CalendarioUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutOutfitsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    estilo_preferido?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: DateTimeFieldUpdateOperationsInput | Date | string
    prendas?: PrendaUncheckedUpdateManyWithoutUsuarioNestedInput
    calendarios?: CalendarioUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type OutfitPrendaUpsertWithWhereUniqueWithoutOutfitInput = {
    where: OutfitPrendaWhereUniqueInput
    update: XOR<OutfitPrendaUpdateWithoutOutfitInput, OutfitPrendaUncheckedUpdateWithoutOutfitInput>
    create: XOR<OutfitPrendaCreateWithoutOutfitInput, OutfitPrendaUncheckedCreateWithoutOutfitInput>
  }

  export type OutfitPrendaUpdateWithWhereUniqueWithoutOutfitInput = {
    where: OutfitPrendaWhereUniqueInput
    data: XOR<OutfitPrendaUpdateWithoutOutfitInput, OutfitPrendaUncheckedUpdateWithoutOutfitInput>
  }

  export type OutfitPrendaUpdateManyWithWhereWithoutOutfitInput = {
    where: OutfitPrendaScalarWhereInput
    data: XOR<OutfitPrendaUpdateManyMutationInput, OutfitPrendaUncheckedUpdateManyWithoutOutfitInput>
  }

  export type CalendarioUpsertWithWhereUniqueWithoutOutfitInput = {
    where: CalendarioWhereUniqueInput
    update: XOR<CalendarioUpdateWithoutOutfitInput, CalendarioUncheckedUpdateWithoutOutfitInput>
    create: XOR<CalendarioCreateWithoutOutfitInput, CalendarioUncheckedCreateWithoutOutfitInput>
  }

  export type CalendarioUpdateWithWhereUniqueWithoutOutfitInput = {
    where: CalendarioWhereUniqueInput
    data: XOR<CalendarioUpdateWithoutOutfitInput, CalendarioUncheckedUpdateWithoutOutfitInput>
  }

  export type CalendarioUpdateManyWithWhereWithoutOutfitInput = {
    where: CalendarioScalarWhereInput
    data: XOR<CalendarioUpdateManyMutationInput, CalendarioUncheckedUpdateManyWithoutOutfitInput>
  }

  export type OutfitCreateWithoutPrendasInput = {
    nombre: string
    fecha_creacion?: Date | string
    usuario: UsuarioCreateNestedOneWithoutOutfitsInput
    calendarios?: CalendarioCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUncheckedCreateWithoutPrendasInput = {
    id?: number
    nombre: string
    fecha_creacion?: Date | string
    usuarioId: number
    calendarios?: CalendarioUncheckedCreateNestedManyWithoutOutfitInput
  }

  export type OutfitCreateOrConnectWithoutPrendasInput = {
    where: OutfitWhereUniqueInput
    create: XOR<OutfitCreateWithoutPrendasInput, OutfitUncheckedCreateWithoutPrendasInput>
  }

  export type PrendaCreateWithoutOutfitsInput = {
    imagen_url?: string | null
    categoria?: string | null
    color_principal?: string | null
    estado?: string
    fecha_creacion?: Date | string
    usuario: UsuarioCreateNestedOneWithoutPrendasInput
  }

  export type PrendaUncheckedCreateWithoutOutfitsInput = {
    id?: number
    imagen_url?: string | null
    categoria?: string | null
    color_principal?: string | null
    estado?: string
    fecha_creacion?: Date | string
    usuarioId: number
  }

  export type PrendaCreateOrConnectWithoutOutfitsInput = {
    where: PrendaWhereUniqueInput
    create: XOR<PrendaCreateWithoutOutfitsInput, PrendaUncheckedCreateWithoutOutfitsInput>
  }

  export type OutfitUpsertWithoutPrendasInput = {
    update: XOR<OutfitUpdateWithoutPrendasInput, OutfitUncheckedUpdateWithoutPrendasInput>
    create: XOR<OutfitCreateWithoutPrendasInput, OutfitUncheckedCreateWithoutPrendasInput>
    where?: OutfitWhereInput
  }

  export type OutfitUpdateToOneWithWhereWithoutPrendasInput = {
    where?: OutfitWhereInput
    data: XOR<OutfitUpdateWithoutPrendasInput, OutfitUncheckedUpdateWithoutPrendasInput>
  }

  export type OutfitUpdateWithoutPrendasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutOutfitsNestedInput
    calendarios?: CalendarioUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateWithoutPrendasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    calendarios?: CalendarioUncheckedUpdateManyWithoutOutfitNestedInput
  }

  export type PrendaUpsertWithoutOutfitsInput = {
    update: XOR<PrendaUpdateWithoutOutfitsInput, PrendaUncheckedUpdateWithoutOutfitsInput>
    create: XOR<PrendaCreateWithoutOutfitsInput, PrendaUncheckedCreateWithoutOutfitsInput>
    where?: PrendaWhereInput
  }

  export type PrendaUpdateToOneWithWhereWithoutOutfitsInput = {
    where?: PrendaWhereInput
    data: XOR<PrendaUpdateWithoutOutfitsInput, PrendaUncheckedUpdateWithoutOutfitsInput>
  }

  export type PrendaUpdateWithoutOutfitsInput = {
    imagen_url?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    color_principal?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutPrendasNestedInput
  }

  export type PrendaUncheckedUpdateWithoutOutfitsInput = {
    id?: IntFieldUpdateOperationsInput | number
    imagen_url?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    color_principal?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: IntFieldUpdateOperationsInput | number
  }

  export type UsuarioCreateWithoutCalendariosInput = {
    username: string
    email: string
    password: string
    rol?: string
    estilo_preferido?: string | null
    fecha_registro?: Date | string
    prendas?: PrendaCreateNestedManyWithoutUsuarioInput
    outfits?: OutfitCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutCalendariosInput = {
    id?: number
    username: string
    email: string
    password: string
    rol?: string
    estilo_preferido?: string | null
    fecha_registro?: Date | string
    prendas?: PrendaUncheckedCreateNestedManyWithoutUsuarioInput
    outfits?: OutfitUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutCalendariosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutCalendariosInput, UsuarioUncheckedCreateWithoutCalendariosInput>
  }

  export type OutfitCreateWithoutCalendariosInput = {
    nombre: string
    fecha_creacion?: Date | string
    usuario: UsuarioCreateNestedOneWithoutOutfitsInput
    prendas?: OutfitPrendaCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUncheckedCreateWithoutCalendariosInput = {
    id?: number
    nombre: string
    fecha_creacion?: Date | string
    usuarioId: number
    prendas?: OutfitPrendaUncheckedCreateNestedManyWithoutOutfitInput
  }

  export type OutfitCreateOrConnectWithoutCalendariosInput = {
    where: OutfitWhereUniqueInput
    create: XOR<OutfitCreateWithoutCalendariosInput, OutfitUncheckedCreateWithoutCalendariosInput>
  }

  export type UsuarioUpsertWithoutCalendariosInput = {
    update: XOR<UsuarioUpdateWithoutCalendariosInput, UsuarioUncheckedUpdateWithoutCalendariosInput>
    create: XOR<UsuarioCreateWithoutCalendariosInput, UsuarioUncheckedCreateWithoutCalendariosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutCalendariosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutCalendariosInput, UsuarioUncheckedUpdateWithoutCalendariosInput>
  }

  export type UsuarioUpdateWithoutCalendariosInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    estilo_preferido?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: DateTimeFieldUpdateOperationsInput | Date | string
    prendas?: PrendaUpdateManyWithoutUsuarioNestedInput
    outfits?: OutfitUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutCalendariosInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    estilo_preferido?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: DateTimeFieldUpdateOperationsInput | Date | string
    prendas?: PrendaUncheckedUpdateManyWithoutUsuarioNestedInput
    outfits?: OutfitUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type OutfitUpsertWithoutCalendariosInput = {
    update: XOR<OutfitUpdateWithoutCalendariosInput, OutfitUncheckedUpdateWithoutCalendariosInput>
    create: XOR<OutfitCreateWithoutCalendariosInput, OutfitUncheckedCreateWithoutCalendariosInput>
    where?: OutfitWhereInput
  }

  export type OutfitUpdateToOneWithWhereWithoutCalendariosInput = {
    where?: OutfitWhereInput
    data: XOR<OutfitUpdateWithoutCalendariosInput, OutfitUncheckedUpdateWithoutCalendariosInput>
  }

  export type OutfitUpdateWithoutCalendariosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutOutfitsNestedInput
    prendas?: OutfitPrendaUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateWithoutCalendariosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    prendas?: OutfitPrendaUncheckedUpdateManyWithoutOutfitNestedInput
  }

  export type PrendaCreateManyUsuarioInput = {
    id?: number
    imagen_url?: string | null
    categoria?: string | null
    color_principal?: string | null
    estado?: string
    fecha_creacion?: Date | string
  }

  export type OutfitCreateManyUsuarioInput = {
    id?: number
    nombre: string
    fecha_creacion?: Date | string
  }

  export type CalendarioCreateManyUsuarioInput = {
    id?: number
    fecha: Date | string
    ocasion?: string | null
    outfitId: number
  }

  export type PrendaUpdateWithoutUsuarioInput = {
    imagen_url?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    color_principal?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    outfits?: OutfitPrendaUpdateManyWithoutPrendaNestedInput
  }

  export type PrendaUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    imagen_url?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    color_principal?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    outfits?: OutfitPrendaUncheckedUpdateManyWithoutPrendaNestedInput
  }

  export type PrendaUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    imagen_url?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    color_principal?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutfitUpdateWithoutUsuarioInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    prendas?: OutfitPrendaUpdateManyWithoutOutfitNestedInput
    calendarios?: CalendarioUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    prendas?: OutfitPrendaUncheckedUpdateManyWithoutOutfitNestedInput
    calendarios?: CalendarioUncheckedUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarioUpdateWithoutUsuarioInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ocasion?: NullableStringFieldUpdateOperationsInput | string | null
    outfit?: OutfitUpdateOneRequiredWithoutCalendariosNestedInput
  }

  export type CalendarioUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ocasion?: NullableStringFieldUpdateOperationsInput | string | null
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type CalendarioUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ocasion?: NullableStringFieldUpdateOperationsInput | string | null
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitPrendaCreateManyPrendaInput = {
    id?: number
    outfitId: number
  }

  export type OutfitPrendaUpdateWithoutPrendaInput = {
    outfit?: OutfitUpdateOneRequiredWithoutPrendasNestedInput
  }

  export type OutfitPrendaUncheckedUpdateWithoutPrendaInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitPrendaUncheckedUpdateManyWithoutPrendaInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitPrendaCreateManyOutfitInput = {
    id?: number
    prendaId: number
  }

  export type CalendarioCreateManyOutfitInput = {
    id?: number
    fecha: Date | string
    ocasion?: string | null
    usuarioId: number
  }

  export type OutfitPrendaUpdateWithoutOutfitInput = {
    prenda?: PrendaUpdateOneRequiredWithoutOutfitsNestedInput
  }

  export type OutfitPrendaUncheckedUpdateWithoutOutfitInput = {
    id?: IntFieldUpdateOperationsInput | number
    prendaId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitPrendaUncheckedUpdateManyWithoutOutfitInput = {
    id?: IntFieldUpdateOperationsInput | number
    prendaId?: IntFieldUpdateOperationsInput | number
  }

  export type CalendarioUpdateWithoutOutfitInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ocasion?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: UsuarioUpdateOneRequiredWithoutCalendariosNestedInput
  }

  export type CalendarioUncheckedUpdateWithoutOutfitInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ocasion?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: IntFieldUpdateOperationsInput | number
  }

  export type CalendarioUncheckedUpdateManyWithoutOutfitInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    ocasion?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}