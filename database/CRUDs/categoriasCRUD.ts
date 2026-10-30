import { dbPromise } from "../db";

export type Categoria = {
    id : number,
    nome: string
}

export async function getAllCategorias() : Promise<Categoria[]>{
    const db = await dbPromise;

    const result = await db.getAllAsync<Categoria>(
        "SELECT * FROM categorias"
    )

    return result;
}

export async function getCategoriasPerList(idList: number[]) : Promise<Categoria[]>{
    const db = await dbPromise;

    const result = await db.getAllAsync<Categoria>(
        "SELECT * FROM categorias"
    );

    return result.filter(item => idList.includes(item.id));
}