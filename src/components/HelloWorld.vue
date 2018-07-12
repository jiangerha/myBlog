<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li v-for="item in articals">
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      articals:[]
    }
  },
  created(){
    this.getArticals()
  },
  mounted(){
    
  },
  methods:{
    getArticals(){
      var that = this
      $.ajax({
        url:"/api/getArticles",
        type:"GET",
        success(res){
          that.articals = JSON.parse(res);
          console.log(that.articals)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
