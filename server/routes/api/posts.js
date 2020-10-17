const express = require('express');
const {Pool, Client} = require('pg');

const router = express.Router();
const connection = "postgressql://postgres:12345678@localhost:5432/news_database"

const client = new Client({
    connectionString: connection
})

client.connect()


//Get News
router.get('/', async (req, res) => {
    const news = await loadNews();
    res.send(await news.rows)
});

//Add News
router.post('/', async (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const category = req.body.category;
    const content = req.body.content;

    await insertNews(title, author, category, content);
    res.status(201).send();
})

//Delete News
router.delete('/:id', async (req, res) => {
    await deleteNews(req.params.id);
    res.status(200).send();
})

//Update News
router.post('/:id', async (req, res) => {
    await updateNews(req.params.id);
    res.status(204).send()
})

//================Query Function============//
async function loadNews(){
    const result = await client.query({
        text: 'SELECT * FROM public.news;'
    })

    return result;
}

async function insertNews(title, author, category, content){
    const query = 'INSERT INTO public.news(title, author, category, content) VALUES ($1, $2, $3, $4)';
    const value = [title, author, category, content]

    client.query(query, value, (err, res) => {

    });
}

async function deleteNews(id){
    const query = 'DELETE FROM public.news WHERE id = $1';
    const value = [id]

    client.query(query, value, (err, res) => {

    })
}

async function updateNews(id, title, author, category, content){
    const query = 'UPDATE public.news SET title=$2, author=$3, category=$4, content=$5 WHERE id=$1';
    const values = [id, title, author, category, content];

    client.query(query, values, (err, res) => {

    })
}

module.exports = router;