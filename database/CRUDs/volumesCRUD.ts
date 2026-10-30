import { dbPromise } from "../db";

export type Volume = {
    id: number,
    valor: string
}

export async function getAllVolumes(): Promise<Volume[]>{
    const db = await dbPromise;

    const result = await db.getAllAsync<Volume>(
        "SELECT * from volumes"
    );

    return result;
}

export async function getVolumesPerList(idList: number[]): Promise<Volume[]>{
    const db = await dbPromise;

    const result = await db.getAllAsync<Volume>(
        "SELECT * from volumes"
    );

    return result.filter(item => idList.includes(item.id));
}