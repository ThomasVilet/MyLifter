
<template>
    <div class="profile-page">
        <!-- profile card -->
        <div class="profile-info">
            <UserProfileCard :user="getUser"/>
        </div>
        <div class="profile-posts">
            <LiftCard :post="post" v-for="(post, index) in getPostsByUser" :key="index"/>
        </div>
    </div>
    

</template>

<script>
    import LiftCard from '@/components/Feed/LiftCard.vue';
    import UserProfileCard from '@/components/Profile/UserProfileCard.vue';

    import { useUserStore } from '@/stores/user';
    import { usePostStore } from '@/stores/post';
    import { mapState, mapActions } from 'pinia';

    export default{
        name: 'ProfileView',
        components: {
            LiftCard,
            UserProfileCard
        },
        computed: {
            ...mapState(useUserStore, ['getUser', 'getSelectedUser']),
            ...mapState(usePostStore, ['getPostsByUser']),
        },
        methods: {
            ...mapActions(usePostStore, ['setPostsByUser']),
            ...mapActions(useUserStore, ['setSelectedUser'])
        },
        async created(){
            await this.setSelectedUser(this.getUser.id);
            await this.setPostsByUser(this.getUser.id);
        }
    }
</script>

<style scoped>
    .profile-page {
        margin: 0 auto;
        max-width: 1200px;
        padding: 0 20px;
        .profile-info {
            margin-bottom: 10px;
        }
        .profile-posts {
            border-top: 1px solid black;
            padding: 5px 0 0 0;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

    
    }
</style>