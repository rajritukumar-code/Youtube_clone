import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes.js";
import { videoRoutes } from "./routes/video.routes.js";
import { channelRoutes } from "./routes/channel.routes.js";
import { commentRoutes } from "./routes/comment.routes.js";

import { globalErrorHandler } from "./middlewares/errorHandlers.js";
import { invalidRouteHandler } from "./middlewares/errorHandlers.js";
import { malformedJSONHandler } from "./middlewares/errorHandlers.js";
import { mongooseValidationHandler } from "./middlewares/errorHandlers.js";



const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    console.log(process.env.MONGO_URI)
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome To Mern Youtube Clone API" });
});


userRoutes(app);
videoRoutes(app);
channelRoutes(app);
commentRoutes(app);

app.use(malformedJSONHandler)
app.use(mongooseValidationHandler)
app.use(invalidRouteHandler)
app.use(globalErrorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;