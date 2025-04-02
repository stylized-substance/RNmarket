import Product from '#src/models/product';
import Review from '#src/models/review';
import User from '#src/models/user';
import RefreshToken from '#src/models/refreshtoken';
import Order from '#src/models/order';
import ProductOrder from '#src/models/productorder';

Product.hasMany(Review, {
  // Automatically delete reviews when product is deleted
  onDelete: 'CASCADE'
});
Review.belongsTo(Product);

User.hasMany(Review, {
  // Automatically delete reviews when user is deleted
  onDelete: 'CASCADE'
});
Review.belongsTo(User);

User.hasMany(RefreshToken, {
  // Automatically delete refresh tokens when user is deleted
  onDelete: 'CASCADE'
});
RefreshToken.belongsTo(User);

Product.belongsToMany(Order, { through: ProductOrder });
Order.belongsToMany(Product, { through: ProductOrder });

export { Product, ProductOrder, Review, User, RefreshToken, Order };
