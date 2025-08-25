export interface LoginProp {
  username: string;
  password: string;
}

export interface StateProp {
  status: boolean;
  message: string;
  fields?: Record<string, string | number | unknown>;
}
