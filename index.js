const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const productRouter = require('./routes/product')
const authRouter = require("./routes/auth")
const orderRouter = require('./routes/order');
const spinGameRoute = require('./routes/spinGame')


app.use(express.json());  
app.use(cors())
// localhost:3000
app.use('/auth', authRouter); 
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/spinGame', spinGameRoute);

// DataBase Connection With MongoDB
mongoose.connect("mongodb+srv://ilhomovelyor119:E200!0624@cluster0.jc3d3bt.mongodb.net/justShopWebApplication");

// API creation

app.get("/", (req, res)=> {
  res.send("Express App in Running")
})

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb)=>{
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage:storage})

// Creating Upload Endpoint for images
app.use('/images', express.static("upload/images"))

app.post('/upload', upload.single('product'), (req, res)=>{
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
})





app.listen(port, (error) => {
  if(!error){
    console.log("Server Running on Port" + port);
  }else{
    console.log("Error" + error);
  }
})