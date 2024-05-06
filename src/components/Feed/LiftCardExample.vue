<template>
    <div class="lift-card">
        <div class="user-info">
            <!-- Router Link to direct user to their page -->
            <RouterLink class="user-link" to="#">
                <img class="picture">
                <div class="username">
                    <h2>{{ post.username }}</h2>
                </div>    
            </RouterLink>
        </div>
        <div class="lift-info">
            <div class="link-card">
            <div class="lift-element">
                <div class="icon"><MuscleTypeIcon /></div>
                <h3>{{ post.targetDay }}</h3>
            </div>
            <div class="lift-element">
                <div class="icon"><ClockIcon /></div>
                <h3>{{ post.duration }}</h3>
            </div>
            <div class="lift-element">
                <div class="icon"><SetIcon /></div>
                <h3>Sets: {{ post.totalSets }}</h3>
            </div>
            <div class="lift-element">
                <div class="icon"><MassMovedIcon /></div>  
                <h3>Mass: {{ post.totalMass }} lbs</h3>
            </div>
            <div class="lift-element">
                <div class="icon"><CalendarIcon /></div>
                <h3>{{ post.date }}</h3>
            </div>
            </div>
        </div>
        <div class="last-element">
                <div class="icons">
                    <div class="icon">
                        <LikeIcon />
                    </div>
                    <div class="icon">
                        <CommentIcon />
                    </div>
                </div>
                <div class="right">
                    <Router-link class="link-light" to="#">
                        View Workout <Arrow class="arrow-light"/> 
                    </Router-link>
                </div>
            </div>
    </div>

</template>

<script>
import Arrow from '@/assets/Icons/arrow-right.svg';
import CalendarIcon from '@/assets/Icons/calendar.svg';
import ClockIcon from "@/assets/Icons/clock.svg";
import MassMovedIcon from "@/assets/Icons/mass-moved-1.svg";
import MuscleTypeIcon from "@/assets/Icons/muscle-type.svg";
import SetIcon from "@/assets/Icons/sets.svg";

import Edit from "@/assets/Icons/edit.svg";
import Delete from "@/assets/Icons/delete.svg";
import CommentIcon from "@/assets/Icons/comment.svg";
import LikeIcon from "@/assets/Icons/like.svg";
import { RouterLink, RouterView } from "vue-router";

export default {
    name: 'liftCardExample',
    props: ['post'],
    components: {
        Arrow,
        CalendarIcon,
        ClockIcon,
        MassMovedIcon,
        MuscleTypeIcon,
        SetIcon,
        Edit,
        Delete,
        CommentIcon,
        LikeIcon,
        RouterLink,
        RouterView
    }
};
</script>

<style scoped>
    .lift-card {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        min-width: 300px;
        width: 325px;
        height: fit-content;
        border-radius: 8px;
        color: black;
        /* background-color: rgba(168, 168, 168, .4); */

        &:hover {
            transform: scale(1.008);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
        }

        .user-info {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            border-bottom: 1px solid white;
            background-color: rgb(45, 100, 182);
            color: white;
            border-radius: 8px 8px 0 0;

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
                margin-right: 10px;
            }

            .username {
                flex: 1;
            }

            .user-link {
                color: white;
                text-decoration: none;
                transition: text-decoration 0.3s;
                display: flex;
                flex-direction: row;
                align-items: center;
                &:hover{
                    text-decoration: underline;
                }
            }
        }

        .lift-info {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 4px 16px 16px 16px;
            color: black;
            background-color: rgba(168, 168, 168, .4);

            .link-card {
                color: black;
                text-decoration: none;

                .lift-element {
                    display: flex;
                    flex-direction: row;
                    margin-top: 10px;

                    .icon {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background-color: white;
                        color: black;
                        margin-right: 10px;
                    }

                    h3 {
                        display: flex;
                        align-items: center;
                        font-size: 20px;
                        font-weight: 300;
                    }
                }
            }
        }

        .last-element {
                display: flex;
                flex-direction: row;
                /* background-color: #303030; */
                color: white;
                border-radius:  0 0 8px 8px;
                align-items: center;
                justify-content: space-between;
                padding: 12px 12px;

                .icons {
                    display: flex;

                    .icon {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        border: 1px solid rgb(45, 100, 182);
                        background-color: white;
                        color: rgb(45, 100, 182);
                        transition: .5s ease all;

                        &:hover{
                            background-color: rgb(45, 100, 182);
                            color: white;
                        }

                        &:nth-child(1){
                            margin-right: 20px;
                        }

                        .like,
                        .comment {
                            pointer-events: none;
                            height: 15px;
                            width: auto;
                        }
                    }
                }

                .right {
                    display: flex;
                    align-items: center;
                    justify-content: end;
                }
            }
    }
</style>