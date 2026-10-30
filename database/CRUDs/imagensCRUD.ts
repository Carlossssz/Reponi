import { dbPromise } from "../db";

export type Imagem = {
    id: number;
    imagemNome: string;
    url: string;
}

export async function salvarImagem(imagemNome: string, url: string){
    const db = await dbPromise;

    return db.runAsync(
        "INSERT INTO imagens (imagemNome, url) VALUES (?, ?)",
        imagemNome,
        url
    )
}

export async function getAllImagens(): Promise<Imagem[]>{
    const db = await dbPromise;

    return db.getAllAsync(
        "SELECT * FROM imagens"
    )
}