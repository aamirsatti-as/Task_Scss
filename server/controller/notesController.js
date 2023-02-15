const Notes = require("../models/noteSchema");
const jwt = require("jsonwebtoken");
const Login = require("../models/login");
module.exports = {
  AddNote: async (req, res) => {
    try {
      console.log(req.body);
      const { title, description, category } = req.body;
      console.log(title, description, category);
      const note = new Notes({ title, description, category });
      const result = await note.save();
      res.status(201).json({ message: "Note Created Successfully" });
    } catch (err) {
      res.status(501).json({ message: "Something Went Wrong, Try Again" });
    }
  },
  ViewNotes: async (req, res) => {
    try {
      const result = await Notes.find().sort({ createdAt: "desc" });
      res.status(200).json(result);
    } catch (err) {
      res.status(501).json(err);
    }
  },

  deleteNotes: async (req, res) => {
    try {
      console.log("as");
      const id = req.params.id;
      console.log(id);
      const book = await Notes.findById(id);
      if (!book) {
        return res.status(501).json({ message: "Note Not Found" });
      }
      await Notes.findByIdAndDelete(id);
      res.status(200).json({ message: "Successfully Deleted" });
    } catch (err) {
      res.status(501).json({ message: "Something Went Wrong, Try Again" });
    }
  },
  updateNotes: async (req, res) => {
    try {
      console.log("as");
      const id = req.params.id;
      console.log("id ", id);
      const note = await Notes.findById(id);
      console.log(req.body);
      const { title, description, category } = req.body.data;
      console.log(title, description, category);
      // return
      if (!note) {
        return res.status(501).json({ message: "Note Not Found" });
      }
      const data = await Notes.findByIdAndUpdate(
        { _id: req.params.id },
        { title: title, category: category, description: description },
        { new: true }
      );
      // const result = await Notes.findByIdAndUpdate(id, req.body, {
      //   new: true,
      // });
      res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
      res.status(501).json({ message: "Something Went Wrong,Try Again" });
    }
  },
  login: async (req, res) => {
    // 1. Get the user's credentials from the request body
    const { email, password } = req.body;

    const find = await Login.findOne({ email: email, password: password });
    if ((email==="aamir@gmail.com"&& password==="aamir")|| find) {
      const token = jwt.sign(
        { _id: 123 },
        "IAmGeneratingTokenToAuthticateCredintialBelongToUser"
      );
      const savetoken = await Login.findOneAndUpdate(
        { _id: find._id },
        {  tokens: { token: token } }
      );
      if (savetoken) res.json({ token, message: "Login Successful" });
    } else {
      // 5. Return an error response if the credentials are invalid
      res.json({ message: "Invalid credentials" });
    }
  },

};
