<template>
<div>
  <div id="garden-tag">
    <h2 id="title" v-if="!editingGarden">{{gardenName}}</h2>
    <input id="title-change" v-if="editingGarden" spellcheck="false"/>
    <img id="editButton" src="images/edit.png" @click="editGarden">
    <div class="delete-button" v-if="editingGarden" @click="removeAll()">X</div>
  </div>
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
      <div class="delete-button" v-if="editingGarden" @click="removePlant(plant)">X</div>
      <img class="plant-type" :src="plant.plantType" />
      <img class="pot-type" :src="plant.potType" />
      <div class="name-tag">
        <img class="shelf-img" src="images/shelf.png" />
        <h2 class="plant-name">{{ plant.name }}</h2>
      </div>
    </li>
  </ul>
</div>
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
      editingGarden: false,
      gardenName: "The Zen Garden",
      emptyPlant: {

      },
      plants: [],
      drag: {},
    };
  },
  methods: {
    async getPlants() {
      try {
        let response = await axios.get("/api/plants");
        this.plants = response.data;
        console.log(this.plants);
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
    async removeAll() {
      try{
        await axios.delete('/api/plants');
        this.getPlants();
      } catch(error) {
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
    editGarden() {
      this.editingGarden = !this.editingGarden
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
  margin-left: 25px;
  margin-right: 25px;
}

.plant-type {
  user-select: none;
  -webkit-user-drag: none;
  width: 275px;
  height: auto;
}
.pot-type {
  user-select: none;
  -webkit-user-drag: none;
  width: 275px;
  height: auto;
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

.shelf-img {
  width: 275px;
  height: auto;
}

.plant-name {
  position: absolute;
  background: #805301;
  /*background: rgba(62, 141, 161, 0.411);*/
  color: #c4d270;
  border-radius: 5px;
  padding: 5px;
  /*border: 2px solid rgb(62, 141, 161)/*#c4d270;*/
}
.name-tag {
  display: flex;
  justify-content: center;
}
ul {
  padding: 0;
}
#garden-tag{
  display: flex;
  justify-content: center;
  align-items: center;
}
#editButton {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  user-select: none;
  -webkit-user-drag: none;
  cursor: pointer;
}
</style>