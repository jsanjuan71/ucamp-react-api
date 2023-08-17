import { QueryResult } from "pg"
import { IProduct } from "./productsSchema"

export type Product = {
    id: number
    title: string
    description: string
    price: string
    stock: number
    imageSrc?: string
    createdAt?: Date
    deletedAt?: Date
}

export const ProductMapper = (data: any): IProduct => {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageSrc: data.imageSrc,
        createdAt: data.created_at,
        deletedAt: data.deleted_at
    }
}

export type ProductResponse = {
    id: number
    title: string
    description: string
    price: number
    stock: number
    imageSrc: string
}

export const ProductResponseMapper = (prod: IProduct): ProductResponse => {
    const {id, title, description, price, stock, imageSrc = "https://res.cloudinary.com/sahj/image/upload/v1691588509/mockup_hhedck.jpg"} = prod
    return {
        id: id,
        title: title,
        description: description,
        price: price,
        stock: stock,
        imageSrc: imageSrc
    }
}