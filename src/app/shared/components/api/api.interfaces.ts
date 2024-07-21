export interface IApi {
  name: string;
  code: string;
  output?: { [key: string]: any } | string;
  description?: string;
  hint?: string;
}
