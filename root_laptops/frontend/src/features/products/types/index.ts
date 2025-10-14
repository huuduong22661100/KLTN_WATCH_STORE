export interface ProductImage {
  url: string;
  alt_text: string;
  _id?: string;
}

export interface ProductDescription {
  _id?: string;
  title: string;
  description: string;
}

export interface ProductCategory {
  _id: string;
  id: number;
  category: string;
}

export interface ProductColor {
  _id: string;
  id: number;
  color: string;
}

export interface Product {
  _id: string;
  id: number;
  title: string;
  description: ProductDescription[];
  price: number;
  sku: string;
  images: {
    mainImg: ProductImage;
    sliderImg: ProductImage[];
  };
  specifications: {
    [key: string]: string;
  };
  color_id: ProductColor;
  brand: string;
  category_id: ProductCategory[];
  tags: string[];
  gender: string;
  origin: string;
}
export interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}