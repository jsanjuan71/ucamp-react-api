import { connect } from 'mongoose';

const checkDatabase = async() : Promise<any> => {
    try {
        const result = await connect(process.env.MDB_URL as string);
        return true
    } catch (error: any) {
        return error.message + " SRV= " + process.env.MDB_URL
    }
}

export {checkDatabase}