import * as SQLite from 'expo-sqlite';

export const dbPromise = SQLite.openDatabaseAsync('reponiDatabase');

export async function initDatabase() {
    const db = await dbPromise;
    await db.execAsync('PRAGMA foreign_keys = ON;');

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS imagens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            imagemNome TEXT NOT NULL,
            url TEXT NOT NULL UNIQUE

        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            imagem_id INTEGER,

            FOREIGN KEY (imagem_id)
                REFERENCES imagens(id)
                ON DELETE SET NULL
        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS categorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE
        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS produto_categoria (
            produto_id INTEGER NOT NULL,
            categoria_id INTEGER NOT NULL,

            PRIMARY KEY (produto_id, categoria_id),

            FOREIGN KEY (produto_id)
                REFERENCES produtos(id)
                ON DELETE CASCADE,

            FOREIGN KEY (categoria_id)
                REFERENCES categorias(id)
                ON DELETE CASCADE
        
        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS configuracoes (
            chave TEXT PRIMARY KEY,
            valor TEXT NOT NULL
        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS volumes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            valor TEXT NOT NULL UNIQUE
        );
    `);


    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS produto_volume (
        produto_id INTEGER NOT NULL,
        volume_id INTEGER NOT NULL,

        PRIMARY KEY (produto_id, volume_id),

        FOREIGN KEY (produto_id)
            REFERENCES produtos(id)
            ON DELETE CASCADE,

        FOREIGN KEY (volume_id)
            REFERENCES volumes(id)
            ON DELETE CASCADE
    );
`);

}