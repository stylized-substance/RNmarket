export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
};

export type NewReview = Omit<Review, 'id' | 'user_id' | 'name'>;

export type EditedReview = Pick<Review, 'title' | 'content' | 'rating'>;
