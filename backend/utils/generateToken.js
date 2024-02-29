import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (userId,res) =>{
    const token =  jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,//time exist
        httpOnly:true, //prevent xss Attack(get cookie by js)
        sameSite:"strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    })
}

export default generateTokenandSetCookie