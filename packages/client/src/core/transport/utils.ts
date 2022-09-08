import { Ticker } from 'modules/ticker/types/Ticker';

export function removeCarriageReturn(str: string) {
  return str.replace(/[\n\r]/g, '');
}

export function fromStringToArray(str: string) {
  return removeCarriageReturn(str).split(',');
}

export function isHeaderRow(headerRowData: Ticker[]) {
  return Array.isArray(headerRowData) && headerRowData[0] === 'contract_name';
}
