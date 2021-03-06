export interface RootState {
}

export enum themeModes {
  AUTO = 'AUTO',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export interface MessageType {
  _v?: any // unknown thing
  _id: string, // mongoose id, absolutely unique
  author: string, // user's [_id]
  read: boolean, // show that if this is read by someone (the other user in same chatRoom)
  context?: string, // text content of this msg, will change to contain not only texts but also medias
  chatroomID: string, // the chatRoom's [_id](mongoose id, absolutely unique)
  updateAt: number, // the last time of edit or create
  createAt?: number // deprecated unUseful parameter from server
}

export interface UserType {
  _id: string // line uuid or admin's mongo id.
}

export interface AdminType extends UserType {
  username: string, // admins' self-set name, or the line uuid of general users
  avatar?: string, // user avatar url(at the first time) => base64 path TODO avatar = await getBase64ImgPath(avatarUrl)
  info?: string, // user profile
  cc: boolean // show that if the user is verified by us(dev team)
}

export interface ChatRoomType {
  _id: string, // mongoose id, absolutely unique, is the route path at /:chatRoom
  owner?: string, // the hashed user's line uuid => hashed[(username])
  identify: string, // generated from 'createChatRoom' in google script
  closed: boolean // show that if this room is closed or not.
  lineAccessToken: string // the line accessToken from [owner]
}

export interface MessageContainerType {
  [chatroomID: string]: Array<MessageType>
}
