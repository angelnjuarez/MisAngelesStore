import * as XLSX from 'xlsx';
import { Product } from './product.dto';

export const getProductPrice = (
  filePath: string,
  porcentGanancia: number
): Product[] => {
  //Obtengo el libro, luego el nombre de la hoja y luego la hoja
  const libro = XLSX.readFile(filePath);
  const sheetName = libro.SheetNames[0];
  const holaCalculo = libro.Sheets[sheetName];
  const products: Product[] = [];

  let rowIndex = 2;
  while (true) {
    const productNameCeld = holaCalculo[`A${rowIndex}`];
    const productCostCeld = holaCalculo[`BE${rowIndex}`];

    if (!productNameCeld || !productCostCeld) {
      break;
    }

    const productName = productNameCeld.v as string;
    const productCost = productCostCeld.v as number;

    const salePrice = calculatePrice(productCost, porcentGanancia);
    const product: Product = {
      name: productName,
      price: salePrice,
    };

    products.push(product);
    rowIndex++;
  }

  return products;
};

const calculatePrice = (cost: number, gain: number): number => {
  const price = ((cost * (1 + gain / 100) * 1.105) / 10).toFixed(2)
  return parseFloat(price) * 10;
};

export const exportToExcel = (products: Product[], filePath: string) => {
  const holaCalculo = XLSX.utils.json_to_sheet(products);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, holaCalculo, 'Productos');
  XLSX.writeFile(libro, filePath);
};
