import { connect } from 'mongoose';
import { MDB_URL } from '../utils/constants';

const checkDatabase = async() : Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            console.log("Connecting to ", MDB_URL)
            connect( MDB_URL )
                .then((connections) => {
                    console.log("Connected to MongoDB ", connections.connections[0].host);
                    resolve("Connected to MongoDB " + connections.connections[0].host)
                })
                .catch(err => {
                    console.log(err.message)
                    reject( `${err.message} SRV= ${process.env.MDB_URL}` )
                });
        } catch (error: any) {
            console.error(error.message);
            reject(  `${error.message} SRV= ${process.env.MDB_URL}` )
        }
    })
}

export {checkDatabase}