import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedInuserId = req.user._id;

        const filteredUser = await User.find({_id:{$ne: loggedInuserId}}).select("-password") // except loggedInuserId

        res.status(200).json(filteredUser)
    } catch (error) {
        console.log("Error in getUsersForSidebar",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}