<template>
    <div class="home">
        <div class="welcome-wrapper">
            <div class="welcome-content">
                <div>
                    <h2>{{ welcomeScreen.title }}</h2>
                    <p>{{ welcomeScreen.description }}</p>
                    <RouterLink class="link" v-if="!getUser.id" :to="{ name: 'login' }">
                        Login/Register <Arrow class="arrow"/> 
                    </RouterLink>
                    <RouterLink class="link" v-else :to="{ name: 'feed' }">
                        View Feed <Arrow class="arrow"/> 
                    </RouterLink>
                </div>
            </div>
            <div class="gym-photo">
                <img :src="`/src/assets/liftPhotos/${welcomeScreen.photo}.jpg`" alt="gym">
            </div>
        </div>
        <!-- Example Post -->
        <div class="example-wrapper">
            <div class="example-content">
                <div>
                    <h2>Example Post</h2>
                </div>
                <LiftCardExample :post="post" v-for="(post, index) in exampleLiftPost" :key="index"/>
            </div>
        </div>
        
        <div class="welcome-wrapper">
            <div class="welcome-content">
                <div>
                    <h2>{{ aboutMyLifter.aboutTitle }}</h2>
                    <p>{{ aboutMyLifter.whoWeAre }}</p>
                    <p>{{ aboutMyLifter.inspiration }}</p>
                    <p>{{ aboutMyLifter.goal }}</p>
                </div>
            </div>
            <div class="gym-photo">
                <img :src="`/src/assets/liftPhotos/${aboutMyLifter.photo}.jpg`" alt="about">
            </div>
        </div>

        <div v-show="!getUser.id" class="welcome-wrapper">
        <div class="updates">
            <div class="container">
                <h2>Join the MyLifter Community. Register for your free account today!</h2>
                <RouterLink class="router-button" :to="{ name: 'login'}">
                    Register for MyLifter <Arrow class="arrow-light"/>
                </RouterLink>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import Arrow from '@/assets/Icons/arrow-right.svg';
import LiftCardExample from '@/components/Feed/LiftCardExample.vue';
import { RouterLink, RouterView } from 'vue-router';

import { useUserStore } from '@/stores/user';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'home',
    components: {
        LiftCardExample,
        Arrow,
        RouterLink,
        
    },
    data(){
        return {
            welcomeScreen: {
                title: 'Welcome to MyLifter!',
                description: 'A community of driven individuals ready to document their workouts and share them with friends. Register today to expand the community of motivated lifters!',
                photo: 'large-gym',
                showLogin: true
            },
            exampleLiftPost: [
            { username: 'Example User 1', userPicture: null, targetDay: 'Push', totalMass: 2000, date: '01-01-2024', totalSets: 12, duration: '1 hr 20 min' }
            ],
            aboutMyLifter: {
                    aboutTitle: 'About Us',
                    whoWeAre: 'We are a collection of retired athletes that wanted to continue our passion for the gym and progressively better oneselves.',
                    inspiration: 'Through exploration and trying to find the perfect app to track progress, we could not find one. Instead, we decided that with a collection of ideas and experience, we will mold the perfect app for gym enthusiasts.',
                    goal: 'We made it our goal to bring fourth an app where you can document, share, and have a community of motivated individuals to strive for success!',
                    photo: 'dark-gym'
                }
        }
    },
    computed: {
        ...mapState(useUserStore, ['getUser']),
    }
}
</script>

<style scoped>
    /* .home{
        padding: 0 0;
        @media(min-width: 1300px){
            padding: 0 36px;
        }
    } */

    .example-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
        @media (min-width: 700px){
            min-height: 650px;
            max-height: 650px;
            flex-direction: row;
        }

        .example-content{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 4;
            order: 2;
            @media(min-width: 700px){
                order: 1;
            }
            @media(min-width: 800px){
                flex: 3;
            }


            div{
                max-width: 375px;
                /* padding: 72px 24px; */
                @media(min-width: 700px){
                    /* padding: 0 24px; */
                }

                h2 {
                    font-size: 32px;
                    font-weight: 300;
                    text-transform: uppercase;
                    margin-bottom: 24px;
                    @media (min-width: 700px){
                        font-size: 40px;
                    }
                }

                p {
                    font-size: 15px;
                    font-weight: 300;
                    line-height: 1.7;
                }

                .link {
                    display: inline-flex;
                    align-items: center;
                    margin-top: 32px;
                    padding-bottom: 4px;
                    border-bottom: 1px solid transparent;
                    transition: .5s ease-in all;

                    &:hover {
                        border-bottom-color: lightgray;
                    }
                }

                .link-light {
                    &:hover {
                        border-bottom-color: white
                    }
                }
            }
        }
    }

    .welcome-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
        @media (min-width: 700px){
            min-height: 650px;
            max-height: 650px;
            flex-direction: row;
        }

        .welcome-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 4;
            order: 2;
            @media(min-width: 700px){
                order: 1;
            }
            @media(min-width: 800px){
                flex: 3;
            }


            div{
                max-width: 375px;
                padding: 72px 24px;
                @media(min-width: 700px){
                    padding: 0 24px;
                }

                h2 {
                    font-size: 32px;
                    font-weight: 300;
                    text-transform: uppercase;
                    margin-bottom: 24px;
                    @media (min-width: 700px){
                        font-size: 40px;
                    }
                }

                p {
                    font-size: 15px;
                    font-weight: 300;
                    line-height: 1.7;
                }

                .link {
                    display: inline-flex;
                    align-items: center;
                    margin-top: 32px;
                    padding-bottom: 4px;
                    border-bottom: 1px solid transparent;
                    transition: .5s ease-in all;

                    &:hover {
                        border-bottom-color: lightgray;
                    }
                }

                .link-light {
                    &:hover {
                        border-bottom-color: white
                    }
                }
            }
        }

        .gym-photo {
            order: 1;
            flex: 3;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);

            @media(min-width: 700px){
                order: 2
            }

            @media(min-width: 800px){
                flex: 4
            }

            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .updates {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .container {
                padding: 100px 25px;
                display: flex;
                flex-direction: column;
                align-items: center;
                @media(min-width: 800px){
                    padding: 125px 25px;
                    flex-direction: row;
                }
            }

            .router-button {
                display: flex;
                font-size: 20px;
                text-decoration: none;
                align-items: center;
                @media(min-width: 100px){
                    margin-left: auto;
                }
            }

            h2 {
                font-weight: 300;
                font-size: 32px;
                max-width: 425px;
                width: 100%;
                text-align: center;
                text-transform: uppercase;
                @media(min-width: 800px){
                    text-align: initial;
                    font-size: 40px;
                }
            }
        }
    }
</style>