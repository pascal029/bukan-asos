<script>
    import {mapWritableState, mapState, mapActions} from 'pinia'
    import { useCounterStore } from '../stores/counter';
    import CardProducts from '../components/cardProducts.vue';
    import HomeSearch from '../components/homeSearch.vue';

    export default {
    data (){
        return {
            homeProduct : []
        }
    },
    computed: {
        ...mapWritableState(useCounterStore, ["isLoggedIn", "products", "page", 'filterPriceMax', 'filterPriceMin', 'loading']),
        
    },
    methods: {
        ...mapActions(useCounterStore, ["renderProducts"]),

        paginationMin(){
            this.loading = true
            this.page--
            const value = {
                page : this.page,
                filterPriceMax : this.filterPriceMax ? this.filterPriceMax : '',
                filterPriceMin : this.filterPriceMin ? this.filterPriceMin : ''
            }           
            setTimeout(() => {
                this.renderProducts(value)
                this.loading = false
            }, 1000);
        },
        paginationPlus(){
            this.loading = true
            this.page++     
            const value = {
                page : this.page,
                filterPriceMax : this.filterPriceMax ? this.filterPriceMax : '',
                filterPriceMin : this.filterPriceMin ? this.filterPriceMin : ''
            }       
            setTimeout(() => {
                this.renderProducts(value)
                this.loading = false
            }, 1000);
        }
    },
    async created() {
        await this.renderProducts({page : this.page})
        this.homeProduct.push(this.products.rows[0],this.products.rows[1], this.products.rows[2])
    },
    components: { CardProducts, HomeSearch }
}
</script>

<template>
    <HomeSearch />
    <div class="container mt-2 mb-2 text-center">
        <h1>New Arrivals</h1>
    </div>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
            </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img :src="homeProduct[0].imgUrl" class="d-block w-25" alt="...">
            </div>
        <div class="carousel-item">
            <img :src="homeProduct[1].imgUrl" class="d-block w-25" alt="...">
        </div>
        <div class="carousel-item">
            <img :src="homeProduct[2].imgUrl" class="d-block w-25" alt="...">
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>
    
    
    <div class="d-flex justify-content-center">           
        <div class="col-md-9 p-3">
            <div class="control-box p-2 breadcrumb ms-3">
                <CardProducts 
                    v-for="product in products.rows" 
                    :key="product.id" 
                    :product="product" 
                />
            </div>
            <div class="col-12 text-center">
                <button @click.prevent="paginationMin" v-if="page > 1" class="btn btn-outline-dark">Previous</button>
                <h7 class="me-3 ms-3">PAGE : {{page}}</h7>
                <button @click.prevent="paginationPlus" class="btn btn-outline-dark" v-if="products.rows.length % 8 < 1">Next</button>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
body{
    background-color: bisque;
    margin: 0 auto
}
.carousel-inner .carousel-item img {
    margin: auto;
    height: 50vh;
    width : 100vh
}

.carousel-inner .carousel-item.active img{
    margin: auto;
    height: 50vh;
    width : 100vh
}
</style>