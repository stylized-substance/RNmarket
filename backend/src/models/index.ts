import Product from '#src/models/product';
import Review from '#src/models/review';
import User from '#src/models/user';
import RefreshToken from './refreshtoken';

Product.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(User);
RefreshToken.belongsTo(User);
User.hasOne(RefreshToken);

export { Product, Review, User, RefreshToken };
