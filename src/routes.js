import Users from "./components/User/Users.vue";
import UsersList from "./components/User/UsersList.vue";
import UserEdit from "./components/User/UserEdit.vue";
import UserAdd from './components/User/UserAdd.vue';

export const routes = [
  { path: "/",  component:Users , children:[

    {path: "", component: UsersList },
    {path: "add", component:UserAdd, name:'UserAdd'},
    {path: ":id/edit", component: UserEdit, name: 'UserEdit', beforeEnter:(to,from,next)=>{
      next();
      
    }}

  ]  },
  { path:"*", redirect:"/"}
];


//NOTES
//for route params. to make optional use ?
// path * will catch all and redirect to base
// beforeEnter(to,from,next) can be used in a specific route as show for /users/:id:/edit
// beforeRouteEnter can also be added on the component and can be seen on UsersEdit componenet