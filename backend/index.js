import express from "express";
import { PORT, mondoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
//Option 1:
// app.use(cors());

//Option 2:
app.use(cors({
  origin: `${import.meta.env.FRONTEND_URL}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/books", booksRoute);

mongoose.connect(mondoDBURL, {  
}).then(() => {console.log('MongoDB is Connected successfully!');
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})
.catch((err) => {
  console.log(err)
});
