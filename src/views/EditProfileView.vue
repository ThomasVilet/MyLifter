<template>
    <div class="profile">
        <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
        <div class="container">
            <h2>Edit Account</h2>
            <div class="profile-info">
                <!-- allow user to edit profile picture -->
                <div class="profile-picture"> {{ getUser.profilePicture }}</div>
                <div class="username">
                    <userIcon class="icon" />
                    {{ getUser.username }}
                </div>
                <div class="email">
                    <emailIcon class="icon" />
                    {{ getUser.email }}
                </div>
                <div class="input">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" v-model="user.firstName"/>
                </div>
                <div class="input">
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" v-model="user.lastName" />
                </div>
                <div class="input">
                    <label for="goal">Goal:</label>
                    <input type="text" id="goal" v-model="user.goal" />
                </div>
                <div class="input">
                    <label for="description">Description:</label>
                    <input type="text" id="description" v-model="user.description" />
                </div>
                <div class="input">
                    <label for="showProfile">Show Profile:</label>
                    <input type="checkbox" id="showProfile" v-model="user.isPublic" />
                </div>
                <button @click="editProfile">Save Changes</button>
            </div>
        </div>
    </div>
</template>

<script>

import Modal from '@/components/Modal/Modal.vue';
import userIcon from "@/assets/Icons/user.svg";
import emailIcon from "@/assets/Icons/email.svg";
import { useUserStore } from '@/stores/user';
import { mapState, mapActions } from 'pinia';

import db from "@/Firebase/init.js";
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';

export default {
    name: 'editProfile',
    components: {
        Modal,
        userIcon,
        emailIcon
    },
    data(){
        return{
            modalMessage: null,
            modalActive: null,
            user: {
                id: null,
                firstName: '',
                lastName: '',
                // profilePicture: null, later issue
                goal: '',
                description: '',
                isPublic: null,
            }
        }
    },
    computed: {
        ...mapState(useUserStore, ['getUser']),
    },
    created(){
        this.user = {
            id: this.getUser.id,
            firstName: this.getUser.firstName,
            lastName: this.getUser.lastName,
            // profilePicture: null, later issue
            goal: this.getUser.goal,
            description: this.getUser.description,
            isPublic: this.getUser.isPublic,
        }
    },
    methods: {
        ...mapActions(useUserStore, ['setUser']),
        closeModal (){
            this.modalActive = !this.modalActive;
            this.$router.push({ name: 'profile' });
        },
        async editProfile(){
            const userRef = doc(collection(db, 'User'), this.user.id);
            try{
                await setDoc(userRef, {
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    goal: this.user.goal,
                    description: this.user.description,
                    isPublic: this.user.isPublic
                }, {merge: true});
                this.setUser(this.user.id);
                this.modalMessage = 'Changes were saved!';
                this.modalActive = true;
                return;
            } catch (error){
                console.error('Error updating user information: ', error)
            }
        }
    }
}
</script>

<style scoped>

.profile {
    .container {
        max-width: 1000px;
        padding: 60px 25px;

        h2 {
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
        }

        .profile-info {
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
            padding: 32px;
            background-color: white;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;

            .profile-picture {
                position: initial;
                width: 80px;
                height: 80px;
                font-size: 32px;
                background-color: #303030;
                color: white;
                display: flex;
                align-self: center;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }

            .username {
                display: flex;
                align-self: center;
                color: white;
                font-size: 14px;
                padding: 8px 24px;
                border-radius: 8px;
                background-color: #303030;
                margin: 16px 0;
                text-align: center;
                text-transform: capitalize;

                .icon {
                    width: 14px;
                    height: auto;
                    margin-right: 8px;
                }
            }

            .email {
                display: flex;
                align-self: center;
                color: white;
                font-size: 14px;
                padding: 8px 24px;
                border-radius: 8px;
                background-color: #303030;
                /* margin: 16px 0; */
                text-align: center;

                .icon {
                    width: 14px;
                    height: auto;
                    margin-right: 8px;
                }
            }

            .input {
                margin: 16px 0;
                
                label {
                    font-size: 14px;
                    display: block;
                    padding: 6px;
                }
                input {
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 8px;
                    height: 50px;
                    @media (min-width: 900px){

                    }

                    &:focus {
                        outline: none;
                    }
                }
            }

            button {
                align-self: center;
            }
        }
    }
}
</style>