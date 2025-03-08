const Users = require('../models/user');
const Product = require('../models/product')
const Orders = require('../models/order');


exports.createOrder = async (req, res) => {
  let products = await Product.find({});
  let id;
  if(products.length > 0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }else{
    id = 1;
  }
  Orders.create({
    id: id,
    userName: req.body.userName,
    userPhone: req.body.userPhone,
    userDate: req.body.userDate,
    userMap: req.body.userMap,
    product: req.body.product.map(p => ({
      name: p.name,
      image: p.image,
      size: p.size,
      count: p.count,
      price: p.price,
      total: p.total
    }))
  }).then((data)=>{
    res.json({
      success: true,
      name: req.body.name,
      data: data,
    })
  }).catch((error)=>{
    console.log("Error", error) 
  });
  // await product.save();
  // res.json({
  //   success: true,
  //   name: req.body.name
  // })
}

exports.closeOrder = async (req, res) => {
  await Orders.findOneAndDelete({id:req.body.id});
  res.json({
    success: true,
    name: req.body.name,
  })
}

exports.allOrders = async (req, res) => {
  let products = await Orders.find({});
  res.send(products)
}