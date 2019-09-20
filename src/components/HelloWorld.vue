<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>使用ELementUI</h3>
    <ul>
      <li><a href="https://element.eleme.cn" target="_blank" rel="noopener">ElementUI文档</a></li>
    </ul>
    <h3>创建工程使用</h3>
    <p>
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
  color: #409EFF;
}
</style>
