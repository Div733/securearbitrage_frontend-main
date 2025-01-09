const BASE_OF_SIX = 1_000_000;

///
/// This function convert the non-parsed tokens amount to readable amount
///
export function e6sToHuman(num) {
  return num / BASE_OF_SIX;
}

///
/// This function convert the readable amount to non-parsed amount
///
export function humanToE6s(num) {
  return num * BASE_OF_SIX;
}
