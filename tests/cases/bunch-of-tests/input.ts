type GetToken = () => string;
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