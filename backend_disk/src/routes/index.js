import { Router } from "express"
import fs from "fs"

const router = Router();

const PATH_ROUTES = __dirname;
function removeExtension(filename){
    return filename.split(".").shift();
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);
    if(name !== "index") {
        
    
    }
})

export default router;