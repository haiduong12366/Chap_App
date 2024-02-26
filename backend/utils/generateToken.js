import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (userId,res) =>{
    const token =  jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,//time exist
        httpOnly:true, //prevent xss Attack(get cookie by js)
        sameSite:"strict",
    })
}

export default generateTokenandSetCookie