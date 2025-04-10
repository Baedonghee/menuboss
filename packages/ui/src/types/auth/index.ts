export interface IJoinAndLogin {
  accessToken: string;
}

export interface IGoogle {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
  expiry_date: number;
}
