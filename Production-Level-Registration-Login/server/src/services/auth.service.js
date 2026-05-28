import bcrypt from "bcrypt"
import User from "../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";


const SALT_ROUNDS = 12;


export const registerUser = async ({ name, email, password }) => {


    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("An account with this email already exists");
        error.statusCode = 409;
        throw error;
    }


    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);


    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });


    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);


    user.refreshToken = refreshToken;
    await user.save();


    return {
        user: user.toSafeObject(),
        accessToken,
        refreshToken
    };
};