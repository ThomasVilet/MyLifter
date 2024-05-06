<template>
    <!-- render each exercise by index and assign values to said index (muscle, [sets]) -->
    <div class="container">
        <div class="exercise-input">
            <h2>Exercise {{ index + 1 }}: </h2>
            <input v-model="searchLift" @keydown.enter="setExerciseByName(searchLift)">
            <!-- <input v-model="searchLift" @keydown.enter="setExerciseByMuscle(searchLift)"> -->
            <select v-model="selectedLift" @change="emitExercise">
                <option v-for="exercise in getExercises" :value="exercise">{{ exercise.name }}</option>
            </select> 
        </div>
        <div class="set-input">
                <SetCard v-for="(set, sIndex) in sets" 
                    :weight="set.weight" 
                    :reps="set.reps"
                    :index="sIndex"
                    @set-updated="updatedSetData"
                    :key="sIndex"
                />
                <button @click="addSetToExercise()">Add Set</button>
        </div>
    </div>
</template>

<script>

import { useExerciseStore } from '@/stores/exercise';
import { mapState, mapActions } from 'pinia';

import CalendarIcon from '@/assets/Icons/calendar.svg';
import ClockIcon from "@/assets/Icons/clock.svg";
import MassMovedIcon from "@/assets/Icons/mass-moved-1.svg";
import MuscleTypeIcon from "@/assets/Icons/muscle-type.svg";
import SetIcon from "@/assets/Icons/sets.svg";

import SetCard from '@/components/Create/SetCard.vue';

export default {
    name: 'ExerciseCard',
    props: ["index", "sets"],
    components: {
        SetCard,
        CalendarIcon,
        ClockIcon,
        MassMovedIcon,
        MuscleTypeIcon,
        SetIcon
    },
    data(){
        return {
            searchLift: null,
            selectedLift: {},
            message: null,
            error: null
        }
    },
    methods: {
        ...mapActions(useExerciseStore, ['setExerciseByMuscle', 'setExerciseByName']),
        emitExercise(){
            this.$emit('exercise-updated', {index: this.index, selectedLift: this.selectedLift});
            this.searchLift = this.selectedLift.name;
            this.selectedLift = null;
        },
        addSetToExercise(){
            const newSet = { weight: 0, reps: 0};
            this.$emit('set-added', { eIndex: this.index, newSet: newSet});
        },
        updatedSetData(updatedSet){
            // this.$emit('set-updated', updatedSet)
            this.$emit('set-updated', { eIndex: this.index, setData: updatedSet})
        }
    },
    computed: {
        ...mapState(useExerciseStore, ['getExercises']),
        
    },
    
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        
        .exercise-input {
            display: flex;
            flex-direction: row;
            background-color: rgba(168, 168, 168, .4);
            margin: 0 5px 0 5px;
            border: 1px black solid;
            border-radius: 8px 8px 0 0;
            padding: 5px 5px 5px 5px;
            h2 {
                margin-left: 5px;
                font-weight: 200;
                font-size: 24px;
            }
            input {
                margin-left: 5px;
                border-radius: 8px 0 0 8px;
            }
            select {
                border-radius: 0 8px 8px 0;
            }
        }
        .set-input {
            margin: 0 5px 0 5px;
            border: 1px solid black;
            border-radius: 0 0 8px 8px;
            button {
                background-color: rgb(45, 100, 182);
                align-self: center;
                width: fit-content;
                margin-bottom: 5px;
            }
        }
    }
</style>