export interface IMe {
  memberId: number;
  email: string;
  profile: {
    name: string;
    phone: {
      country: string;
      calling: string;
      phone: string;
    };
    imageUrl: string;
  };
  business: {
    title: string;
    role: string;
    count: {
      screen: number;
    };
    permissions: {
      group: string;
      types: string[];
    }[];
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postalCode: string;
      state: string;
    };
    phone: {
      country: string;
      calling: string;
      phone: string;
    };
  };
  authorization: {
    accessToken: string;
  };
}
