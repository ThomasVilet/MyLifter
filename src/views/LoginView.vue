<template>
    <div class="form-wrap">
        <form class="login" @submit.prevent="login">
            <p class="login-register">
                Don't have an account?
                <RouterLink class="router-link" :to="{ name: 'register' }"> Register here. </RouterLink>
            </p>
            <h2>Login to MyLifter</h2>
            <div class="inputs">
                <div class="input">
                    <input type="email" placeholder="Email" v-model="email" />
                    <Email class="icon" />
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password" />
                    <Password class="icon" />
                </div>
            </div>
            <div v-show="error" class="error">
                {{ this.message }}
            </div>
            <RouterLink class="forgot-password" :to="{ name: 'forgotpassword'}">
                Forgot your password?
            </RouterLink>
            <button type="submit">Login</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import Email from "@/assets/Icons/email.svg";
import Password from "@/assets/Icons/password.svg";

import { auth } from '@/Firebase/init.js';
import db from "@/Firebase/init.js";
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { usePostStore } from '@/stores/post';

export default {
    name: 'login',
    components: {
        RouterLink,
        RouterView,
        Email,
        Password
    }, 
    data(){
        return {
            email: null,
            password: null,
            message: '',
            error: false,
        }
    },
    methods: {
        login(){
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
                this.$router.push({ name: 'home'});
                this.error = false;
                this.message = '';
                console.log(auth.currentUser.uid);
            })
            .catch(error => {
                this.error = true;
                this.message = error.message;
            })
        }
    }
}
</script>

<style>
    .form-wrap{
        overflow: hidden;
        display: flex;
        height: 100vh;
        justify-content: center;
        align-self: center;
        margin: 0 auto;
        width: 90%;
        @media(min-width: 900px){
            width: 100%;
        }

        .login-register{
            margin-bottom: 32px;

            .router-link{
                color: black;
            }
        }

        form {
            padding: 0 10px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 1;
            @media(min-width: 900px){
                padding: 0 50px;
            }

            h2 {
                text-align: center;
                font-size: 32px;
                color: #303030;
                margin-bottom: 40px;
                @media(min-width: 900px){
                    font-size: 40px;
                }
            }

            .inputs{
                width: 100%;
                max-width: 350px;

                .input {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 8px;
                    input {
                        width: 100%;
                        border: none;
                        background-color: aliceblue;
                        padding: 4px 4px 4px 30px;
                        height: 50px;

                        &:focus {
                            outline: none;
                        }
                    }

                    .icon{
                        width: 12px;
                        position: absolute;
                        left: 6px;
                    }
                }
            }

            .forgot-password {
                text-decoration: none;
                color: black;
                cursor: pointer;
                font-size: 14px;
                margin: 16px 0 32px;
                border-bottom: 1px solid transparent;
                transition: .5s ease all;

                &:hover {
                    border-color: #303030;
                }
            }

            .angle {
                display: none;
                position: absolute;
                background-color: white;
                transform: rotateZ(3deg);
                width: 60px;
                right: -30px;
                height: 101%;
                @media(min-width: 900px){
                    display: initial;
                }
            }
        }

        .background {
            display: none;
            flex: 2;
            background-size: cover;
            background-image: url("@/assets/liftPhotos/background.jpg");
            width: 100%;
            height: 100%;
            @media(min-width: 900px){
                display: initial;
            }
        }
    }
</style>