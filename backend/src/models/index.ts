import Product from './product';
import Review from './review';
import User from './user';
import RefreshToken from './refreshtoken';
import Order from './order';
import ProductOrder from './productorder';

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(RefreshToken);
RefreshToken.belongsTo(User);

Product.belongsToMany(Order, { through: ProductOrder} );
Order.belongsToMany(Product, { through: ProductOrder });

export { Product, Review, User, RefreshToken, Order };
