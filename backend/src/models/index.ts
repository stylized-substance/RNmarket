import Product from '#src/models/product';
import Review from '#src/models/review';
import User from '#src/models/user';

Product.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(User);
Review.belongsTo(Product)

export { Product, Review, User };
