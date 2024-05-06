<template>
    <div class="view-profile-page" v-if="getSelectedUser">
        <div class="container">
            <div class="profile">
                <div class="view-user">
                    <UserProfileCard :user="getSelectedUser" />
                    <ActivityCard :user="getSelectedUser"/>
                </div>
                <div class="view-info">
                    <LiftCard :post="post" v-for="(post, index) in getPostsByUser" :key="index"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LiftCard from '@/components/Feed/LiftCard.vue';
import UserProfileCard from '@/components/Profile/UserProfileCard.vue';
import ActivityCard from '@/components/Explore/ActivityCard.vue';

import { useUserStore } from '@/stores/user';
import { usePostStore } from '@/stores/post';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'viewProfile',
    components: {
        LiftCard,
        UserProfileCard,
        ActivityCard
    },
    computed: {
        ...mapState(usePostStore, ['getPostsByUser']),
        ...mapState(useUserStore, ['getSelectedUser']),
    },
    methods: {
        ...mapActions(usePostStore, ['setPostsByUser']),
        ...mapActions(useUserStore, ['setSelectedUser'])
    },
    async mounted(){
        try {
            const userId = this.$route.params.userId;
            console.log(userId);
            await this.setSelectedUser(userId);
            await this.setPostsByUser(userId);
            console.log(this.getPostsByUser);
        } catch (error) {
            console.error('Error filtering posts: ', error);
        }
    }
}
</script>

<style scoped>
    .profile {
        margin: 0 auto;
        max-width: 1200px;
        padding: 0 20px;
        .view-user {
            margin-bottom: 10px;
        }
        .view-info {
            border-top: 1px solid black;
            padding: 5px 0 0 0;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }
    }
</style>