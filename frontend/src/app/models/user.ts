export interface User {
  _id?:string
  name:string
  email:string
  password:string
  userImage?:string,
  seller?:boolean,
  sellerId?:string,
  tokens?: [ { token: string, id?:string } ],
  createdAt?:Date,
  updatedAt?:Date,
}
