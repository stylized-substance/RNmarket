import { NewOrder } from '#src/types';

export type CartItems = Pick<NewOrder, 'products'>;
