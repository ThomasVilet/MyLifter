<template>
    <div class="form-wrap">
        <form class="register" @submit.prevent="register">
            <p class="login-register">
                Already have an account?
                <RouterLink class="router-link" :to="{ name: 'login' }"> Login here. </RouterLink>
            </p>
            <h2>Create an Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Username" v-model="user.username" />
                    <User class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="First name" v-model="user.firstName" />
                    <Name class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Last name" v-model="user.lastName" />
                    <Name class="icon" />
                </div>
                <div class="input">
                    <input type="email" placeholder="Email" v-model="user.email" />
                    <Email class="icon" />
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="user.password" />
                    <Password class="icon" />
                </div>
                <div class="input">
                    <input type="password" placeholder="Confirm password" v-model="user.confirmPassword" />
                    <Password class="icon" />
                </div>
                <div v-show="error" class="error">
                    {{ this.message }}
                </div>
            </div>
            <button type="submit" :disabled="!formComplete">Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import Email from '@/assets/Icons/email.svg';
import Password from '@/assets/Icons/password.svg';
import User from '@/assets/Icons/user.svg';
import Name from '@/assets/Icons/name.svg';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/Firebase/init.js';
import db from "@/Firebase/init.js";
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';


export default {
    name: 'register',
    components: {
        RouterLink,
        Email,
        Password,
        User,
        Name
    }, 
    data(){
        return {
            user: {
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            formComplete: false,
            message: null,
            error: false
        }
    },
    methods: {
        ...mapActions(useUserStore, ['follow']),
        async register(){
            if(this.user.password != this.user.confirmPassword){
                this.message = 'Passwords do not match.';
                this.error = true;
                return;
            }
            
            this.error = false;
            this.message = null;
            
            const result = await createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
            .then((result) => {
                this.createUser(result.user.uid);
            })
            .catch(error => {
                console.error('Error Authenticating/Creating user: ', error);
            })
        },
        async createUser(id){
            console.log('Creating user info: ', id)
            try{
                await setDoc(doc(collection(db, 'User'), id), {
                    username: this.user.username,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                    goal: null,
                    description: null,
                    isPublic: true
                });
                this.follow(id);
                this.$router.push({ name: 'editProfile' });
                return;
            } catch(error){
                console.error('Error creating user from authentication: ', error)
            }
        }
    },
    watch: {
        user: {
            handler(temp){
                this.formComplete = temp.username && temp.firstName && temp.lastName && temp.email && temp.password && temp.confirmPassword;
                if(temp.password.length < 6 || temp.confirmPassword.length < 6 ){
                    this.message = 'Password should be atleast 6 characters';
                    this.error = true;
                }
                else{
                    this.message = '';
                    this.error = false;
                }
            },
            deep: true
        }
    }
}
</script>

<style scoped>
    .register {
        h2 {
            max-width: 350px;
        }
    }
</style>