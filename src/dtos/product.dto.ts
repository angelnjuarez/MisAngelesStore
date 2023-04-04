export interface ProductDto {
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: string;
}

export interface UpadateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
  image?: string;
  category?: string;
}
