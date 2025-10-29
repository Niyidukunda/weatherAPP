import express, { urlencoded } from "express";
import path from "path";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import {fileURLToPath} from "url";

// Load environment variables from .env into process.env
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extented:'true'}));

app.set('view engine','ejs');

// Tell Express where to find the EJS templates (views folder)
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', routes);


// Start the server
// Use the PORT from .env if available, otherwise default to 3000
const PORT = process.env.PORT || 3000;

// ... all your imports and setup above ...

// Server
// ✅ Debugging: log out key environment values
console.log("Debug Info:");
console.log("PORT:", PORT);
console.log("API_KEY loaded:", process.env.API_KEY ? "Yes ✅" : "No ❌");

// Start listening for incoming requests
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});



