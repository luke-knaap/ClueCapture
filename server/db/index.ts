import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client: queryClient });

export async function testconnection() {
  try {
    const result = await db.execute("select 1");
    console.log("Verbonden met drizzle postgres", result);
  } catch (error) {
    console.error("Geen verbinding", error);
  }
}
