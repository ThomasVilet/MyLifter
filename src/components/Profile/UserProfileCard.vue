<template>
    <div class="card-info">
        <div class="card-header">
            <img class="picture">
            <h2>{{ user.username }}</h2>
        </div>
        <div class="card-body">
            <div class="user-info">
                <h3>{{ user.firstName }} {{ user.lastName }}</h3>
                <h3>Following: {{ user.followingCount }}</h3>
                <h3>Lifts: {{ user.liftCount }}</h3>
            </div>
            <div class="user-extra">
                <p>Description: {{ user.description }}</p>
                <p>Goal: {{ user.goal }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from '@/stores/user';
import { usePostStore } from '@/stores/post';
import { mapState, mapActions } from 'pinia';

import editIcon from '@/assets/Icons/edit.svg';

export default {
    name: 'userProfileCard',
    props: ['user'],
    components: {
        editIcon
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapState(useUserStore, ['getSelectedUser', 'getUser']),
        
    },
    computed: {
        
    },
    
}
</script>

<style scoped>
    .card-info {
        display: flex;
        flex-direction: column;

        .card-header {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 12px 20px;
            border-bottom: 1px solid white;
            background-color: rgb(45, 100, 182);
            color: white;
            border-radius: 8px 8px 0 0;
            .picture {
                position: initial;
                width: 40px;
                height: 40px;
                background-color: white;
                color: #303030;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            h2 {
                flex: 1;
                margin-left: 24px;
            }
        }
        .card-body {
            
            .user-info {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                margin-left: 20px;
                h3 {
                    margin-right: auto;
                }
            }
            .user-extra {
                display: flex;
                flex-direction: column;
                margin-left: 20px;
            }
        }
    }
</style>