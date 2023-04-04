import { getProductPrice, exportToExcel } from './controllers/price';

const precios = getProductPrice('/home/anjuarez/Descargas/precios.xls', 40);
exportToExcel(precios, '/home/anjuarez/Escritorio/precios.xlsx');
