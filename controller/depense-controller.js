import depense from '../models/depense-model.js'


export const  getdepenses = async(request,response) =>{
    
    try{
        let  depense =  await depense.find();
        response.status(200).json(depense);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
    
}

export const  adddepenses = async (request,response) =>{
    const depense = request.body;
    const newdepense= new depense (depense);

    try{
         await newdepense.save();
        response.status(201).json(newdepense);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }

}

export const getdepenseById = async (request, response) => {
    try{
        const depense = await depense.findById(request.params.id);
        response.status(200).json(depense);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const editdepense = async (request, response) => {
    let expense = await Expense.findById(request.params.id);
    expense = request.body;

    const editExpense = new Expense(expense);
    try{
        await Expense.updateOne({_id: request.params.id}, editExpense);
        response.status(201).json(editExpense);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

export const deleteExpense = async (request, response) => {
    try{
        await Expense.deleteOne({_id: request.params.id});
        response.status(201).json("Expense deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
