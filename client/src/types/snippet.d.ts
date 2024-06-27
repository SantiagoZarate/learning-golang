export interface Snippet {
  id: number;
  title: string;
  content: string;
  created: Date;
  expires: Date;
  isPrivate: boolean,
  sharedWith: UserDTO[] | undefined
  author: UserDTO
}

export interface RawSnippet {
  ID: number;
  Title: string;
  Content: string;
  Created: Date;
  Expires: Date;
  IsPrivate: boolean
  SharedWith: RawUserDTO[] | undefined
  Author: RawUserDTO
}

export interface RawUserDTO {
  ID: number,
  Username: string,
  Pfp: string
}

export interface UserDTO {
  id: number,
  username: string,
  pfp: string
}