import 'dotenv/config'
import app from "./src/app.js";
import http from "http";
import connectDB from "./src/config/database.js";
import { initSocket } from "./src/sockets/server.socket.js";

// import { testAi } from "./src/services/ai.service.js";


const PORT = process.env.PORT || 8000;

const httpServer = http.createServer(app);

initSocket(httpServer);

// testAi();

connectDB()
    .catch((err) => {
        console.log("MongoDB connection failed: ", err);
        process.exit(1);
    })

httpServer.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);

})