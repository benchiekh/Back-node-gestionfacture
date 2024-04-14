import Contact from '../models/contact-model.js'


export const  getContacts = async(request,response) =>{
    
    try{
        let  contact =  await Contact.find();
        response.status(200).json(contact);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
    
}

export const  addContacts = async (request,response) =>{
    const contact = request.body;
    const newContact= new Contact (contact);

    try{
         await newContact.save();
        response.status(201).json(newContact);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }

}

export const getContactById = async (request, response) => {
    try{
        const contact = await Contact.findById(request.params.id);
        response.status(200).json(contact);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const editContact = async (request, response) => {
    let contact = await Contact.findById(request.params.id);
    contact = request.body;

    const editContact = new Contact(contact);
    try{
        await Contact.updateOne({_id: request.params.id}, editContact);
        response.status(201).json(editContact);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

export const deleteContact = async (request, response) => {
    try{
        await Contact.deleteOne({_id: request.params.id});
        response.status(201).json("Contact deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
