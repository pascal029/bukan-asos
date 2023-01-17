<script>
    import { mapState , mapActions} from 'pinia'
    import { useCounterStore } from '../stores/counter';
import CardProducts from '../components/cardProducts.vue';
    
    export default {
    computed: {
        ...mapState(useCounterStore, ["qr", "product"]),
        shownPrice(){
            return this.product.price.toLocaleString("id-ID", {style:"currency", currency:"IDR"})
        }
    },
    created() {
        this.renderDetailProduct(this.$route);
    },
    methods: {
        ...mapActions(useCounterStore, ["renderDetailProduct", 'addWishlist'])
    },
    components: { CardProducts }
}
</script>

<template>
    <div class="container mt-3">
        <h3>Product : {{product.name}}</h3>
    </div>
    <div class="container mt-3 ">
        <div class="col-12">
            <div class="row">
                <div class="col-9  me-3">
                    <img :src="product.imgUrl" class="mb-3 mt-3 ms-2" style="height:50vh;width:50vw">
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-5 ms-3 mt-3 mb-3">
                        <p>Size : {{product.description}}</p>
                        <p>Stock : {{product.stock}}</p>
                        <p>Price : {{shownPrice}}</p>
                        <button class="btn btn-primary" @click.prevent="addWishlist(product.id)">Add to your wishlist</button>
                    </div>
                    <div class="col-6 mb-3">
                        <p>Share this product to your friends</p>
                        <img :src="qr" style="height:180px;width:180px;">
                    </div>
        </div>
    </div>
    

</template>