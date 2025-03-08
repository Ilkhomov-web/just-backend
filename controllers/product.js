
const Users = require('../models/user');
const Product = require('../models/product');

exports.addProductApi = async (req, res) => {
  let products = await Product.find({});
  let id;
  if(products.length > 0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }else{
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    size: req.body.size,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  res.json({
    success: true,
    name: req.body.name
  })
}

exports.addToCardApi = async (req, res) => {
  let userData = await Users.findOne({_id:req.user.id});
  userData.cardData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({_id:req.user.id}, {cardData:userData.cardData});
  res.send("Added")
}

exports.removeProduct = async (req, res) => {
  await Product.findOneAndDelete({id:req.body.id});
  res.json({
    success: true,
    name: req.body.name,
  })
}

exports.allProduct = async (req, res) => {
  let products = await Product.find({});
  res.send(products)
}

exports.newCollaction = async (req, res) => {
  let products = await Product.find({});
  let newcollaction = products.slice(1).slice(-8);
  res.send(newcollaction);
}

exports.getcard = async (req, res) => {
  let userData = await Users.findOne({_id:req.user.id})
  res.json(userData.cardData)
}

exports.popularInWomenApi = async (req, res) => {
  let products = await Product.find({category: "women"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.socksProductApi = async (req, res) => {
  let products = await Product.find({category: "socks"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.sneakerProductApi = async (req, res) => {
  let products = await Product.find({category: "sneakers"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.pantsProductApi = async (req, res) => {
  let products = await Product.find({category: "pants"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.capsProductApi = async (req, res) => {
  let products = await Product.find({category: "caps"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.slipperProductApi = async (req, res) => {
  let products = await Product.find({category: "slipper"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.fudbolkaProductApi = async (req, res) => {
  let products = await Product.find({category: "fudbolka"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.trekoProductApi = async (req, res) => {
  let products = await Product.find({category: "treko"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.nimchaProductApi = async (req, res) => {
  let products = await Product.find({category: "nimcha"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.makasProductApi = async (req, res) => {
  let products = await Product.find({category: "makas"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.BagProductApi = async (req, res) => {
  let products = await Product.find({category: "bag"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.BoshqaProductApi = async (req, res) => {
  let products = await Product.find({category: "boshqa"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.DiscountProductApi = async (req, res) => {
  let products = await Product.find({category: "discount"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.LookProductApi = async (req, res) => {
  let products = await Product.find({category: "look"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}
exports.sviterProductApi = async (req, res) => {
  let products = await Product.find({category: "sviter"});
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
}

exports.removeFromCard = async(req, res) => {
  let userData = await Users.findOne({_id:req.user.id});
  if(userData.cardData[req.body.itemId] > 0)
  userData.cardData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({_id:req.user.id}, {cardData:userData.cardData});
  res.send("Removed Product")
}


