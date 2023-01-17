<script>
    import {mapActions, mapWritableState} from 'pinia'
import { useCounterStore } from '../stores/counter';

    export default {
        computed : {
            ...mapWritableState(useCounterStore,['filterPriceMin','filterPriceMax', 'page'])
        },
        methods : {
            ...mapActions(useCounterStore,['renderProducts']),

            renderFilterProducts(){
                this.page = 1
                this.renderProducts({page : this.page, filterPriceMax : this.filterPriceMax, filterPriceMin : this.filterPriceMin})
            }
        }
    }
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="container text-center">
            <div class="col-12">
                <form @submit.prevent="renderFilterProducts">
                    <label class="text-light" for="minprice">Search by Lowest Price</label>
                    <input type="text" id="minprice" class="ms-2 me-3" style="width:150px" v-model="filterPriceMin">
                    <label class="text-light" for="maxprice">Search by Highest Price</label>
                    <input type="text" id="maxprice" class="ms-2 me-3" style="width:150px" v-model="filterPriceMax">
                    <button type="submit" class="btn btn-light mt-1"> Search</button>
                </form>
            </div>
            
            
        </div>
    </nav>
</template>