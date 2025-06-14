// import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return res.json({ success: false, message: "Not Authorized. Login Again" });
//   }
//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//     if (tokenDecode.id) {
//       req.body.userId = tokenDecode.id;
//     } else {
//       return res.json({
//         success: false,
//         message: "Not Authorized. Login Again",
//       });
//     }
//     next();
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export default userAuth;

import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id }; // Attach user data here
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload" });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
