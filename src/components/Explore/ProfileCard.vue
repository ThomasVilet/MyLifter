<template>
    <div class="search-card">
        <RouterLink class="explore-card" :to="{ name: 'viewProfile', params: {userId: user.id}}">
            <div class="search-info">
                <div class="left-header">
                    <img class="picture">
                </div>
                <div class="search-header">
                    <h2>{{ user.username }}</h2>
                    <div class="search-body">
                        <p>{{ user.firstName }} {{ user.lastName }}</p>
                        <p>Lifts: {{ user.lifts }}</p>
                    </div>
                </div>
            </div>
        </RouterLink>
    </div>

</template>

<script>
import Arrow from '@/assets/Icons/arrow-right.svg';
import { RouterLink, RouterView } from "vue-router";


 export default {
    name: "profileCard",
    props: ["user"],
    components: {
        Arrow,
        RouterLink
    }
 }
</script>

<style scoped>
    .search-card {
        margin-top: 10px;
        /* margin-bottom: 10px; */
        .explore-card {
            display: block;
            width: 100%;
            text-decoration: none; /* Remove underline */
            border-top: 1px solid black; /* Add top border */
            border-bottom: 1px solid black; /* Add bottom border */
            background-color: lightgray; /* Set background color */
            .search-info {
                display: flex;

                .left-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: rgb(45, 100, 182);
                    width: 60px;
                    .picture{
                        position: initial;
                        width: 40px;
                        height: 40px;
                        background-color: white;
                        color: #303030;
                        display: flex;
                        border-radius: 50%;
                    }
                }
                .search-header {
                    display: flex;
                    flex-direction: column;
                    h2 {
                        color: black;
                        font-size: 32px;
                        margin-left: 8px;
                    }
                    .search-body {
                        display: flex;
                        flex-direction: row;
                        p {
                            color: black;
                            margin-bottom: 5px;
                            margin-left: 8px;
                            font-size: 18px;
                        }
                    }
                }
            }

            transition: transform 0.3s;
            &:hover{
                transform: scale(1.01);
            }
        }
    }
</style>