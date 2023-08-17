import { Schema, model, connect } from 'mongoose';

export interface IProduct {
    id: number,
    title: string;
    description: string;
    price: number,
    stock: number,
    imageSrc?: string,
    createdAt: Date,
    deletedAt?: Date
}
  

const productSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageSrc: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const Product = model<IProduct>('products', productSchema);

run().catch(err => console.log(err));

async function run() {
// 4. Connect to MongoDB
    await connect(process.env.MDB_URL as string);
    const product = new Product({
        title: "iPhone X 64Gb",
        description: "Apple iphone 64 GB RAM color spacegray 5.1 pulgadas",
        price:  7000,
        stock: 10
    });
    //await product.save();

    console.log(product._id);
}
export default Product