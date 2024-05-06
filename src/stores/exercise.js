import { defineStore } from "pinia";

import { auth } from '@/Firebase/init.js';
import db from "@/Firebase/init.js";
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';

//API included in this file
import axios from 'axios';

export const useExerciseStore = defineStore('exercise', {
    state: () => {
        return {
            exercises: [],
        }
    },  
    getters: {  
        getExercises(state){ 
            return state.exercises;
        },
        
    },
    actions: {
        async setExerciseByMuscle(muscle){
            try {
                const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
                    headers: {
                        'X-Api-Key': '9DwiICGeoVQcrdPgwEM1rw==kYPmx5M8AfgQDbQN'
                    }
                });
                // Handle successful response
                console.log(response.data);
                this.exercises = response.data;
            } catch (error) {
                // Handle error
                console.error('Request failed:', error);
            }
        },
        async setExerciseByName(name){
            try {
                const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?name=${name}`, {
                    headers: {
                        'X-Api-Key': '9DwiICGeoVQcrdPgwEM1rw==kYPmx5M8AfgQDbQN'
                    }
                });
                // Handle successful response
                console.log(response.data);
                this.exercises = response.data;
            } catch (error) {
                // Handle error
                console.error('Request failed:', error);
            }
        }
    }
})