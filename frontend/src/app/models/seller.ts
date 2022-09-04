export interface Seller {
  fName: string,
    mName: string,
    lName: string,
    phone:number,
    country: string,
    address: [{
        type: string,
        details: string
    }],
    businessType:string,
    orders?:[]
    _id:string,
    createdAt?:Date,
    updatedAt?:Date,
    userImage?:string,
}
