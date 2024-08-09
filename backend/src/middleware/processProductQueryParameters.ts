import { Request, Response, NextFunction } from 'express';
import {
  isNumber,
  isString,
  parseProductCategory
} from '#src/utils/typeNarrowers';
import { Review } from '#src/models';
import { ProductSearchParameters } from '#src/types/types';
import { Op } from 'sequelize';

const processProductQueryParameters = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const searchParameters: ProductSearchParameters = {};
  let where = {};

  const {
    limit,
    withReviews,
    category,
    id,
    search,
    lowestPrice,
    highestPrice,
    inStock,
    lowestRating,
    highestRating
  } = req.query;

  // Limit number of products returned
  if (limit) {
    if (isNumber(limit)) {
      searchParameters.limit = limit;
    } else {
      return res.status(400).send('Invalid product query limit');
    }
  }

  // Include product reviews if requested
  if (withReviews) {
    if (withReviews === 'true') {
      searchParameters.include = {
        model: Review
      };
    } else {
      return res
        .status(400)
        .send(`Value for 'withReviews' must be 'true' if used`);
    }
  }

  // Filter products by category
  if (category) {
    const parsedCategory = parseProductCategory(category);
    if (parsedCategory) {
      where = {
        category: {
          [Op.eq]: category
        }
      };
    } else {
      return res.status(400).send('Invalid product category');
    }
  }
  
  // Find product by ID
  if (id) {
    if (isString(id)) {
      where = {
        ...where,
        id: {
          [Op.eq]: id
        }
      };
    } else {
      return res.status(400).send('Invalid product ID');
    }
  }

  // Filter product titles by case insensitive search keyword
  if (search) {
    if (isString(search) && search.length <= 15) {
      where = {
        ...where,
        title: {
          [Op.iLike]: `%${search}%`
        }
      };
    } else {
      return res.status(400).send('Invalid search query');
    }
  }

  // Filter products by price
  if (lowestPrice && !highestPrice) {
    return res.status(400).send('Highest value in price range query missing');
  }

  if (!lowestPrice && highestPrice) {
    return res.status(400).send('Lowest value in price range query missing');
  }

  if (lowestPrice && highestPrice) {
    if (
      !(isNumber(lowestPrice) && lowestPrice >= 0 && lowestPrice <= 1000000)
    ) {
      return res.status(400).send('Invalid lowest price query');
    }

    if (
      !(isNumber(highestPrice) && highestPrice >= 0 && highestPrice <= 1000000)
    ) {
      return res.status(400).send('Invalid highest price query');
    }

    where = {
      ...where,
      price: {
        [Op.between]: [lowestPrice, highestPrice]
      }
    };
  }

  // Only return products that are in stock
  if (inStock) {
    if (inStock === 'true') {
      where = {
        ...where,
        instock: {
          [Op.gt]: 0
        }
      };
    } else {
      return res.status(400).send(`Value for 'inStock' must be 'true' if used`);
    }
  }

  // Filter products by rating
  if (lowestRating && !highestRating) {
    return res.status(400).send('Highest value in rating range query missing');
  }

  if (!lowestRating && highestRating) {
    return res.status(400).send('Lowest value in rating range query missing');
  }

  if (lowestRating && highestRating) {
    if (!(isNumber(lowestRating) && lowestRating >= 1 && lowestRating <= 5)) {
      return res.status(400).send('Invalid lowest rating query');
    }

    if (
      !(isNumber(highestRating) && highestRating >= 1 && highestRating <= 5)
    ) {
      return res.status(400).send('Invalid highest rating query');
    }

    where = {
      ...where,
      rating: {
        [Op.between]: [lowestRating, highestRating]
      }
    };
  }

  // Add search parameters to request object
  searchParameters.where = where;
  req.searchParameters = searchParameters;

  next();
  return;
};

export { processProductQueryParameters };
