const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { validateUser } = require("../utils/validator");
const usersFilePath = path.join(__dirname, "../data/users.json");

exports.register = (req, res) => {
  const newUser = req.body;
  if (!validateUser(newUser)) {
    return res.status(400).json({ message: "Invalid user data" });
  }

  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading users file" });
    }
    const users = JSON.parse(data);
    const userExists = users.find((user) => user.email === newUser.email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }
      newUser.id = users.length + 1;
      newUser.password = hash;
      users.push(newUser);

      fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
        if (err) {
          return res.status(500).json({ message: "Error saving user" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, secure: true });
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  res.json({ message: "Logout successful" });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  fs.readFile(usersFilePath, (err, data) => {
    if (err)
      return res.status(500).json({ message: "Error reading users file" });
    const users = JSON.parse(data);
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(404).json({ message: "User not found" });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ message: "Error comparing passwords" });
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_LIFE,
      });
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_LIFE }
      );
      const name = user.name;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.json({ accessToken, name });
    });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;

  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading users file" });
    }
    let users = JSON.parse(data);
    const userIndex = users.findIndex((u) => u.id == id);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);
    fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting user" });
      }
      res.json({ message: "User deleted successfully" });
    });
  });
};
