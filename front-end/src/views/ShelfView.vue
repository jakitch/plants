<template>
  <ul class="shelf">
    <li
      class="plant-container"
      v-for="plant in plants"
      :key="plant.id"
      draggable="true"
      v-on:dragstart="dragItem(plant)"
      v-on:dragover.prevent
      v-on:drop="dropItem(plant)"
    >
      <div class="name-tag">
        <h2 class="plant-name">{{ plant.name }}</h2>
        <div class="delete-button" @click="removePlant(plant)">X</div>
      </div>

      <img class="plant-type" :src="plant.plantType" />
      <img class="pot-type" :src="plant.potType" />
    </li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  name: "ShelfView",
  created() {
    this.getPlants();
  },
  data() {
    return {
      plants: [],
      drag: {},
    };
  },
  methods: {
    async getPlants() {
      try {
        let response = await axios.get("/api/plants");
        this.plants = response.data;
        return this.plants;
      } catch (error) {
        console.log(error);
      }
    },
    async removePlant(plant) {
      let newPlants = [];
      for (let planty of this.plants) {
        if (plant !== planty) newPlants.push(planty);
      }
      this.plants = newPlants;
      try {
        await axios.delete("/api/plants/" + plant._id);
        this.getPlants();
      } catch (error) {
        console.log(error);
      }
    },
    dragItem(plant) {
      this.drag = plant;
    },
    dropItem(plant) {
      const indexItem = this.plants.indexOf(this.plant);
      const indexTarget = this.plants.indexOf(plant);
      this.plants.splice(indexItem, 1);
      this.plants.splice(indexTarget, 0, this.drag);
    },
  },
};
</script>

<style scoped>
.shelf {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.plant-container {
  display: flex;
  flex-direction: column;
  padding-top: 25px;
}
.name-tag {
  display: flex;
  justify-content: center;
  align-items: center;
}

.plant-type {
  user-select: none;
  -webkit-user-drag: none;
  width: 200px;
  height: auto;
}
.pot-type {
  user-select: none;
  -webkit-user-drag: none;
  width: 200px;
  height: auto;
}

.plant-name {
  margin-top: auto;
  margin-bottom: auto;
}

.delete-button {
  user-select: none;
  cursor: pointer;
  font-size: 11px;
  background-color: #ffffff00;
  border-radius: 5px;
  border: 3px solid #c4d270;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  color: #228c22;
}
.delete-button:hover {
  background-color: #c4d270;
  color: white;
}
.delete-button:active {
  background-color: #c4d270;
  color: white;
}

.name-tag h2 {
  font-size: 20px;
}
</style>