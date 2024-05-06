<template>
    <header>
        <nav class="container">
            <div class="branding">
                <RouterLink class="header" :to="{ name: 'home'}">
                    MyLifter
                </RouterLink>
            </div>
            <div class="nav-links">
                <ul v-show="!navItems.isMobile">
                    <RouterLink class="link" :to="{ name: 'home'}" >Home</RouterLink>
                    <RouterLink class="link" :to="{ name: 'feed'}" v-if="getUser.id" >Feed</RouterLink>
                    <RouterLink class="link" :to="{ name: 'explore'}" v-if="getUser.id" >Explore</RouterLink> 
                    <RouterLink class="link" :to="{ name: 'create'}"  v-if="getUser.id" >Create</RouterLink>
                    <RouterLink @click="profileSelected" class="link" :to="{ name: 'profile'}"  v-if="getUser.id">Profile</RouterLink>
                    <RouterLink class="link" :to="{ name: 'login' }" v-if="getUser.id == null" >Login</RouterLink>
                </ul>
                <div @click="toggleProfileMenu" v-show="getUser.id && !navItems.isMobile" class="profile" rel="profile">
                    <span>{{ this.getUser.profilePicture }}</span>
                    <div v-show="profileMenu" class="profile-menu">
                        <div class="info">
                            <p class="picture">{{ this.getUser.profilePicture }}</p>
                            <div class="right">
                                <p>{{ this.getUser.username }}</p>
                                <p>{{ this.getUser.firstName }} {{ this.getUser.lastName }}</p>
                                <p>{{ this.getUser.email }}</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="option">
                                <RouterLink @click="profileSelected" class="option" :to="{ name: 'profile'}">
                                    <userIcon class="icon" />
                                    <p>Profile</p>
                                </RouterLink>
                            </div>
                            <div class="option">
                                <RouterLink class="option" :to="{ name: 'editProfile'}">
                                    <editIcon class="icon" />
                                    <p>Edit Profile</p>
                                </RouterLink>
                            </div>
                            <div class="option">
                                <RouterLink  @click="signOutUser" class="option" :to="{ name: 'home'}">
                                    <signOutIcon class="icon"/>
                                    <p>Sign Out</p>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="navItems.isMobile"/> 
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="navItems.mobileNav">
                <RouterLink class="link" :to="{ name: 'home'}" >Home</RouterLink>
                <RouterLink class="link" :to="{ name: 'feed'}" v-if="getUser.id">Feed</RouterLink>
                <RouterLink class="link" :to="{ name: 'explore'}" v-if="getUser.id">Explore</RouterLink> 
                <RouterLink class="link" :to="{ name: 'create'}"  v-if="getUser.id" >Create</RouterLink>
                <RouterLink @click="profileSelected" class="link" :to="{ name: 'profile'}"  v-if="getUser.id" >Profile</RouterLink>
                <RouterLink class="link" :to="{ name: 'editProfile'}"  v-if="getUser.id">Edit Profile</RouterLink>
                <RouterLink class="link" :to="{ name: 'login' }" v-if="getUser.id == null" >Login</RouterLink>
                <RouterLink @click="signOutUser" class="link" :to="{ name: 'home' }" v-else-if="getUser.id != null">Sign out</RouterLink>
            </ul>
        </transition>
    </header>
    <!-- <RouterView/> -->
</template>

<script>
import signOutIcon from '@/assets/Icons/sign-out.svg';
import userIcon from '@/assets/Icons/user.svg';
import menuIcon from '@/assets/Icons/menu-icon.svg';
import editIcon from '@/assets/Icons/edit.svg';
import { RouterLink, RouterView } from 'vue-router';

import { useUserStore } from '@/stores/user';
import { mapState, mapActions } from 'pinia';
import { signOut } from 'firebase/auth';
import { auth } from '@/Firebase/init';

export default {
    name: 'navigation',
    components: {
        menuIcon,
        userIcon,
        signOutIcon,
        editIcon,
        RouterLink,
        RouterView
    },
    data(){
        return{
            navItems: {
                isMobile: null,
                mobileNav: null,
                windowWidth: null,
            },
            profileMenu: null
        }
    },
    created(){
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    methods: {
        ...mapActions(useUserStore, ['setUser', 'setSelectedUser']),
        async profileSelected(){
            await this.setSelectedUser(this.getUser.id);
        },
        checkScreen(){
            this.navItems.windowWidth = window.innerWidth;
            if(this.navItems.windowWidth <= 750){
                this.navItems.isMobile = true;
                return;
            }
            this.navItems.isMobile = false;
            this.navItems.mobileNav = false;
            return;
        },
        toggleMobileNav (){
            this.navItems.mobileNav = !this.navItems.mobileNav;
        },
        toggleProfileMenu(e){
            // if(e.target === this.$refs.profile){
            //     this.profileMenu = !this.profileMenu;
            // }
            this.profileMenu = !this.profileMenu;
        },
        signOutUser(){
            signOut(auth)
            .then(() => {
                this.setUser(null);
                console.log('Signed out user, new user: ', this.getUser);
                this.$router.push({ name: 'login' });
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            })
        }
    },
    computed: {
        ...mapState(useUserStore, ['getUser'])
    }
}
</script>

<style scoped>
    header {
        background-color: whitesmoke;
        padding: 0 25px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
        z-index: 99;
    

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: .3s color ease;

        &:hover {
            color: rgb(45, 100, 182);
            text-decoration: underline;
            font-weight: bold;
        }
    }
    .link:active {
        font-weight: bold;
        color: rgb(45, 100, 182);
    }

    nav {
        display: flex;
        padding: 25px 0;
        
        .branding {
            display: flex;
            align-items: center;

            .header{
                font-weight: 600;
                font-size: 24px;
                color: black;
                text-decoration: none; 
            }
        }

        .nav-links {
            position: relative;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;

            ul {
                margin-right: 32px;

                .link{
                    margin-right: 32px;
                }

                .link:last-child {
                    margin-right: 0
                }
            }

            .profile {
                position: relative;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: white;
                background-color: #303030;

                /* span {
                    pointer-events: none;
                } */

                .profile-menu {
                    position: absolute;
                    top: 60px;
                    right: 0;
                    width: 250px;
                    background-color: #303030;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
                }

                .info {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border-bottom: 1px solid white;

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

                    .right {
                        flex: 1;
                        margin-left: 24px;

                        p:nth-child(1){
                            font-size: 14px;
                        }

                        p:nth-child(2){
                            font-size: 12px;
                        }
                    }
                }

                .options {
                    padding: 15px;
                    .option {
                        text-decoration: none;
                        color: white;
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;

                        .icon {
                            width: 18px;
                            height: auto;
                        }

                        p {
                            font-size: 14px;
                            margin-left: 12px;
                        }

                        &:last-child {
                            margin-bottom: 0px;
                        }
                    }
                    
                }
            }
        }
    }

    .menu-icon {
        cursor: pointer;
        position: absolute;
        top: 32px;
        right: 25px;
        height: 25px;
        width: auto;
    }

    .mobile-nav {
        padding: 20px;
        width: 70%;
        max-width: 250px;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100%;
        background-color: darkgray;
        top: 0;
        left: 0;

        .link {
            padding: 15px 0;
            color: white;
        }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        transition: all 1s ease;
    }

    .mobile-nav-enter {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }

    .mobile-nav-leave-to {
        transform: translateX(-250px);
    }


    }

</style>