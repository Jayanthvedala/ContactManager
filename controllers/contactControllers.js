const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public 
const getContacts = asyncHandler(async (req,res) =>{
    const contacts =   await Contact.find();
    res.status(200).json(contacts);
});
//@desc Create New contacts
//@route POST /api/contacts
//@access public 
const createContact = asyncHandler(async (req,res) =>{
    console.log("The request body is:", req.body);
    const {name, email, phone} = req.body;
    const checkContact=await Contact.find({phone});
    if(checkContact.length>0){
        res.status(400);
        throw new Error("User already exist");
    }
    if (!name || !email|| !phone ){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    if(phone.length<10){
        res.status(400);
        throw new Error("type a proper phone number");
    }
    for(let i=0;i<phone.length;i++){
    
      if(c>= 48 && c<=57){
        continue;
      }
      else{
        throw new Error("type a proper phone number");
      }  
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

//@desc GET contacts
//@route GET /api/contacts/:id
//@access public 
const getContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//@desc Update  contact
//@route PUT/api/contacts/:id
//@access public 
const UpdateContact = asyncHandler(async (req,res) =>{
  const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
    
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public 
const deleteContact = asyncHandler(async (req,res) =>{
  const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    await Contact.remove();
    res.status(200).json(contact);
});

module.exports = {
    getContacts, 
    createContact,
    getContact,
    UpdateContact,
    deleteContact
};
