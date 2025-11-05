import endpoints from "./endpoints";
import server from "./index"


// ... auth services
export function loginUser({email, password}: ILoginUserBody) {
  const body = {email, password};
  return server.post(endpoints.login, body, { requiresAuth: false });
}
