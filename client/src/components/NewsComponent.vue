<template>
  <div class="container">
    <h1>Latest News</h1>
    <!-- ADD NEWS HERE -->
    <div class="add-news">
      <label for="title_input">Title :</label>
      <input type="text" id="title_input" v-model="title" placeholder="News Title">
      <br>
      <label for="author_input">Author :</label>
      <input type="text" id="author_input" v-model="author" placeholder="News Author">
      <br>
      <label for="category_input">Category :</label>
      <input type="text" id="category_input" v-model="category" placeholder="News Category">
      <br>
      <label for="content_input">Content :</label>
      <input type="text" id="content_input" v-model="content" placeholder="News Content">
      <br>

      <button v-on:click="addNews()">Add News</button>
    </div>
    <!-- SHOW NEWS -->
    <hr>
    <p class="error" v-if="error">{{ error }}</p>

    <div class="news-container">
      <div class="news-singular"
        v-for="(theNews, index) in news" 
        v-bind:item="theNews" 
        v-bind:index="index" 
        v-bind:key="theNews.id">
          <h2 class="title">{{theNews.title}}</h2>
          <h3 class="author">{{theNews.author}}</h3>
          <h3 class="category">{{theNews.category}}</h3>
          <p class="content">{{theNews.content}}</p>
          <button class="delete" v-on:click="deleteNews(theNews.id)">Delete</button>
          <button class="" v-on:click="updateNews(theNews.id)">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import NewsService from '../NewsService'

export default {
  name: 'NewsComponent',
  data(){
    return {
      news: [],
      error: '',
      title: '',
      author: '',
      category: '',
      content: ''
    }
  },

  created(){
    try{
      NewsService.getNews()
      .then((result) =>{
        console.log(result)
        this.news= result
      });
    }
    catch(err){
      this.error = err.message;
    }
  },
  methods: {
    async addNews(){
      try{
        await NewsService.addNews(this.title, this.author, this.category, this.content);
        NewsService.getNews()
          .then((result) =>{
            console.log(result)
            this.news= result
          });
      }
      catch(err){
        console.log(err);
      }
    },

    async deleteNews(id){
      try{
        await NewsService.deleteNews(id);
        NewsService.getNews()
          .then((result) =>{
            console.log(result)
            this.news= result
          });
      }
      catch(err){
        console.log(err);
      }
    },

    async updateNews(id){
      try{
        await NewsService.updateNews(id);
        NewsService.getNews()
          .then((result) =>{
            console.log(result)
            this.news= result
          });
      }
      catch(err){
        console.log(err);
      }
    }    
  }
}
</script>

<style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .error{
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding:  10px;
    margin-bottom: 15px;
  }

  .news-singular {
    position: relative;
    border: 1px solid #070d58;
    background-color: #9095da;
    padding : 10px 10px 30px 10px;
    margin-bottom: 15px;
  }

  .title{
    text-align: left;
    color : #1cd18c;
    font-size :xx-large;
  }

  .author{
    text-align: left;
    color : black;
    font-weight :bold;
    font-size : large;
  }
  .category{
    text-align: left;
    color : black;
    font-weight :bold;
    font-size : large;
  }

  .content{
    text-align: justify;
    color : black;
    font-weight: normal;
    font-size: medium;
  }
</style>
