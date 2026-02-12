// Review/Comment types

export interface Review {
  id: string;
  code: string;
  reviewer: string;
  reviewContent: string;
  materialId: string;
  materialTitle: string;
  rating: number; // 1-5 stars
  createdDate: string;
  actions?: string;
}

export type ReviewStatus = 'active' | 'deleted';
