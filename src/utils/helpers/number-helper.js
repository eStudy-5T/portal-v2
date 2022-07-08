export function numberWithCommas(x) {
  return Number(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}