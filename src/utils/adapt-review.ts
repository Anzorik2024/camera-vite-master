import { Review, ReviewAdapt } from '../types/camera';

export const adaptReview = (review: Review): ReviewAdapt => ({
  ...review,
  createAt: new Date(review.createAt)
});
