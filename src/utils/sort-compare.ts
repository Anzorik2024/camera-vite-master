import { ReviewAdapt } from '../types/camera';

export const sortReviewByTime = (a: ReviewAdapt, b: ReviewAdapt): number => b.createAt.getTime() - a.createAt.getTime();
