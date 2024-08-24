const mongoose = require("mongoose");

const leaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

const Lease = mongoose.model("Lease", leaseSchema);
module.exports = Lease;
