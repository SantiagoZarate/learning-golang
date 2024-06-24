export interface Snippet {
  id: number;
  title: string;
  content: string;
  created: Date;
  expires: Date;
}

export interface RawSnippet {
  Id: number;
  Title: string;
  Content: string;
  Created: Date;
  Expires: Date;
}