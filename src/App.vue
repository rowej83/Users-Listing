<template><div><h1>User Management</h1>
<div class="section">
<div class="container">
 <router-link :to="{name:'UserAdd'}" class="button is-primary full-size" active-class="is-active ">Add User</router-link>
<hr>
<Users/>
</div>
</div>
</div>
</template>

<script>
import Users from "./components/User/Users.vue";

export default {
  name: "App",
  components: {
    Users
  }
};
</script>

<style scoped>
h1 {
  font-size: 40px;
  text-align: center;
  margin-top: 20px;
}
.full-size {
  width: 100%;
}

.section {
  padding-top: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
}
</style >
