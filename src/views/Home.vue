<template>
  <div class="home">
    <HelloWorld :msg="`Welcome ${user.username}`"/>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data() {
    let user = {};
    if (Cookie.get('login_status')) {
      user = JSON.parse(Cookie.get('login_status'));
    }
    return {
      user,
    };
  },
};
</script>
