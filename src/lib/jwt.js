import jwt from "jsonwebtoken"

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id || user._id,
      role: user.role,
      sessionId: user.sessionId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
export const verifyToken =(token)=>{
    return jwt.verify(token, process.env.JWT_SECRET)
}