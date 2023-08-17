import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../entities/apiResponse';
import { Product, ProductMapper, ProductResponse, ProductResponseMapper } from '../entities/models/product';
import { getAllProducts, createProduct } from '../services/products';
import { IProduct } from '../entities/models/productsSchema';

const router: Router = express.Router();

router.get("/", async(req: Request, res: Response) : Promise<void> => {
    let response: ApiResponse<ProductResponse[]|string> = {done: false }
    const {done, data} = await getAllProducts()
    response.done = done
    if(done) {
        response.result = (data as IProduct[]).map( prod => ProductResponseMapper(prod) )
    } else {
        response.result = data as string
    }
    res.status( StatusCodes.OK ).send(response)
})

router.get("/:id", async(req: Request, res: Response) : Promise<void> => {
    let response: ApiResponse<ProductResponse> = {done: false }

    res.status( StatusCodes.NOT_IMPLEMENTED ).send(response)
})


router.post("/", async(req: Request, res: Response) : Promise<void> => {
    let response: ApiResponse<ProductResponse|string> = {done: false }
    const {done, data} = await createProduct(req.body)
    response.done = done
    if(done) {
        response.result = ProductResponseMapper(data as IProduct)
    } else {
        response.result = data as string
    }
    res.status(StatusCodes.OK).send(response)
})

export default router