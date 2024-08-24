// Import the userSchema or model
const users = require('../Model/userSchema');

const jwt = require('jsonwebtoken')


// Define the register logic
exports.register = async (req, res) => {
    // console.log("Inside register method");
    // Accept data from client
    const { username, email, phonenumber,  password } = req.body;
    console.log(username, email, phonenumber, password);

    try {
        // Placeholder logic for registration
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("user already registered")
        }else{
            const newUser = new users({
                username,
                email,
                phonenumber,
                password

            })
            await newUser.save()
            res.status(200).json(newUser)
        }


    } catch (err) {
        res.status(500).json("Registration failed");
    }
};

//login logic

exports.login = async(req,res)=>{
    //accept data from client
    const {email,password} = req.body
    try{
        //check if email and password in db
        const existingUser = await users.findOne({email,password})
        if (existingUser) {
            const token =jwt.sign({userId:existingUser._id},"super2024")
            console.log(token);
            res.status(200).json({existingUser,token})
        }else{
            res.status(404).json("Invalid email or password")
        }

    }catch(err){
        res.status(500).json("login failed"+err)
    }
}



// Define the getAllUsers logic
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find({});
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json("Failed to retrieve users: " + err);
    }
};


exports.deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        const deletedUser = await users.findOneAndDelete({ _id: uid });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json({ message: "Failed to delete user", error: err });
    }
};    

// Define the updateUser logic
exports.getProfile = async (req, res) => {
    try {
      const { uid } = req.params; // corrected to get `uid` from params
      const userProfile = await users.findById(uid); // corrected to use `findById`

      if (!userProfile) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(userProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get Profile
exports.getProfile = async (req, res) => {
    // const { uid } = req.params;
    try {
        const userProfile = await users.findById(req.params.uid);
        if (!userProfile) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    const { username, email, phonenumber, password } = req.body;
    const { uid } = req.params;
    const userId = req.payload;

    try {
        // Find the particular user and update the data
        const updateUser = await users.findByIdAndUpdate(
            { _id: uid },
            {
                username,
                email,
                phonenumber,
                password,
                userId
            } );
            await updateUser.save();  
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json({ message: "Failed to update user", error: err.message });
    }
};

//email services
const sendApprovalEmail = require('../service/emailServices');

exports.approveLease = async (req, res) => {
  try {
    const { email, lease } = req.body;

    await sendApprovalEmail(email, lease);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};
