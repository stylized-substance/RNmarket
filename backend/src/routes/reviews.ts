import { Request, Response, Router } from 'express';
import Review from '#src/models/review';
import { Op } from 'sequelize';

const router = Router();

// Get reviews for user based on database primary key
router.get('/', async (req: Request, res: Response) => {
  if (req.query.user_id) {
    const reviews: Review[] = await Review.findAll({
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
