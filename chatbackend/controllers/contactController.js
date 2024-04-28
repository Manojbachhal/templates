const ContactModal = require('../models/ContactsModals');
const User = require('../models/userModal');

const addContact = async (req, res) => {
    const userId = req.user._id;
    const contactUserId = req.body.userId;

    const user = await User.findById(userId).select('name email pic');
    const contactUser = await User.findById(contactUserId).select('name email pic');

    console.log(user)
    try {
        // let isContact = await ContactModal.findOne({
        //     $and: [
        //         { contacts: { $elemMatch: { $eq: userId } } },
        //         { contacts: { $elemMatch: { $eq: contactUserId } } }
        //     ]
        // }).populate({
        //     path: 'contacts',
        //     select: 'name email pic'
        // });

        let isContact = await ContactModal.findOne({
            $and: [
                { contacts: { $elemMatch: { $eq: userId } } },
                { contacts: { $elemMatch: { $eq: contactUserId } } }
            ]
        });
        if (!isContact) {
            isContact = await ContactModal.create({ contacts: [user, contactUser] });
            res.status(200).json({ message: "Contact added successfully", data: isContact });
           
        } else {
            res.status(200).json({ message: "Contact already exists", data: isContact });
        }

    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};




// getcontacts 
const getContact = async (req, res) => {
    const userId = req.user._id;
    try {
        const allContact = await ContactModal.find({
            $and: [
                { contacts: { $elemMatch: { $eq: userId } } },
            ]
        }).populate({
            path:'contacts',
            select:'name email pic'
        })
      
        res.status(200).json({ message: 'Contacts found', contacts: allContact });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    addContact,getContact
};
