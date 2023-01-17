<script>
import {mapActions} from 'pinia'
import { useCounterStore } from '../stores/counter';
export default {
  methods : {
    ...mapActions(useCounterStore,['register'])
  },
  data(){
    return {
      email : '',
      password : '',
      username: '',
      phoneNumber : '',
      address : ''
    }
  }
}
</script>

<template>
    <div class="container mt-5">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form @submit.prevent="register({email,password,username,address,phoneNumber})">
                <div class="form-floating mb-3">
                    <input v-model="username" type="text" class="form-control" placeholder="johndoe21">
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="email" type="email" class="form-control" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="password" type="password" class="form-control" placeholder="password">
                    <label for="floatingPassword">Password</label>
                </div><div class="form-floating mb-3">
                    <input v-model="phoneNumber" type="text" class="form-control" placeholder="phone">
                    <label for="floatingPassword">Phone Number</label>
                </div><div class="form-floating mb-3">
                    <input v-model="address" type="textarea" class="form-control" placeholder="address">
                    <label for="floatingPassword">Address</label>
                </div>

                
                <div class="d-grid mt-5">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Register</button>
                <p class="text-center mt-2">Already have an account ? <RouterLink to="/login" style="text-decoration:none">Login Here</RouterLink></p>
                </div>
                
            
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    
</template>

<style scoped>
    body {
        background: #007bff;
        background: linear-gradient(to right, #0062E6, #33AEFF);
    }

    .btn-login {
        font-size: 0.9rem;
        letter-spacing: 0.05rem;
        padding: 0.75rem 1rem;
    }

    .btn-google {
        color: white !important;
        background-color: #ea4335;
    }

    .btn-facebook {
        color: white !important;
        background-color: #3b5998;
    }
</style>