export interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: string;
  readBy: User[];
}
export interface ChatGroup {
  groupPic: string | undefined;
  pic:string;
  name:string;
  chatName: string;
  createdAt: string;
  groupAdmin: User;
  isGroupChat: boolean;
  latestMessage: Message;
  updatedAt: string;
  users: User[];
  __v: number;
  _id: string;
}

export interface User {
  online: any;
  _id: string;
  name: string;
  email: string;
  isGroupAdmin: boolean;
  pic: string;
}
export interface indivisualUser {
  _id: string;
  isGroupChat: boolean;
  users: User[];
  chatName: string;
}
