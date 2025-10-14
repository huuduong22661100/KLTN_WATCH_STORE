export interface News {
  _id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail_img: string;
  author_id: string; // Assuming this is an ObjectId represented as a string
  createdAt: string;
  updatedAt: string;
}
