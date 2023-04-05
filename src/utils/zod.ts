export function toNumber(str: unknown) {
  if (typeof str === "number") {
    return str;
  }
  if (!str) return undefined;
  str = parseFloat(str as string) || undefined;

  if (typeof str !== "number") {
    throw new TypeError("Value is not a number");
  }

  return str;
}

// export function toDate(str: unknown) {
//   if (typeof str === typeof new Date()) {
//     return str;
//   }

//   return str? new Date(str): unde
// }
