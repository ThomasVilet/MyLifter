<template>
    <div class="feed-page">
        <div class="container">
            <div class="feed-info">
                <div class="feed-header">
                    <h2>Recent Posts</h2>
                </div>
                <div class="feed-active-users">

                </div>
                <div class="feed-body">
                    <LiftCard :post="post" v-for="(post, index) in getAllPosts" :key="index"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LiftCard from "@/components/Feed/LiftCard.vue";
import { mapState, mapActions } from 'pinia';
import { usePostStore } from '@/stores/post.js';

export default {
    name: 'feedView',
    components: {
        LiftCard
    },
    computed:{
        ...mapState(usePostStore, ['getPosts', 'getAllPosts']),
        
    },
    methods: {
        ...mapActions(usePostStore, ['setPostsByAll', 'setPostsByFollowing']),
    },
    
}
</script>

<style scoped>
    .feed-page {

        .container {
            width: 1200px;
            
            .feed-info {

                .feed-header {
                    display: flex;
                    justify-content: center;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid black;
                    
                }
                /* .feed-active-users {

                } */
                .feed-body {
                    display: flex;
                    flex-wrap: wrap; /* Allow items to wrap to new rows */
                    justify-content: space-between; /* Add space between items */
                    margin-left: -5px; /* Compensate for the space between items */
                    margin-right: -5px; /* Compensate for the space between items */

                    /* Set width to 33.33% to fit three items per row */
                    > * {
                        width: calc(33.33% - 10px); /* Subtract margin */
                        margin: 5px 0 10px 0; /* Add space between items */
                    }
                }
            }
        }
    }


</style>