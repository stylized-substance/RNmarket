export type { EnvVariables } from '#src/types/config/envConfig';

export type {
  BaseProduct,
  Mobile,
  FurnitureItem,
  Laptop,
  Product,
  ProductWithoutReviews,
  ProductSearchParameters,
  ProductQueryParameters
} from '#src/types/products';

// Enum type exported without type keyword so it can be used at runtime
export { ProductCategory } from '#src/types/products';

export type { LoginPayload, RefreshToken } from '#src/types/login';

export type {
  NewOrder,
  OrderInDb,
  OrderFromDb,
  OrderForFrontend
} from '#src/types/orders';

export type { CartItems } from '#src/types/cart';

export type { Review, NewReview, EditedReview } from '#src/types/reviews';

export type { User, UserWithoutHash, NewUser } from '#src/types/users';
