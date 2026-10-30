import { initDatabase } from "./db";
import { seedDatabase } from "./seedDatabase";

export async function initializeAppDatabase(){
    await initDatabase();
    await seedDatabase();
}