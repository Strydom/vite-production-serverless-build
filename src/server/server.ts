import process from "process";
import { app } from "./app";

const port = process.env.APP_PORT ? Number.parseInt(process.env.APP_PORT) : 3000

app.listen(port)
console.log(`Server running at http://localhost:${port}`)