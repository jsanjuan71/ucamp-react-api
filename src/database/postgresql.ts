import { Pool, PoolClient } from "pg";
import { DatabaseResponse } from "./response";

const pool : Pool = new Pool({
    user: "postgres",
    password: "root",
    database: "ucamp-store"
})


pool.on("error", (error) => {
    console.log(error)
})


pool.on("connect", client => {
    console.log("Connected", client)
})

const select = async(query: string, params?: any[]) : Promise<DatabaseResponse> => {
    console.log("pg select")
    var response: DatabaseResponse = {done: false, result: []};
    var client : PoolClient
    try {
        client = await pool.connect()
        const {rows} = await client.query(query, params)
        response.done = true
        response.result = rows
        client.release()
    } catch (error: any) {
        response.result = error.message
    } finally {
        return response
    }
}

const upsert = async(query: string, params?: any[]) : Promise<DatabaseResponse> => {
    var response: DatabaseResponse = {done: false, result: []};
    var client : PoolClient
    try {
        client = await pool.connect()
        const {rows} = await client.query(query, params)
        response.done = true
        response.result = rows
        client.release()
    } catch (error: any) {
        response.result = error.message
    } finally {
        return response
    }
}

export {select, upsert};