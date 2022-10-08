const { User } = require("../model/user");
const client = require("../bd/connect");
const { ObjectID } = require("bson");

const addUser = async (req, res) => {
  try {
    let user = new User(req.body.username, req.body.address, req.body.phone);
    let result = await client.bd().collection("users").insertOne(user);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    let cursor = client.bd().collection("users").find();
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ msg: "No results found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let cursor = client.bd().collection("users").find({ _id: id });
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ msg: "this user is not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let nUserName = req.body.username;
    let nAddress = req.body.address;
    let nPhone = req.body.phone;

    let result = await client
      .bd()
      .collection("users")
      .updateOne(
        { _id: id },
        { $set: { username: nUserName, address: nAddress, phone: nPhone } }
      );
      if (result.modifiedCount==1){
        res.status(200).json({msg: "updated successfully"});
      }else{
        res.status(404).json({ msg: "this user is not found" });
      }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);

    let result = await client.bd().collection("users").deleteOne({ _id: id });

    if (result.deletedCount==1){
        res.status(200).json({msg: "delete successfully"});
      }else{
        res.status(404).json({ msg: "this user is not found" });
      }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = { addUser, getAllUsers, getUsers, updateUser, deleteUser};
