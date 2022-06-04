export interface IRegisterPayload {
  name: string;
  surname: string;
  email: string;
  role: string;
  password: string;
  createdDate: Date;
  profile_image: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
