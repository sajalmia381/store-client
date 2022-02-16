import jwtDecode from "jwt-decode";

export default class JwtService {
  static getTokenPayload (token: string): any {
    const decoded: any = jwtDecode(token);
    const data = {
      ...decoded.data
    };
    return data
  }
  static isTokenValid(token: string): boolean {
    const decoded: any = jwtDecode(token);
    // console.log('decoded_token', decoded)
    // default decoded exp format is second
    const expMilSecond: number = decoded?.exp * 1000; // milliseconds
    const currentTime = Date.now(); // milliseconds
    if (expMilSecond < currentTime) {
      return false;
    }
    return true;
  }
  static describeToken(token: string): [boolean, any] {
    const decoded: any = jwtDecode(token);
    // console.log('decoded_token', decoded)
    // default decoded exp format is second
    const expMilSecond: number = decoded?.exp * 1000; // milliseconds
    const currentTime = Date.now(); // milliseconds
    if (expMilSecond < currentTime) {
      return [false, decoded.data];
    }
    console.log(decoded)
    return [true, decoded.data];
  }
}