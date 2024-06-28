
import { User } from "../models/user.modal.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser=asyncHandler(async(req,res)=>{
       //get user details from frontend
       //validation-not empty
       //check if user already exist:username,email
       //check for images,check for avatar
       //upload to cloudinary
       //create user object
       //remove password and refresh token field from response 
       //check for user creation
       //return res
      const {email,password,fullName,username}=req.body;

      if(
        [fullName,email,password,username].some((field)=>field?.trim()==="")

      ){
        throw new apiError(400,"All the fields are required")
      }

      const existedUser=await User.findOne(
        {
            $or:[{username},{email}]
        }
      )
      if(existedUser){
        throw new apiError(409,"User with email or username already exists");

      }
      const avatarLocalPath=req.files?.avatar[0]?.path;
      let coverImageLocalPath;

       if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath=req.files.coverImage[0].path
       }

       if(!avatarLocalPath){
        throw new apiError(400,"Avatar file is required")
       }

       const avatar=await uploadOnCloudinary(avatarLocalPath)
       const coverImage=await uploadOnCloudinary(coverImageLocalPath)

       if(!avatar){
        throw new apiError(400,"Avatar is Required")
       }

       const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
       })

       const createUser=await User.findById(user._id).select(
        "-password -refreshtoken"
       )

       if(!createUser){
        throw new apiError(500, "Something went wrong while registering the user")
       }

       return res.status(201).json(
        new apiResponse(200, createUser, "User registered Successfully")
    )

})

export {registerUser}
