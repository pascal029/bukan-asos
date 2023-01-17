<script>
    import {mapActions} from 'pinia'
    import { useCounterStore } from '../stores/counter';
    export default {
        data(){
            return {
                from : this.fromWish ? 'wish' : 'products'
            }
        },
        props : ['product', 'fromWish'],
        methods : {
            ...mapActions(useCounterStore,['addWishlist'])
        },
        computed : {
            shownPrice(){
                return this.product.price.toLocaleString("id-ID", {style:"currency", currency:"IDR"})
            }
        }
    }
</script>

<template>
    <div class="card mb-3 me-3" style="width: 18rem;" >
        <img :src="product.imgUrl" class="card-img-top" alt="...">
            <div class="card-body">
                <router-link :to="`/products/${product.id}`" style="text-decoration:none" class="card-title text-primary">{{product.name}}</router-link>
                <p class="card-text">Size : {{product.description}}</p>
                <p class="card-text">{{shownPrice}}</p>
                <a href="#" class="btn btn-outline-dark" @click.prevent="addWishlist(product.id)" v-if="from == 'products'">Add to wishlist</a>
            </div>
    </div>
</template>