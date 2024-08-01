const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

// POST route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log("Data saved");

    const payload = {
      id: response._id, // Use _id as it's the default MongoDB field for ID
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is:", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username });

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate Token
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = generateToken(payload);

    // Return token as response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async(req, res) => {
    try {
        const userData = req.user;
        console.log("User data:", userData)

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

// GET method to get the person
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Other routes...

module.exports = router;