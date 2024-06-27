import { type Snippet, type RawSnippet, UserDTO, RawUserDTO } from "@/types/snippet";

export function mapSnippetsArr(data: RawSnippet[]): Snippet[] {
  return data.map(d => mapSnippet(d))
}

export function mapSnippet(data: RawSnippet): Snippet {
  return {
    content: data.Content,
    created: new Date(data.Created),
    expires: new Date(data.Expires),
    id: data.ID,
    title: data.Title,
    isPrivate: data.IsPrivate,
    sharedWith: data.SharedWith ? [] : mapUserDTOArr(data.SharedWith!),
    author: mapUserDTO(data.Author)
  }
}

function mapUserDTOArr(users: RawUserDTO[]): UserDTO[] {
  return users.map(u => mapUserDTO(u))
}

function mapUserDTO(user: RawUserDTO): UserDTO {
  return {
    id: user.ID,
    pfp: user.Pfp,
    username: user.Username
  }
}