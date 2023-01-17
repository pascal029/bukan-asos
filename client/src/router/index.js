import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Product from "../views/Product.vue"
import Wishlist from "../views/Wishlist.vue"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import NotFound from '../views/NotFound.vue'


const routes = [
  {path: '/', name : 'home', component : Home},
  {path: '/wishlist', name : 'wishlist', component : Wishlist},
  {path: '/register', name : 'register', component : Register},
  {path: '/login', name : 'login', component : Login},
  {path: '/products/:id', name : 'product', component : Product},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  
]

const router = createRouter({
  history : createWebHistory(),
  routes
})

router.beforeEach((to,from,next) =>{
  const isLoggedIn = localStorage.access_token ? true : false 
  if(to.name == 'login' && isLoggedIn == true){
    next('/')
  } else if(to.name == 'wishlist' && isLoggedIn == false){
    Swal.fire('Please login first')
    next('/login')
  } else{
    next()
  }
})


export default router
