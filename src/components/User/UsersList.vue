<template><div>
  <h2 class="line-container">
  
        <span v-if="Users.length>0">All Users</span>
        <span v-if="Users.length==0">There are no Users. Please add some.</span>
        </h2><hr>


  <div class="columns is-multiline">
    <div v-for="(User, index) in Users"  class="column is-half">
    
    <div class="card">
  <div class="card-content">
    <p class="title" style="margin-bottom:40px;">
     {{User.name}} 
    </p>
     <p class="subtitle">
      Age: {{User.age}}
    </p>
    <p class="subtitle">
      Email: {{User.email}}
    </p>
  </div>
  <footer class="card-footer">
    <p class="card-footer-item">
      <span>
        <a @click="editUser(index)">Edit</a>
      </span>
    </p>
    <p class="card-footer-item">
      <span>
        <a @click="deleteUser(index)">Delete</a>
      </span>
    </p>
  </footer>
</div>
    </div>
</div>
</div>
</template>
<script>
import { getArrayOfUsers } from "../../StorageHelper.js";
import { deleteUserFromArray } from "../../StorageHelper.js";
import alertifyjs from "alertifyjs";

export default {
  name: "UsersList",
  data() {
    return {
      Users: []
    };
  },

  methods: {
    editUser(index) {
      this.$router.push(index + "/edit");
    },
    deleteUser(index) {
      alertifyjs.confirm(
        "Delete user?",
        function() {
          deleteUserFromArray(index);
          alertifyjs.success("User Deleted!");
          this.Users = getArrayOfUsers();
        }.bind(this)
      );
    }
  },
  created() {
    this.Users = getArrayOfUsers();
  }
};
</script>
<style>
.line-container {
  position: relative;
  text-align: center;
}
.line-container:before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  top: 50%;
  width: 100%;
  border-bottom: 3px solid whitesmoke;
}
.line-container span {
  text-align: center;
  background-color: white;
  padding: 0 1em;
}
</style>
