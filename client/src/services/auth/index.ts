import envs from "@/config/envs"
import { LoginPayload, RegisterPayload } from "@/types/auth"

interface AuthAPI {
  login: (data: LoginPayload) => Promise<Response>;
  register: (data: RegisterPayload) => Promise<Response>;
}

const authAPI: AuthAPI = {
  login(data) {
    return fetch(envs.AUTH_API_URL + "/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
  },
  register(data) {
    return fetch(envs.AUTH_API_URL + "/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    })
  },
}

const devAuthAPI: AuthAPI = {
  login(data) {
    return new Promise((resolve) => {
      const body = JSON.stringify({
        role: "user",
        username: data.username,
        pfp: ""
      });
      const res = new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": "access_token=12893712893712893712897389738; Path=/; HttpOnly"
        }
      });
      resolve(res)
    })
  },
  register(_data) {
    return new Promise((resolve) => {
      fetch("").then(res => {
        resolve({ ...res, status: 200 })
      })
    })
  },
}

export default envs.MODE === "production" ? authAPI : devAuthAPI