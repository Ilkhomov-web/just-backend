const SpinGame = require('../models/spinGame');

exports.startSpinGame = async (req, res) => {
  // let products = await SpinGame.find({});
  // let id;
  // if(products.length > 0){
  //   let last_product_array = products.slice(-1);
  //   let last_product = last_product_array[0];
  //   id = last_product.id + 1;
  // }else{
  //   id = 1;
  // }
  SpinGame.create({
    userName: req.body.userName,
    spinWin: req.body.spinWin,
    date: req.body.date,
  }).then((data)=>{
    res.json({
      success: true,
      name: req.body.name,
      data: data,
    })
  }).catch((error)=>{
    console.log("Error", error) 
  });
}

exports.allSpinWin = async (req, res) => {
  let spin = await SpinGame.find({});
  res.send(spin)
}

exports.deleteSpinWin = async (req, res) => {
  await SpinGame.findOneAndDelete({id:req.body.id});
  res.json({
    success: true,
    name: req.body.name,
  })
}