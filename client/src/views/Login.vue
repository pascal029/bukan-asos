<script>
import {mapActions} from 'pinia'
import { useCounterStore } from '../stores/counter';
export default {
  methods : {
    ...mapActions(useCounterStore,['login', 'handleCredentialResponse'])
  },
  data(){
    return {
      email : '',
      password : ''
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
            <form @submit.prevent="login({email,password})">
                <div class="form-floating mb-3">
                    <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>

                
                <div class="d-grid mt-5">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">SIGN IN</button>
                <p class="text-center mt-2">Don't have an account yet ? <RouterLink to="/register" style="text-decoration:none">Register Here</RouterLink></p>
                </div>
                <hr class="my-4">
                <div class="d-grid mb-2 justify-content-center">
                  <GoogleLogin :callback="handleCredentialResponse"/>
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