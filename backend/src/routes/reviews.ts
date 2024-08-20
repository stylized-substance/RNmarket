import { Request, Response, Router } from 'express';
import { Review as ReviewModel } from '#src/models/';
import { Op } from 'sequelize';
import { parseString } from '#src/utils/typeNarrowers';

const router: Router = Router();

// Get reviews for user based on database primary key
router.get('/', async (req: Request, res: Response) => {
  const user_id: string = parseString(req.query.user_id)
  if (user_id) {
    const reviews: ReviewModel[] | [] = await ReviewModel.findAll({
      where: {
        user_id: {
          [Op.eq]: req.query.user_id
        }
      }
    });
    if (reviews && reviews.length > 0) {
      res.json(reviews);
    } else {
      res.status(404).send('No reviews found');
    }
  } else {
    res.status(400).send('user_id query parameter missing');
  }
});

export default router;
