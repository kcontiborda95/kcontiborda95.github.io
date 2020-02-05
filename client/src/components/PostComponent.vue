<template>
  <div class="container">
    <h1>Available Courses</h1>
    <div class="create-post">
      <label for="create-post">Course Name: </label>
      <input type="text" id="create-post" v-model="course" placeholder="Create a course">
      <br>
      <label for="create-post">Location: </label>
      <input type="text" id="enter-location" v-model="location" placeholder="Enter the location">
      <br>
      <label for="create-post">Price: </label>
      <input type="text" id="enter-price" v-model="price" placeholder="Enter the price">
      <br>
      <label for="create-post">Provider: </label>
      <input type="text" id="enter-provider" v-model="provider" placeholder="Enter the provider">
      <br>
      <label for="create-post">author: </label>
      <input type="text" id="enter-provider" v-model="author" placeholder="Enter the author">
      
      <button v-on:click="createPost">Post</button>
    </div>  
    <hr>
    <p class ="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()+1}/${post.createdAt.getFullYear()}` }}
        <p class="text">Course: {{ post.course }}</p>
        <p class="text">Location: {{ post.location }}</p>
        <p class="text">Price: {{ post.price }}</p>
        <p class="text">Provider: {{ post.provider }}</p>
        <p class="text">Author: {{ post.author }}</p>
        <p><button v-on:click="deletePost(post._id)">X</button></p>
      </div>
    </div> 
  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      course: '',
      location: '',
      provider: '',
      author: ''
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts(); 
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.course, this.location, this.price, this.provider,this.author)
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
