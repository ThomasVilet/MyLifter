<template>
    <div class="container">
        <div class="set-info">
            <div class="set-header">
                <h3>Set: {{ index + 1 }}</h3>
            </div>
            <div class="set-body">
                <h3>Weight: {{ weight }}</h3>
                <h3>Reps: {{ reps }}</h3>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: 'SetCardView',
    props: ['weight', 'reps', 'index'],
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
            .set-body {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                padding: 5px 20px 5px 20px;
                h3 {
                    font-weight: 200;
                }
            }
        }
    }
</style>