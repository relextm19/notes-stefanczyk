import { MongoClient } from 'mongodb';

const connectToMongoDB = async () => {

    try {
        const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
        await mongoClient.connect();
        const db = mongoClient.db("test_db_mateusz_kielb");
        return db
    } catch (error) {
        throw new Error(`Nie udało się połączyć z MongoDB: ${error.message}`)
    }

}

export { connectToMongoDB }