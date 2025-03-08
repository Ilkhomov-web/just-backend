const express = require("express");
const controllers = require('../controllers/product');
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

router.get("/", controllers.allProduct);
router.get("/popularinwomen", controllers.popularInWomenApi);
router.get("/socks", controllers.socksProductApi);
router.get("/sneakers", controllers.sneakerProductApi);
router.get("/pants", controllers.pantsProductApi);
router.get("/caps", controllers.capsProductApi);
router.get("/slipper", controllers.slipperProductApi);
router.get("/fudbolka", controllers.fudbolkaProductApi);
router.get("/treko", controllers.trekoProductApi);
router.get("/sviter", controllers.sviterProductApi);
router.get("/nimcha", controllers.nimchaProductApi);
router.get("/makas", controllers.makasProductApi);
router.get("/bag", controllers.BagProductApi);
router.get("/boshqa", controllers.BoshqaProductApi);
router.get("/discount", controllers.DiscountProductApi);
router.get("/look", controllers.LookProductApi);
router.post("/", controllers.addProductApi);
router.post("/:id/delete", controllers.removeProduct);
router.get('/newcollactions', controllers.newCollaction );
router.post('/add-card', fetchUser, controllers.addToCardApi );
router.delete('/delete-card', fetchUser, controllers.removeFromCard );
router.get('/getcard', fetchUser, controllers.getcard );
// router.post('/buyurtma', fetchUser, controllers.Order);

// router.get("/", controllers.fetchAllFoods);
// router.post("/", controllers.createFood);
// router.get("/:id", controllers.fetchFoodById);
// router.get("/:id/delete", controllers.deleteFoodById);


module.exports = router;