import { Request, Response, NextFunction } from 'express'
import { isNumber } from '#src/utils/typeNarrowers';
import { Review } from '#src/models';

// Type definitions

interface SearchParameters {
  limit?: number,
  include?: object
}

interface RequestWithSearchParameters extends Request {
  searchParameters: SearchParameters
}

const processProductQueryParameters = (req: RequestWithSearchParameters, res: Response, next: NextFunction) => {
  const searchParameters: SearchParameters = {}

  // Limit number of products returned
  if (req.query.limit) {
    if (isNumber(req.query.limit)) {
      searchParameters.limit = req.query.limit;
    } else {
      res.status(400).send('Invalid query limit')
    }
  }

  // Include product reviews if requested
  if (req.query.withReviews === 'true') {
    searchParameters.include = {
      model: Review
    }
  }

  req.searchParameters = searchParameters

  next()
}

export { processProductQueryParameters }