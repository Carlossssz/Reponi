import { dbPromise } from "./db";

export async function seedDatabase() {
    const db = await dbPromise;

    const seedExecutado = await db.getFirstAsync<{ valor: string }>(
        `SELECT valor FROM configuracoes
         WHERE chave = 'dados_iniciais';`
    );

    if(seedExecutado) return;

    await db.withTransactionAsync(async () => {
        const volumes = [
            '2L',
            '1L',
            '1L Vidro',
            '600ml',
            '500ml',
            'Long Neck',
            'Lata',
            'Garrafa',
            'Fininha',
            'Mini',
            'KS'
        ];

        const categorias = [
            'Refrigerante',
            'Suco',
            'Cerveja'
        ];

        for(const item of categorias) {
            await db.runAsync(
                "INSERT OR IGNORE INTO categorias (nome) VALUES (?);",
                item
            );
        }

        for(const volume of volumes) {
            await db.runAsync(
                "INSERT OR IGNORE INTO volumes (valor) VALUES (?);",
                volume
            );
        }

        await db.runAsync(
            `INSERT INTO configuracoes (chave, valor)
            VALUES ('dados_iniciais', 'true');
            `
        );
    });
}