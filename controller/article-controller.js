import Article from '../models/article-model.js'


export const  getArticles = async(request,response) =>{
    
    try{
        let  article =  await Article.find();
        response.status(200).json(article);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
    
}

export const  addArticles = async (request,response) =>{
    const article = request.body;
    const newArticle= new Article (article);

    try{
         await newArticle.save();
        response.status(201).json(newArticle);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }

}

export const getArticleById = async (request, response) => {
    try{
        const article = await Article.findById(request.params.id);
        response.status(200).json(article);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const editArticle = async (request, response) => {
    let article = await Article.findById(request.params.id);
    article = request.body;

    const editArticle = new Article(article);
    try{
        await Article.updateOne({_id: request.params.id}, editArticle);
        response.status(201).json(editArticle);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

export const deleteArticle = async (request, response) => {
    try{
        await Article.deleteOne({_id: request.params.id});
        response.status(201).json("Article deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

