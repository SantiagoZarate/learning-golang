import { RawUserDTO, UserDTO } from "@/types/snippet";
import { fetcher } from "../fetcher";
import envs from "@/config/envs";
import { mapUserDTOArr } from "@/helpers/mapSnippetsFromApi";

interface UserAPI {
  getAll: () => Promise<UserDTO[]>
}

const prodUserAPI: UserAPI = {
  getAll() {
    return fetcher<RawUserDTO[]>({ path: "/user" }).then(res => mapUserDTOArr(res));
  }
}

const devUserAPI: UserAPI = {
  getAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch("/src/data/users.json")
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok')
            }
            return res.json()
          })
          .then(data => resolve(data))
          .catch(error => reject(error)) // Reject the promise on error
      }, 2000)
    })
  }
}


export default envs.DEVELOPMENT
  ? devUserAPI
  : prodUserAPI