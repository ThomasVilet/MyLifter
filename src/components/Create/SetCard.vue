<template>
    <div class="container">
        <div class="set-info">
            <div class="set-header">
                <h3>Set: {{ index + 1 }}</h3>
                <!-- Delete Set Button (Icon)-->
                
            </div>
            <div class="set-input">
                <div class="input">
                    <p>Weight</p>
                    <input type="number" v-model="localWeight" @input="updateSet">
                </div>
                <div class="input">
                    <p>Reps</p>
                    <input type="number" v-model="localReps" @input="updateSet">
                </div>
            </div>
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

export default {
    name: 'SetCard',
    props: ["index", "weight", "reps"],
    components: {
        CalendarIcon,
        ClockIcon,
        MassMovedIcon,
        MuscleTypeIcon,
        SetIcon
    },
    data(){
        return {
            localWeight: null,
            localReps: null
        }
    },
    methods: {
        ...mapActions(useExerciseStore, ['setExerciseByMuscle', 'setExerciseByMuscleAxios']),
        updateSet(){
            this.$emit('set-updated', {
                weight: this.localWeight,
                reps: this.localReps,
                index: this.index
            })
        }
    },
    computed: {
        ...mapState(useExerciseStore, ['getExercises']),
        
    }

}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        margin: 5px;
        border: 1px black solid;
        border-radius: 8px;
        width: fit-content;
        .set-info {
            
            .set-header {
                background-color: rgb(45, 100, 182);
                border-radius: 8px 8px 0 0;
                color: white;
                padding: 5px 0 5px 0;
                display: flex;
                justify-content: center;
            }
            .set-input {

                .input {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    padding: 5px;
                    p {
                        margin: 0;
                    }
                    input {
                        margin-left: 5px;
                        border-radius: 8px;
                        width: 80px;
                    }
                }
            }
        }
    }
</style>