export function removeCarriageReturn(str: string) {
  return str.replace(/[\n\r]/g, '');
}

export function fromStringToArray(str: string) {
  return removeCarriageReturn(str).split(',');
}
