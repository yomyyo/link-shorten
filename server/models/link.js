const mongoose = require("mongoose");

//create a new mongoose schema
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    url: { type: String, required: true, unique: true },
    original: { type: String, required: true },
});

const Link = mongoose.model("Link", LinkSchema);

module.exports = Link;