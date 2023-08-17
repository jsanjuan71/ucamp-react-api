import { select, upsert } from "../database/postgresql"
import { selectAll, insertRow } from "../database/sql/product"
import { ServiceResponse } from "../entities/serviceResponse"

import { ProductMapper } from "../entities/models/product"
import Product, { IProduct } from "../entities/models/productsSchema"




const getAllProducts = async() : Promise<ServiceResponse<IProduct[]>> => {
    var response: ServiceResponse<IProduct[]> = {done: false}
    try {
        const products = await Product.find({ deletedAt: null })
        response.done = true
        if( products ) {
            let prods: IProduct[] = products.map(prod => ProductMapper( prod ) )
            response.data = prods
        } else{
            response.data = []
        }
    } catch (error: any) {
        console.error(error.message)
        response.data = error.message
    } finally {
        return response
    }
}
/**
 * 
 * @param {any} data - Object containing username and password values 
 * @returns {ServiceResponse<User>} The new user data or errors
 */
const createProduct = async(data: any) : Promise<ServiceResponse<IProduct>> => {
    var response: ServiceResponse<IProduct> = {done: false}
    try {
        const newProduct = new Product({
            title: data.title,
            description: data.description,
            price: data.price,
            stock: data.stock
        })
        const result = await newProduct.save()
        if( result ) {
            response.done = true
            response.data = result
        }
    } catch (error: any) {
        console.error(error.message)
        response.data = error.message
    } finally {
        return response
    }
}



export {getAllProducts, createProduct}