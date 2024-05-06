<template>
    <div class="post-view" v-if="currentPost">
        <!-- Need back arrow to go back to whatever view they were on -->
        <div class="container">
            <div class="post-info">
                <RouterLink class="user-link" :to="{ name: 'viewProfile', params: {userId: this.currentPost.user_id}}">
                    <h2>{{ this.currentPost.username }}</h2>
                    <h2>{{ this.currentPost.date }}</h2>
                </RouterLink>
            <!-- For loop to traverse id and exercise -->
                <ExerciseCardView v-for="(exercise, eIndex) in exercises"
                    :exerciseName="exercise.exerciseName"
                    :sets="exercise.sets"
                    :index="eIndex"
                    :key="eIndex"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { usePostStore } from '@/stores/post';
import { mapState, mapActions } from 'pinia';
import { RouterView, RouterLink } from 'vue-router';

import db from "@/Firebase/init.js";
import { doc, query, where, getDoc, getDocs, setDoc, collection, orderBy, collectionGroup } from 'firebase/firestore';

import ExerciseCardView from '@/components/Post/ExerciseCardView.vue';

export default{
    name: "ViewPost",
    props: ['userId'],
    data(){
        return {
            currentPost: null,
            exercises: []
        }
    },
    components: {
        ExerciseCardView,
        RouterLink
    },
    methods: {
        ...mapActions(usePostStore, ['setPost']),
        
        async getExercises(postId){
            try {

                const exerciseCollectionRef = collection(db, 'Post', postId, 'Exercises');
                const querySnapshot = await getDocs(exerciseCollectionRef);
        
                const exercises = [];
                querySnapshot.forEach(doc => {
                    exercises.push({
                        id: doc.id,
                        exerciseName: doc.data().exercise,
                        sets: doc.data().sets
                    });
                });
                this.exercises = exercises;

                const postCollectionRef = await getDoc(doc(collection(db, 'Post'), postId));
                this.currentPost = {
                    user_id: postCollectionRef.data().user_id,
                    username: postCollectionRef.data().username,
                    date: postCollectionRef.data().date
                };
            console.log('Exercises:', exercises);
    } catch (error){
        console.log('Error getting exercises by id: ', error);
    }
}
    },
    computed: {

    },
    async mounted(){
        // Used for feed and profile - error occurs cause accessing wrong data
        try {
            const postId = this.$route.params.postid;
            await this.getExercises(postId);
        } catch (error) {
            console.error('Error filtering posts: ', error);
        }
    },
}
</script>

<style scoped>
    .post-view {
        display: flex;
        align-content: center;
        justify-content: center;

        .container {
            margin-top: 10px;
            display: flex;
            flex-direction: column;

            .post-info {
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
                /* padding: 32px; */
                border: black solid 1px;
                background-color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                max-width: 800px;
                min-width: 500px;
                /* padding: 5px; */
                .user-link{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    text-decoration: none;
                    padding: 12px 20px;
                    border-bottom: 1px solid white;
                    background-color: rgb(45, 100, 182);
                    color: white;
                    border-radius: 8px 8px 0 0;
                    margin-bottom: 5px;

                    &:hover {
                        text-decoration: underline;
                    }

                    h2 {
                        text-align: center;
                        font-weight: 300;
                        font-size: 32px;
                    }
                }
            }
        }
    }
</style>