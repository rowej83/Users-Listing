<template><div>
  <h2 class="line-container">
        <span>Edit User</span>
        </h2><hr>
<div class="field is-horizontal">
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
        <input class="input" type="email" v-model="User.email" v-validate="'required|email'" name="email" placeholder="Email">
                     <span class="error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
      </p>
    </div>
  </div>
</div>

  <p class="" style="margin:0 auto;text-align:center;">
<button class="button is-primary" style="margin-right:10px;"  @click="saveUser()" :disabled="enableCreate">Save</button><router-link to="/" class="button">Cancel</router-link>
  </p>


</div>
</template>
<script>
import { returnUserByIndex } from "../../StorageHelper.js";
import { validUserIndex } from "../../StorageHelper.js";
import { updateUser } from "../../StorageHelper.js";
import { User } from "../../UserClass.js";
import alertifyjs from "alertifyjs";

export default {
  name: "UserEdit",
  data() {
    return {
      index: "",
      User: {
        name: "",
        age: "",
        email: ""
      }
    };
  },
  methods: {
    saveUser() {
      alertifyjs.confirm(
        "Update user?",
        function() {
          let updatedUser = {
            index: this.index,
            User: new User(this.User.name, this.User.age, this.User.email)
          };
          updateUser(updatedUser);
          alertifyjs.success("User Updated!");
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
  watch: {
    $route(to, from) {
      this.index = to.params.id;
    }
  },
  created() {
    this.index = this.$route.params.id;
    let user = returnUserByIndex(this.index);
    this.User.name = user.name;
    this.User.age = user.age;
    this.User.email = user.email;
    //get user by index
  },
  beforeRouteEnter(to, from, next) {
    // this.id <-- will not work since componenet isn't technially created yet.
    // checks if the user may of manually added a bad user index. If it did it will reroute to base url /
    if (validUserIndex(to.params.id)) {
      next();
    } else {
      next("/");
    }
    // in special case can do next(vm=>{vm.id}); to create a call back that can then
    // access the data id
  },
  beforeRouteLeave(to, from, next) {
    // this.id is accessible since this lifecycle hook has the component already created.
    next();
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

// NOTES
// if beforeRouteEnter is used, the properties in data will not be accessible 
// because the component hasn't been created yet. i.e. this.id


// beforeRouteLeave(to,from,next) can only be added on the component leave and not global or route level
