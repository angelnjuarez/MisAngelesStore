import { getProductPrice, exportToExcel } from './services/products.service';

const precios = getProductPrice('/home/anjuarez/Descargas/PreciosMerceria.xlsx', 100, true);
exportToExcel(precios, '/home/anjuarez/Escritorio/precios.xlsx');
