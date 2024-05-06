<template>
    <div class="create-post">
        <div class="container">
            <h2>Start Workout</h2>
            <div class="exercise-log">
                <div class="user-info">
                    <img class="picture">
                    <div class="right-user">
                        <h2>{{ getUser.username }}</h2>
                        <h2>{{ getDate }}</h2>
                    </div>
                </div>
                <div class="info" v-show="!workoutStarted">
                    <div class="input">
                        <MuscleTypeIcon class="icon" />
                        <h3>Select Today's Target</h3>
                        <select class="select" v-model="post.targetDay">
                            <option v-for="option in targetDayOptions" :value="option">{{ option }}</option>
                        </select>
                    </div>      
                    <!-- Add disabled here to prevent user from beginning a workout without target -->
                    <button @click="beginWorkout">Begin Workout</button>  
                </div>
                <div class="exercise-info" v-show="workoutStarted">
                    <div class="exercise-header"> <!-- class originally input--->
                        <MuscleTypeIcon class="icon" />
                        <h3>{{ post.targetDay }}</h3>
                        <!-- Include finish workout here -->
                    </div>
                    <!-- Each card for specific exercise -->
                    <div class="exercise-card">
                        <ExerciseCard v-for="(exercise, eIndex) in post.exercises" 
                        :exercise="exercise.exercise" 
                        :sets="exercise.sets"
                        :index="eIndex"
                        @exercise-updated="handleExerciseUpdated"
                        @set-added="handleSetAdded"
                        @set-updated="handleSetUpdated"
                        :key="eIndex" 
                        /> 
                        <button class="add-button" @click="addExercise()">Add Exercise</button>
                    </div>
                    <div class="exercise-submit">
                        <button @click="finishWorkout">Finish Workout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ExerciseCard from '@/components/Create/ExerciseCard.vue';
import SetCard from '@/components/Create/SetCard.vue';

import { useUserStore } from '@/stores/user';
import { usePostStore } from '@/stores/post';
import { mapState, mapActions } from 'pinia';

import CalendarIcon from '@/assets/Icons/calendar.svg';
import ClockIcon from "@/assets/Icons/clock.svg";
import MassMovedIcon from "@/assets/Icons/mass-moved-1.svg";
import MuscleTypeIcon from "@/assets/Icons/muscle-type.svg";
import SetIcon from "@/assets/Icons/sets.svg";

import db from "@/Firebase/init.js";
import { doc, getDoc, addDoc, setDoc, collection, serverTimestamp } from 'firebase/firestore';

