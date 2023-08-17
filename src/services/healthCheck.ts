import { select } from "../database/postgresql"

const checkDatabase = async() : Promise<any> => {
    const result = await select("select 1 as DONE")
    return result
}

export {checkDatabase}