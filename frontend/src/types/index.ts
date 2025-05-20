export type { CartItem, CartItemForBackend, CartState } from '#src/types/cart';
export type { ApiErrorResponse } from '#src/types/error';
export type { LoginCredentials, LoginPayload } from '#src/types/login';
export type { NewOrder, OrderInDb, OrderFromBackend } from '#src/types/orders';
export type {
  BaseProduct,
  Mobile,
  FurnitureItem,
  Laptop,
  Product,
  NewProduct,
  EditedProduct,
  ProductCategory,
  ProductQuery,
  ProductFilterState,
  ProductSortOption
} from './products';

export type { Review, ReviewFromBackend, NewReview } from '#src/types/reviews';
export type { NewUser, UserFromBackend } from '#src/types/users';

// Types for React components
export type { ItemToDelete } from '#src/types/Components/Admin/types';
export type { CheckoutFormValues } from '#src/types/Components/Checkout/types';
export type { ProductSortDropdownValue } from '#src/types/Components/Products/types';
export type { ReviewFormValues } from '#src/types/Components/ReviewForm';

// Types for React Context
export type {
  CartContextAction,
  CartContextType
} from '#src/types/Context/CartContext';

export type {
  ProductContextAction,
  ProductContextType
} from '#src/types/Context/ProductContext';

export type {
  ToastStateType,
  ToastActionType,
  ToastContextType
} from '#src/types/Context/ToastContext';
