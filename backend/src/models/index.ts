import Product from './product';
import Review from './review';
import User from './user';
import RefreshToken from './refreshtoken';
import Order from './order';

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(RefreshToken);
RefreshToken.belongsTo(User);

Product.belongsToMany(Order, { through: 'ProductOrders'} );
Order.belongsToMany(Product, { through: 'ProductOrders' });

export { Product, Review, User, RefreshToken, Order };
