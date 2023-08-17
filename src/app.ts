import express, { Express, Request, Response } from 'express'
import { checkDatabase } from './services/healthCheck'
import { ApiResponse } from './entities/apiResponse'
import productRoutes from './routes/products'
import cors from 'cors'

const app: Express = express()

app.use( express.json() )

app.use( cors() )

app.get('/', async(req: Request, res: Response) => {
    const dbAlive = await checkDatabase()

    var response: ApiResponse<any> = {
        done: true,
        result: {
            name: process.env.npm_package_name,
            version: process.env.npm_package_version,
            services: {
                database: dbAlive
            }
        }
    }
    res.send(response);
})

app.use( "/products", productRoutes )

export default app