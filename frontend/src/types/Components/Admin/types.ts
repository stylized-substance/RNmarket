// Type for deleting items from backend on Admin page
export interface ItemToDelete {
  type: 'products' | 'users' | 'orders';
  id: string;
}
