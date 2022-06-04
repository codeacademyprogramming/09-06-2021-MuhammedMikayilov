import { ILogin } from "../../../components/redux/interfaces/Auth/IAuth";
import { HttpClient } from "../../HttpClient";

class AuthService extends HttpClient {
  constructor() {
    super("http://localhost:8000/auth");
  }

  loginUser(body: ILogin) {
    return this.post("login", body);
  }
}
export const authService = new AuthService();
