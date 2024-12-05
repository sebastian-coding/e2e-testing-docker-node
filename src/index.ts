import {setupRoutes} from "./app";
import {Pool} from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const app = setupRoutes(pool);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});