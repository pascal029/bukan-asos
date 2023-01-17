import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    isLoggedIn: localStorage.access_token ? true : false,
    products: {},
    basedUrl: "http://localhost:3000",
    page: 1,
    filterPriceMin: "",
    filterPriceMax: "",
    filterName: "",
    wishlist: [],
    qr: {},
    product: {},
    loading: false,
  }),

  actions: {
    logout() {
      this.loading = true;
      setTimeout(() => {
        localStorage.clear();
        Swal.fire("Logout Success");
        this.isLoggedIn = false;
        this.router.push("/");
        this.loading = false;
      }, 1000);
    },
    async register(inputValue) {
      try {
        this.loading = true;
        const { data } = await axios({
          url: this.basedUrl + "/pub/register",
          method: "post",
          data: inputValue,
        });
        setTimeout(() => {
          Swal.fire("Register Success");
          this.router.push("/login");
          this.loading = false;
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          Swal.fire(error.response.data.message);
          this.loading = false;
        }, 1000);
      }
    },
    async login(inputValue) {
      try {
        this.login = true;
        const { data } = await axios({
          url: this.basedUrl + "/pub/login",
          method: "post",
          data: inputValue,
        });
        setTimeout(() => {
          localStorage.setItem("access_token", data.access_token);
          this.isLoggedIn = true;
          Swal.fire("Login Success");
          this.router.push("/");
          this.loading = false;
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          Swal.fire(error.response.data.message);
          this.loading = false;
        }, 1000);
      }
    },
    async renderProducts(params) {
      try {
        const { data } = await axios({
          url: this.basedUrl + "/pub/products",
          method: "get",
          params: params,
        });
        this.products = data;
      } catch (error) {
        setTimeout(() => {
          Swal.fire(error.response.data.message);
          this.loading = false;
        }, 1000);
      }
    },

    async renderWishlist() {
      try {
        const { data } = await axios({
          url: this.basedUrl + "/pub/products/wishlists",
          method: "get",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.wishlist = data;
      } catch (error) {
        setTimeout(() => {
          Swal.fire(error.response.data.message);
          this.loading = false;
        }, 1000);
      }
    },

    async renderDetailProduct(parameters) {
      try {
        const { data } = await axios({
          url: this.basedUrl + `/pub/products/${parameters.params.id}`,
          method: "get",
          params: {
            url: this.basedUrl + parameters.path,
          },
        });

        this.qr = data.data.qrcode;
        this.product = data.product;
      } catch (error) {
        setTimeout(() => {
          Swal.fire(error.response.data.message);
          this.loading = false;
        }, 1000);
      }
    },

    async addWishlist(inputValue) {
      try {
        this.loading = true;
        const { data } = await axios({
          url: this.basedUrl + `/pub/products/wishlists`,
          method: "post",
          data: {
            id: inputValue,
          },
          headers: {
            access_token: localStorage.access_token,
          },
        });
        setTimeout(() => {
          Swal.fire("Success to add the products to your wishlist");
          this.loading = false;
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          Swal.fire(error.response.data.message);
          this.loading = false;
        }, 1000);
      }
    },

    async handleCredentialResponse(response) {
      try {
        this.loading = true;
        const { data } = await axios({
          method: "POST",
          url: this.basedUrl + "/pub/google",
          headers: {
            google_token: response.credential,
          },
        });
        setTimeout(() => {
          localStorage.setItem("access_token", data.access_token);
          Swal.fire("login success");
          this.renderProducts();
          this.isLoggedIn = true;
          this.router.push("/");
          this.loading = false;
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          Swal.fire(error.response.data.message);
          this.loading = false;
        }, 1000);
      }
    },
  },
});
