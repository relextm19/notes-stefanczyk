import { connectToMongoDB } from "./dbconnect.js";

let db;
let collection;

const createCollection = async () => {
    let collection = await db.collection('notes');
    return collection
}

const saveBackup = async (tasksArray) => {
    db = await connectToMongoDB();
    collection = await createCollection();

    if (!Array.isArray(tasksArray)) {
        throw new Error("Dane kopii zapasowej muszą być tablicą");
    }

    await collection.deleteMany({});
    if (tasksArray.length === 0) return { message: "Brak notatek" };

    const result = await collection.insertMany(tasksArray);
    return result;
}

const getTasks = async () => {
    db = await connectToMongoDB();
    collection = await createCollection();

    const items = await collection.find({}).toArray()
    console.log(items)
    return items
}

export { getTasks, saveBackup }