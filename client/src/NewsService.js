//import { post } from "../../server/routes/api/posts/";
import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

export default class{
    //Get News
    static async getNews(){
            try{
                const res = await axios.get(url);
                const data = res.data;
                
                return data.map(news => ({
                    id : news.id,
                    title: news.title,
                    author: news.author,
                    category: news.category,
                    content: news.content
                })
                );
            }
            catch(err){
                console.log(err)
            }
    }

    //Add News
    static async addNews(iTitle, iAuthor, iCategory, iContent){
        try{
            return await axios.post(url, {
            title: iTitle,
            author: iAuthor,
            category: iCategory,
            content: iContent
            })
        }
        catch(err){
            console.log(err)
        }
    }

    static async deleteNews(id){
        try{
            return await axios.delete(`${url}${id}`)
        }
        catch(err){
            console.log(err)
        }
    }

    static async updateNews(id, iTitle, iAuthor, iCategory, iContent){
        try{
            return await axios.post(url, {
            title: iTitle,
            author: iAuthor,
            category: iCategory,
            content: iContent
            })
        }
        catch(err){
            console.log(err)
        }
    }
}