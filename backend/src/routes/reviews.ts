import { Request, Response, Router } from 'express';
import { Review as ReviewModel } from '#src/models/';
import { Op } from 'sequelize';
import { parseString, toNewReview } from '#src/utils/typeNarrowers';
import tokenExtractor from '#src/middleware/tokenExtractor';
import { NewReview } from '#src/types/types';

const router: Router = Router();

// Get reviews
router.get('/', async (req: Request, res: Response) => {
  if (Object.keys(req.query).length === 0) {
    return res.status(400).json('Query parameter missing');
  }

  // Get reviews for user
  const user_id: string | undefined = req.query.user_id
    ? parseString(req.query.user_id)
    : undefined;
  const product_id: string | undefined = req.query.product_id
    ? parseString(req.query.product_id)
    : undefined;
  let reviews: ReviewModel[] | [] = [];

  if (user_id) {
    reviews = await ReviewModel.findAll({
      where: {
        user_id: {
          [Op.eq]: user_id
        }
      }
    });
  }

  // Get reviews for product
  if (product_id) {
    reviews = await ReviewModel.findAll({
      where: {
        product_id: {
          [Op.eq]: product_id
        }
      }
    });
  }

  if (reviews && reviews.length > 0) {
    return res.json(reviews);
  } else {
    return res.status(404).json('No reviews found');
  }
});

// Add new review

router.post('/', tokenExtractor, async (req: Request, res: Response) => {
  // if (!req.verifiedToken) {
  //   res.status(400).json('Only logged in users can add reviews')
  // }

  const newReview: NewReview = toNewReview(req.body)
  newReview
})

export default router;
