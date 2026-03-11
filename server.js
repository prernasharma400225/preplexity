import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
    .catch((err) => {
        console.log("MongoDB connection failed: ", err);
        process.exit(1);
    })

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);

})