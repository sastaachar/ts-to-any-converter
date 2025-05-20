export function getToken(a: string[]) {
  return "token";
}

export function getPhone(type: string, number: string) {
  return { type, number };
}

export function getAddress(street: string, state: string, zip: { code: string, country: { name: string, code: string } }, city?: string) {
  return { street, city, state, zip };
} 