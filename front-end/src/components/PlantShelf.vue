<template>
<div>
    <div class="plant-container" v-for="plant in getPlantList" :key="plant.id">
            <div class="name-tag">
                <h2 class="plant-name">{{plant.name}}</h2>
                <div class= "delete-button" @click="removePlant(plant)">X</div>
            </div>
            
            <img class="plant-type" :src="plant.plantType" />
            <img class="pot-type" :src="plant.potType" />
        </div>
    </div>
</template>