const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
})

const ContactModal = mongoose.model('contact',ContactSchema)
module.exports= ContactModal;