const express = require("express");
const controllers = require('../controllers/order');
const jwt = require("jsonwebtoken");
const router = express.Router();

const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({errors: "Please authenticat using valid token"})
  }
  else{
    try{
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next()
    }catch (error) {
      res.status(401).send({errors: 'plase auth'})
    }
  }
}

router.get("/", controllers.allOrders); 
router.post("/", fetchUser, controllers.createOrder); 
router.post("/delete", controllers.closeOrder);

module.exports = router;