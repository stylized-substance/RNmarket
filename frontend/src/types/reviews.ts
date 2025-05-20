export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
}

export type ReviewFromBackend = Review & {
  ProductId: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
};

export type NewReview = Omit<Review, 'id' | 'user_id' | 'name'>;
