import { Request, Response, NextFunction } from 'express';
import { isNumber, parseCategory } from '#src/utils/typeNarrowers';
import { Review } from '#src/models';
import { ProductSearchParameters } from '#src/types/types'
import { Op } from 'sequelize'

const processProductQueryParameters = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const searchParameters: ProductSearchParameters = {};

  const { limit, category } = req.query

  // Limit number of products returned
  if (limit) {
    if (isNumber(limit)) {
      searchParameters.limit = limit;
    } else {
      res.status(400).send('Invalid product query limit');
    }
  }

  // Include product reviews if requested
  if (req.query.withReviews === 'true') {
    searchParameters.include = {
      model: Review
    };
  }

  // Filter products by category
  if (category && parseCategory(category)) {
    searchParameters.where = {
      category: {
        [Op.eq]: category
      }
    }
  }

  // Add search parameters to request object
  req.searchParameters = searchParameters;

  next();
};

export { processProductQueryParameters };
