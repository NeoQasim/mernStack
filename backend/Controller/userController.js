// const express = require('express');
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401)
        throw new Error("invalid email or password")
    }
})
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // console.log(name);
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(404)
        throw new Error("user already exists error from userController")
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error("invalid user data")
    }

    // res.status(200).json({ message: 'User Registered ' });
})
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: ' User loged Out' });
})
const getUserProfile = asyncHandler(async (req, res) => {
    // console.log(req.user);
    const user = {
        _id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    }

    res.status(200).json({ user });
})
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedData = await user.save()
        res.status(200).json({
            _id: updatedData._id,
            name: updatedData.name,
            email: updatedData.email
        })
    } else {
        res.status(404)
        throw new Error("user not found")
    }

    // res.status(200).json({ message: ' User profile updated' });
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};
