import { authService } from "../../../HttpClient/Service/Auth";
import { songService } from "../../../HttpClient/Service/Songs";
import { ILogin } from "../interfaces/Auth/IAuth";
import { ACTION_TYPES } from "./actionTypes";

export const loginUser = (data: ILogin) => (dispatch: Function) => {
  authService.loginUser(data).then(({ data }) => {
    console.log("data", data);
    dispatch({
      type: ACTION_TYPES.LOGIN_USER,
      payload: data,
    });
  });
};
