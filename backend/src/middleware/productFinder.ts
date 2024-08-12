import { Product as ProductModel } from '#src/models';
import { Op } from 'sequelize';
import { Product } from '#src/types/types';

const productFinder = async (product: Product) => {
  const productInDatabase = await ProductModel.findOne({
    where: {
      title: {
        [Op.eq]: product.title
      }
    }
  });
  // console.log(productInDatabase)
  return productInDatabase;
};

export default productFinder;
