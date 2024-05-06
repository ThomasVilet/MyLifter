<template>
    <div class="reset-password">
        <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
        <Loading v-if="loading"/>
        <div class="form-wrap">
            <form class="reset" @submit.prevent="resetPassword">
                <p class="login-register">
                    Back to
                    <RouterLink class="router-link" :to="{ name: 'login' }"> Login </RouterLink>
                </p>
                <h2>Reset Password</h2>
                <p>Forgot your password? Enter your email to reset it.</p>
                <div class="inputs">
                    <div class="input">
                        <input type="email" placeholder="Email" v-model="email" />
                        <Email class="icon" />
                    </div>
                </div>
                <button type="submit">Reset</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div> 
        </div>
    </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Modal from "@/components/Modal/Modal.vue";
import Email from "@/assets/Icons/email.svg";
import Loading from "@/components/Modal/Loading.vue";

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/Firebase/init.js';
import db from "@/Firebase/init.js";
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';

export default {
    name: 'forgotpassword',
    components: {
        RouterLink,
        Email,
        Modal,
        Loading
    }, 
    data(){
        return {
            email: null,
            modalActive: false,
            modalMessage: "",
            loading: null,
        }
    },
    methods: {
        resetPassword(){
            this.loading = true;
            sendPasswordResetEmail(auth, this.email)
            .then(() => {
                this.modalMessage = "If your account exists, you will receive an email";
                this.loading = false;
                this.modalActive = true;
            })
            .catch(error=> {
                this.modalMessage = error.message;
                this.loading = false;
                this.modalActive = true;
            })
        },
        closeModal(){
            this.modalActive = !this.modalActive;
            this.email = null;
        }
    }
}
</script>

<style scoped>
    .reset-password {
        position: relative;
        .form-wrap {
            .reset{
                h2{
                    margin-bottom: 8px;
                }
                p{
                    text-align: center;
                    margin-bottom: 32px;
                }
            }
        }
    }
</style>
