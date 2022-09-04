export interface Cart {
  productId:string,
  sellerId:string,
  userId:string,
  pBanner?: string,
  name: string,
  price: number,
  quant?: number,
  orderId?: string,
  _id?:string,
  createdAt?:Date,
  updatedAt?:Date
}
