export interface Product {
  sellerId: string,
  category: string,
  name: string,
  description: string,
  pBanner?: string,
  photos: [],
  price: number,
  rate?: number,
  quantity?: string,
  createdAt?:Date,
  updatedAt?:Date,
  _id?:string
}
