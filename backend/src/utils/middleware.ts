import { Request, Response, NextFunction } from 'express';
import { isNumber, isString, parseCategory } from '#src/utils/typeNarrowers';
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

  const { limit, category, withReviews, search } = req.query;

  // Limit number of products returned
  if (limit) {
    if (isNumber(limit)) {
      searchParameters.limit = limit;
    } else {
      res.status(400).send('Invalid product query limit');
    }
  }

  // Include product reviews if requested
  if (withReviews) {
    if (withReviews === 'true') {
      searchParameters.include = {
        model: Review
      };
    } else {
      res.status(400).send(`Value for 'withReviews' must be 'true' if used`);
    }
  }

  // Filter products by category
  if (category) {
    if (parseCategory(category)) {
      where = {
        category: {
          [Op.eq]: category
        }
      };
    } else {
      res.status(400).send('Invalid product category');
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
      res.status(400).send('Invalid search query');
    }
  }

  // Add search parameters to request object
  searchParameters.where = where;
  req.searchParameters = searchParameters;

  next();
};

export { processProductQueryParameters };
