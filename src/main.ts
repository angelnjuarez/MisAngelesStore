import { getProductPrice, exportToExcel } from './app/precios';

const precios = getProductPrice('/home/anjuarez/Descargas/precios.xls', 40);
exportToExcel(precios, '/home/anjuarez/Escritorio/precios.xlsx');
