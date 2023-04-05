export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
  image?: string;
  category?: string;
}