
import Facture from '../models/Facture-model.js'




export const  getFactures = async(request,response) =>{
    
    try{
        let  Facture =  await Facture.find();
        response.status(200).json(Facture);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
    
}

export const  addFactures = async (request,response) =>{
    const Facture = request.body;
    const newFacture= new Facture (Facture);

    try{
         await newFacture.save();
        response.status(201).json(newFacture);
        console.log("facture ajouté")
    } catch (error){
        response.status(409).json({ message: error.message});   
        console.log("echec d'ajout de la facture")  
    }

}

export const getFactureById = async (request, response) => {
    try{
        const invoice = await Invoice.findById(request.params.id);
        response.status(200).json(invoice);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const editInvoice = async (request, response) => {
    let invoice = await Invoice.findById(request.params.id);
    invoice = request.body;

    const editInvoice = new Invoice(invoice);
    try{
       
        await Invoice.updateOne({_id: request.params.id}, editInvoice);
        response.status(201).json(editInvoice);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

export const deleteInvoice = async (request, response) => {
    try{
        await Invoice.deleteOne({_id: request.params.id});
        response.status(201).json("Invoice deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
export const getAllFactures = async (request, response) => {
    try {
        const factures = await Facture.find();
        response.status(200).json(factures);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
}