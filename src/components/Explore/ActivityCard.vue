<!-- This card handles logistics about following/unfollowing, viewing calendar, editProfile/Message User -->
<template>
    <div class="activity-card">
        <div class="activity-bar">
            <div class="activity-element">
                <div class="follow-button">
                    <!-- Change Follow to Following when following -->
                    <button class="follow" @click="follow(user.id)" v-show="!isUserFollowed">Follow</button>
                    <!-- Hide Unfollow if not followed -->
                    <button class="unfollow" @click="unfollow(user.id)" v-show="isUserFollowed">Unfollow</button>
                </div>
            </div>
            <div class="activity-element">
                <div class="calendar-button">
                    <button>View Calendar</button>
                </div>
            </div>
            <div class="activity-element">
                <div class="message-user-button">
                    <button>Message User</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { useUserStore } from '@/stores/user';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'activityCard',
    props: ['user'],
    components: {

    },
    data(){
        return {

        }
    },
    methods: {
        ...mapActions(useUserStore, ['follow', 'unfollow'])
    },
    computed: {
        ...mapState(useUserStore, ['getFollowing']),
        isUserFollowed(){
            return this.getFollowing.some(followedUser => followedUser.userId === this.user.id);
        }
    }
}
</script>

<style scoped>
    .activity-card {
        .activity-bar {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            .activity-element {

                .follow-button {

                    .follow {
                        background-color: rgb(45, 100, 182);
                        align-self: center;
                        width: fit-content;
                        
                    }
                    .unfollow {
                        background-color: white;
                        color: rgb(45, 100, 182);
                        border: 1px solid rgb(45, 100, 182);
                        align-self: center;
                        width: fit-content;
                        
                    }
                }
                .calendar-button {
                    button {
                        background-color: rgb(45, 100, 182);
                        align-self: center;
                        width: fit-content;
                        
                    }
                }
                .message-user-button {
                    button {
                        background-color: rgb(45, 100, 182);
                        align-self: center;
                        width: fit-content;
                        
                    }
                }
            }
        }
    }
</style>