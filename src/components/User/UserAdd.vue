<template>
<div>
<h2 class="line-container">
        <span>Add a new User</span>
        </h2><hr><div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Name</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control">
  <input class="input" type="text" v-model="User.name" name="name" v-validate="'required'" placeholder="Name">
        <span class="error" v-show="errors.has('name')">{{ errors.first('name') }}</span>
      
      </p>
    </div>
  </div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Age</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control">
             <input class="input" type="text" v-validate="'required|numeric'" name="age" v-model="User.age" placeholder="Age">
             <span  class="error" v-show="errors.has('age')">{{ errors.first('age') }}</span>
      </p>
    </div>
  </div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Email</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control">
        <input class="input" type="email" v-validate="'required|email'" name="email" v-model="User.email" placeholder="Email">
        <span class="error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
      </p>
    </div>
  </div>
</div>

      <p class="" style="margin:0 auto;text-align:center;">
        <button class="button is-primary" style="margin-right:10px;" :disabled="enableCreate" @click="saveUser()" >Create</button><router-link to="/" class="button">Cancel</router-link>

      </p>
  


</div>
  
</template>
<script>
import alertifyjs from "alertifyjs";
import { saveUserToLocalStorage } from "../../StorageHelper.js";
import { User } from "../../UserClass.js";

export default {
  name: "UserAdd",
  methods: {
    saveUser() {
      alertifyjs.confirm(
        "Save user?",
        function() {
          saveUserToLocalStorage(
            new User(this.User.name, this.User.age, this.User.email)
          );
          alertifyjs.success("User Saved!");
          this.$router.push("/");
        }.bind(this)
      );
    }
  },
  computed: {
    enableCreate() {
      if (
        this.errors.any() ||
        !this.User.name ||
        !this.User.age ||
        !this.User.email
      ) {
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      User: {
        name: "",
        age: "",
        email: ""
      }
    };
  }
};
</script>
<style>
.error {
  color: red;
}
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
@media screen and (min-width: 769px), print {
  .field-label {
    flex-basis: 0;
    flex-grow: 0.3;
    flex-shrink: 0;
    margin-right: 1.5rem;
    /* text-align: right; */
  }
}
</style>
