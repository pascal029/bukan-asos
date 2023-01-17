<script>
    import {mapState, mapActions} from 'pinia'
    import { useCounterStore } from '../stores/counter';
import CardProducts from '../components/cardProducts.vue';

    export default {
    data(){
        return {
            fromWish : 'fromWish'
        }
    },
    computed: {
        ...mapState(useCounterStore, ["wishlist"])
    },
    methods: {
        ...mapActions(useCounterStore, ["renderWishlist"])
    },
    created() {
        this.renderWishlist();
    },
    components: { CardProducts }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h1>WISHLIST</h1>
            </div>
            <div class="col-md-12 p-3">
                <div class="col-12 p-2 breadcrumb ms-3">
                    <CardProducts 
                        v-for="wish in wishlist" 
                        :key="wish.id" 
                        :product="wish.Product" 
                        :fromWish="fromWish"
                    />
                </div>
                
            </div>
        </div>
    </div>
    
    
</template>