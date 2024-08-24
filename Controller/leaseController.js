const Lease = require('../Model/leaseSchema');

// Lease details add
exports.addLease = async (req, res) => {
    console.log("Inside the addLease controller");

    // Destructuring the request body
    const { name, phonenumber, email, address } = req.body;
    const userId = req.payload; // Assuming `req.payload` contains the user ID

    console.log(name, phonenumber, email, address,  userId);

    try {
        // Check if a lease already exists with the same phone number and Aadhaar number
        const existingLease = await Lease.findOne({ name });

        if (existingLease) {
            return res.status(406).json({ message: "Lease already exists" });
        } else {
            // Creating a new lease instance
            const newLease = new Lease({
                name,
                phonenumber,
                email,
                address,
                userId
            });

            // Saving the new lease instance to the database
            await newLease.save();

            // Sending a successful response with the new lease data
            return res.status(200).json(newLease);
        }
    } catch (err) {
        // Handling errors and sending a failure response
        return res.status(500).json({ message: err.message });
    }
};


exports.getAllLease = async (req, res) => {
    try {
        const allLease = await Lease.find();
        res.status(200).json(allLease);
    } catch (err) {
        res.status(500).json("Failed to retrieve lease: " + err);
    }
}

//get one user lease 
exports.getOneUserLease = async (req, res) => {
  const userId = req.payload.userId; // Adjusted to req.payload.userId
  try {
    const oneUserLease = await Lease.find({ userId });
    res.status(200).json(oneUserLease);
  } catch (err) {
    res.status(500).json("Failed to retrieve lease: " + err);
  }
};

exports.leaseDelete = async (req, res) => {
    const { lid } = req.params;
    try {
        const deletedLease = await Lease.findOneAndDelete({ _id: lid });
        if (!deletedLease) {
            return res.status(404).json({ message: "Lease not found" });
        }
        res.status(200).json(deletedLease);
    } catch (err) {
        res.status(500).json({ message: "Failed to delete lease", error: err.message });
    }
};
