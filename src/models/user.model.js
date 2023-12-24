import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import { Jwt } from "jsonwebtoken";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true

    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },

    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    avatar: {
        type: String, //cloudinary url
        required: true
    },

    coverImage: {
        type: String //cloudinary url

    },

    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Videos"
        }
    ],

    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    },




}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)

}


//function to generate access token
userSchema.methods.generateAccessToken = function () {
    Jwt.sign(

        //this is for payload
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname

        },

        //this is secret key token
        process.env.ACCESS_TOKEN_SECRET,

        //this is for the expiry
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id

        },

        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY

        })
}



export const User = mongoose.model("User", userSchema)