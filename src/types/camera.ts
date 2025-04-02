export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  previewImg: string;
  level: string;
  price: number;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  rating: number;
  reviewCount: number;
}

export type Review = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  createAt: string;
  cameraId: number;
};

export type ReviewAdapt = Omit<Review, 'createAt'> & { createAt: Date };

export type ReviewsAdapt = ReviewAdapt[];

export type Reviews = Review[];

export type Cameras = Camera[];

export type Promo = Pick<Camera, 'id'| 'name'| 'previewImg'| 'previewImg2x'| 'previewImgWebp'| 'previewImgWebp2x'>;
