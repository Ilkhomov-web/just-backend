const jwt = require("jsonwebtoken");
const Users = require('../models/user');

exports.signIn = async (req, res) => {
  let user = await Users.findOne({email:req.body.email});
  if(user){
    const passCompare = req.body.password === user.password;
    if(passCompare) {
      const data = {
        user: {
          id:user.id,
          name: user.name
        }
      }
      const token = jwt.sign(data, 'secret_ecom');
      res.json({success: true, token})
    }
    else{
      res.json({success: false, errors: "Worng Password"})
    }
  }
  else{
    res.json({success: false, errors: "Worng Email Id"})
  }
}

exports.signUp = async (req, res) => {
  let check = await Users.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success: false, errors: 'existing user found with same email address'})
  }

  let card = {};
  for (let i = 0; i < 300; i++) {
    card[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cardData: card,
  })

  await user.save();
  const data = {
    user: {
      id:user.id,
      name:user.name,
    }
  }
  const token = jwt.sign(data, 'secret_ecom')
  res.json({success: true, token})
}

// const { createToken } = require("../utils/index");

// exports.signIn = async (req, res) => {
//   const { password, phone, role } = req.body;
//   try {
//     let user;
//     if (role === "club") {
//       user = await Clubs.findOne({
//         phone: phone.trim(),
//       });
//     } else {
//       user = await Admins.findOne({
//         phone: phone.trim(),
//       });
//     }
//     if (user) {
//       const { password: hashedPassword, _id } = user;
//       const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
//       if (isPasswordCorrect) {
//         const token = createToken({
//           _id,
//           role,
//         });
//         res.json({
//           user: user,
//           token,
//           success: true,
//         });
//       } else {
//         res.status(422).json({
//           msg: "Phone number or password is wrong",
//           success: false,
//         });
//       }
//     } else {
//       res.status(422).json({
//         msg: "There is no user with this number",
//         success: false,
//       });
//     }
//   } catch (err) {
//     res.status(422).json({
//       msg: err.message,
//       success: false,
//     });
//   }
// };