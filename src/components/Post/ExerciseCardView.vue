<template>
    <!-- Handles Id and exercise of a given workout -->
    <div class="exercise-card-view">
        <div class="container">
            <div class="exercise-info">
                <h2>Exercise {{ index + 1 }}: {{ exerciseName }}</h2>
            </div>
            <div class="exercise-set-info">
                <SetCardView v-for="(set, sIndex) in sets"
                    :weight="set.weight"
                    :reps="set.reps"
                    :index="sIndex"
                    :key="sIndex"
                />
            </div>
        </div>
    </div>
    <!-- Uses set card to traverse given sets oer exerciseId -->
</template>

<script>
import SetCardView from '@/components/Post/SetCardView.vue';

export default {
    name: 'exerciseSetCardView',
    props: ['exerciseName', 'sets', 'index'],
    components: {
        SetCardView
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        .exercise-info {
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
        }
        .exercise-set-info {
            margin: 0 5px 0 5px;
            border: 1px solid black;
            border-radius: 0 0 8px 8px;
        }
    }
</style>