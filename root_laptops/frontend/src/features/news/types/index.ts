export interface News {
  _id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail_img: string;
  author_id: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NewsListResponse {
  success: boolean;
  data: News[];
}

export interface NewsDetailResponse {
  success: boolean;
  data: News;
}
