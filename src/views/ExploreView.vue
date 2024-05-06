<template>
    <div class="explore-page">
        <div class="container">
            <div class="explore-header">
                <h2>Search Lifters</h2>
            </div>
            <div class="search-container">
                <SearchIcon />
                <input v-model="exploreSearch" @input="searchUsers" placeholder="Search Lifters"/>
            </div>
            <div class="explore-body">
                <!-- Profile Card Here -->
                <ProfileCard :user="user" v-for="(user, index) in exploreList" :key="index"/>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileCard from '@/components/Explore/ProfileCard.vue';
import SearchIcon from '@/assets/Icons/search.svg';

import db from "@/Firebase/init.js";
import { doc, query, where, getDoc, getDocs, setDoc, collection, orderBy, startAt, endAt } from 'firebase/firestore';

export default{
    name: 'ExploreView',
    components: {
        ProfileCard,
        SearchIcon
    },
    data(){
        return {
            exploreList: [],
            exploreSearch: null
        }
    },
    methods: {
        async searchUsers() {
            if (!this.exploreSearch) {
                this.exploreList = [];
                return;
            }
            const q = query(collection(db, 'User'),
                orderBy('username'),
                startAt(this.exploreSearch),
                endAt(this.exploreSearch + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            const users = [];
            querySnapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    username: doc.data().username,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    lifts: doc.data().liftCount
                });
            });
            this.exploreList = users;
        },
    }
}
</script>

<style scoped>
    .explore-page {

        .container {
            width: 1200px;

            .explore-header {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 10px;
                margin-bottom: 10px;
                border-bottom: 1px solid black;
            }
            .search-container {
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid black;
                border-radius: 15px;
                padding: 5px 10px;
                background-color: #fff;
                width: 300px;
            }

            .search-container input {
                flex: 1;
                border: none;
                outline: none;
                padding: 5px;
                font-size: 16px;
            }
        }
}
</style>