export default{
    name: 'CreateView',
    components: {
        ExerciseCard,
        SetCard,
        CalendarIcon,
        ClockIcon,
        MassMovedIcon,
        MuscleTypeIcon,
        SetIcon
    },
    data(){
        return {
            workoutStarted: false,
            date: null,
            startTime: null,
            targetDayOptions: ['Pull | Back, Biceps', 'Push | Chest, Triceps, Shoulders', 'Legs | Quads, Hamstrings', 'Arms | Shoulder, Triceps, Biceps',
                                 'Chest | Back', 'Cardio', 'Other'],
            post: {
                targetDay: null,
                exercises: [
                    {
                        exercise: null,
                        sets: [
                            {
                                weight: 0,
                                reps: 0
                            }
                        ]
                    }
                ],
            }
        }
    },
    methods: {
        ...mapActions(usePostStore, ['setPostsByFollowing', 'addPost']) ,
        ...mapActions(useUserStore, ['updateLiftCount']),
        handleExerciseUpdated(data){
            this.post.exercises[data.index] = {
                exercise: data.selectedLift.name,
                sets: [
                        {
                            weight: 0,
                            reps: 0
                        }
                ]
            }
        },
        handleSetAdded(data) {
            this.post.exercises[data.eIndex].sets.push(data.newSet);
        },
        handleSetUpdated(data){
            this.post.exercises[data.eIndex].sets[data.setData.index] = {
                weight: data.setData.weight,
                reps: data.setData.reps
            }
            console.log('Emitted Updated Set: ', data.eIndex, data.setData.weight, data.setData.reps);
        },
        beginWorkout(){
            if(!this.post.targetDay){
                this.post.targetDay = 'Other'
            }
            this.workoutStarted = true;
            this.startTime = this.getTime();
            return;
        },
        addExercise(){
            this.post.exercises.push( {
                exercise: null,
                sets: [{
                        weight: 0,
                        reps: 0
                    }],
            });
        },
        async finishWorkout(){
            try {
                const endTime = this.getTime();
                const duration = this.getDuration(this.startTime, endTime);
                const { totalSets, totalMass } = this.calculateTotalSetsAndMass();

                const postRef = await addDoc(collection(db, 'Post'), {
                    user_id: this.getUser.id,
                    username: this.getUser.username,
                    targetDay: this.post.targetDay,
                    date: this.date,
                    duration: duration,
                    totalSets: totalSets,
                    totalMass: totalMass
                });

                const exercisesCollectionRef = collection(postRef, 'Exercises');
                for (const exercise of this.post.exercises){
                    await addDoc(exercisesCollectionRef, {
                        exercise: exercise.exercise,
                        sets: exercise.sets
                    });
                }
                // updating lift count for user - pushing created lift on following Posts
                // await this.setPostsByFollowing();
                console.log( 'Adding Post: ', postRef.id);
                this.addPost(postRef.id);
                this.updateLiftCount();
                this.$router.push({ name: 'feed' });
            } catch(error){
                console.log('Error creating Post: ', error);
            }
        },
        getTime(){
            const currentDate = new Date();
            const isoString = currentDate.toISOString();
            const formattedTime = isoString.split('T')[1].split('.')[0];
            return formattedTime;
        },
        getDuration(start, end){
            const startTime = new Date(`2000-01-01T${start}`);
            const endTime = new Date(`2000-01-01T${end}`);
            const durationMs = endTime - startTime;
            const hours = Math.floor(durationMs / (1000 * 60 * 60));
            const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

            let formattedDuration;
            if(hours > 0){
                formattedDuration = `${hours} hr ${minutes} min`;
            } else {
                formattedDuration = `${minutes} min`;
            }
            return formattedDuration;
        },
        calculateTotalSetsAndMass(){
            let totalSets = 0;
            let totalMass = 0;
            for (const exercise of this.post.exercises){
                totalSets += exercise.sets.length;
                for (const set of exercise.sets){
                    totalMass += set.weight * set.reps;
                }
            }
            return { totalSets, totalMass };
        },
        calculateOneRepMax(weight, reps){
            return weight * (1 + (reps / 30));
        }
    },
    computed: {
        ...mapState(useUserStore, ['getUser']),
        getDate(){
            // get date
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();

            const formattedDate = `${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}-${year}`;

            return this.date = formattedDate;
        },
    }
}
</script>

<style scoped>

.create-post {
    display: flex;
    align-content: center;
    justify-content: center;
    
    .container{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        
        h2{
            text-align: center;
            font-weight: 300;
            font-size: 32px;
        }

        .exercise-log{
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

            .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 5px;
                .input {
                    padding: 16px 16px 16px 16px;
                    color: black;
                    background-color: rgba(168, 168, 168, .4);
                    border: solid black 1px;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    .icon {
                        display: flex;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background-color: white;
                        color: black;
                        margin-right: 10px;
                        padding-left: 7px;
                        padding-top: 6px;
                    }
                    h3 {
                        font-weight: 200;
                        display: flex;
                        align-items: center;
                    }
                    .select {
                        margin-left: 5px;
                        border-radius: 8px;
                    }
                }
                button {
                    background-color: rgb(45, 100, 182);
                    align-self: center;
                    width: fit-content;
                    margin-bottom: 5px;
                }
            }

            .user-info {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: 12px 20px;
                border-bottom: 1px solid white;
                background-color: rgb(45, 100, 182);
                color: white;
                border-radius: 8px 8px 0 0;

                .picture{
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
                .right-user {
                    flex: 1;
                    margin-left: 24px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }
                
            }

            .exercise-info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                .exercise-header {
                    margin-top: 5px;
                    padding: 5px 5px 5px 5px;
                    color: black;
                    background-color: rgba(168, 168, 168, .4);
                    border: solid black 1px;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;

                    .icon {
                        display: flex;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background-color: white;
                        color: black;
                        margin-right: 10px;
                        padding-left: 7px;
                        padding-top: 6px;
                    }
                    h3 {
                        font-weight: 200;
                        display: flex;
                        align-items: center;
                    }
                }
                .exercise-card {

                    .add-button {
                        background-color: rgb(45, 100, 182);
                        align-self: center;
                        width: fit-content;
                        margin-bottom: 5px;
                    }
                }
                .exercise-submit {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-bottom: 8px;
                    button {
                        background-color: rgb(45, 100, 182);
                        align-self: center;
                        width: fit-content;
                    }
                }

            }
        }
    }
}
</style>