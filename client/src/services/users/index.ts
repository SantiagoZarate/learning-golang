import { RawUserDTO, UserDTO } from "@/types/snippet";
import { fetcher } from "../fetcher";
import envs from "@/config/envs";
import { mapUserDTOArr } from "@/helpers/mapSnippetsFromApi";
import { supabase } from "@/lib/supabase";
import { retrieveUserCredentials, storeUserCredentials } from "@/helpers/localStorage";

interface UserAPI {
  getAll: () => Promise<UserDTO[]>,
  updateProfilePicture: (image: File, imageName: string, token: string) => Promise<any>
}

const prodUserAPI: UserAPI = {
  getAll() {
    return fetcher<RawUserDTO[]>({ path: "/user" }).then(res => mapUserDTOArr(res));
  },
  async updateProfilePicture(image, imageName, token) {
    await supabase.storage.from("snippetbox-profiles-pictures").upload(imageName, image, {
      cacheControl: '3600',
      upsert: false,
      contentType: image.type
    }).then(() => supabase.storage.from("snippetbox-profiles-pictures").getPublicUrl(imageName))
      .then(({ data: { publicUrl } }) =>
        fetcher({
          path: "/user",
          payload: { url: publicUrl },
          token,
          method: "PATCH"
        }).then(() => {
          const previousData = retrieveUserCredentials()!
          storeUserCredentials({
            ...previousData,
            pfp: publicUrl
          })
        })
      )
  },
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
  },
  updateProfilePicture(_image, _imageName, _token) {
    return new Promise((_resolve, _reject) => {
      setTimeout(() => {
        _resolve("Updated")
      }, 2000)
    })
  },
}


export default envs.DEVELOPMENT
  ? devUserAPI
  : prodUserAPI