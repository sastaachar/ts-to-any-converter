export function getToken(a: string[]) {
  return "token";
}

export function getPhone(type: string, number: string) {
  return { type, number };
}

export function getAddress(street: string, state: string, zip: { code: string, country: { name: string, code: string } }, city?: string) {
  return { street, city, state, zip };
} 

enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

function getToken(a: string[]) {
  return "token";
}

function getPhone(type: string, number: string) {
  return { type, number };
}

function getAddress(street: string, state: string, zip: { code: string, country: { name: string, code: string } }, city?: string) {
  return { street, city, state, zip };
}

// Unions

interface ToSkip {
  skip: string;
}

interface ToSkip2 {
  skip2: ToSkip;
}

interface GrandParent {
  fromGrandParent: "string" | "";
}

interface Base extends GrandParent {
  age?: {
    unit: string;
    value?: number;
  };
  address: {
    street?: string | null | undefined | number | boolean | string[] | { a: string }[] | { c: string } | { b: string };
    city: string;
    state: string;
    zip: string;
  };
}

interface MyUser extends Omit<Base, 'address'> {
  email: string;
  phone: string;
}
interface WhatsUp {
  address: {
    street: string;
    city?: string;
    state: string;
    zip: {
      code: string;
      country: {
        name: string;
        code: string;
      };
    };
  };
  phone: {
    number: string;
    type: string;
  };
  email: string;
  test: number;
  getToken: (a: string[]) => string; 
  customType: string | number;
  status: UserStatus;
  statusAll: UserStatus[];
  statusAll2: { status: UserStatus }[];
}
enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

function getToken(a: string[]) {
  return "token";
}

function getPhone(type: string, number: string) {
  return { type, number };
}

function getAddress(street: string, state: string, zip: { code: string, country: { name: string, code: string } }, city?: string) {
  return { street, city, state, zip };
}

// Unions

interface ToSkip {
  skip: string;
}

interface ToSkip2 {
  skip2: ToSkip;
}

interface GrandParent {
  fromGrandParent: "string" | "";
}

interface Base extends GrandParent {
  age?: {
    unit: string;
    value?: number;
  };
  address: {
    street?: string | null | undefined | number | boolean | string[] | { a: string }[] | { c: string } | { b: string };
    city: string;
    state: string;
    zip: string;
  };
}

interface MyUser extends Omit<Base, 'address'> {
  email: string;
  phone: string;
}

// Functions ignore type

interface MyFunctionInter {
  getToken: (a: string[]) => string;
  test: (a: string) => string;
  lol: string;
}

interface MyFunctionInter2 {
  test: number;
  ok: MyFunctionInter;  
}


