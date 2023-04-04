import * as XLSX from 'xlsx';
import { UpadateProductDto } from '../dtos/product.dto';

export const getProductPrice = (
  filePath: string,
  porcentGanancia: number
): UpadateProductDto[] => {
  //Obtengo el workBook, luego el nombre de la hoja y luego la hoja
  const workBook = XLSX.readFile(filePath);
  const sheetName = workBook.SheetNames[0];
  const workSheet = workBook.Sheets[sheetName];
  const products: UpadateProductDto[] = [];

  let rowIndex = 2;
  while (true) {
    const productNameCeld = workSheet[`A${rowIndex}`];
    const productCostCeld = workSheet[`BE${rowIndex}`];

    if (!productNameCeld || !productCostCeld) {
      break;
    }

    const productName = productNameCeld.v as string;
    const productCost = productCostCeld.v as number;

    const salePrice = calculatePrice(productCost, porcentGanancia);
    const product: UpadateProductDto = {
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

export const exportToExcel = (products: UpadateProductDto[], filePath: string) => {
  const workSheet = XLSX.utils.json_to_sheet(products);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'Productos');
  XLSX.writeFile(workBook, filePath);
};
