<template>
  <div>
    <div id="garden-header">
      <div id="garden-tag" v-if="!editingGarden">
        <img id="backButton" src="images/left.png" @click="backToPlanting"/>
      <h2 id="title">{{ gardenName }}</h2>
      <img id="editButton" src="images/edit.png" @click="editGarden" />
    </div>
    <div class="button-container" v-if="editingGarden">
      <div id="deleteAllButton" @click="removeAll">Unshelf All</div>
      <div id="saveButton" @click="updatePlants">Save</div>
      <div id="cancelButton" @click="cancelChanges">Cancel</div>
    </div>
    </div>
    <ul class="shelf">
      <li
        class="plant-container"
        v-for="plant in plants"
        :key="plant.id"
      > 
        <div
          class="delete-button"
          v-if="isDraggable(plant)"
          @click="removePlant(plant)"
        >
          X
        </div>
        <div class="whole-plant"
              v-bind:draggable="isDraggable(plant)"
              v-on:dragstart="dragItem(plant)"
              v-on:dragover.prevent
              v-on:drop="dropItem(plant)">
        <img class="plant-type" :src="plant.plantType" />
        <img class="pot-type" :src="plant.potType" />
        </div>
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
      plants: [],
      prevPlants: [],
      drag: {}, 
      dragPlant: '',
      dragPot: '',
    };
  },
  methods: {
    async getPlants() {
      try {
        let response = await axios.get("/api/plants");
        response.data.sort((a, b) => (a.index > b.index) ? 1 : -1)
        this.plants = response.data;
        return this.plants;
      } catch (error) {
        console.log(error);
      }
    },
    async updatePlants() {
      this.editingGarden = false;
      try {
        await axios.post('/api/plants', {
          plants: this.plants
        });
      } catch(error) {
        console.log(error);
      }
    },
    backToPlanting() {
      this.$router.push('/planter');
    },
    editGarden() {
      this.editingGarden = !this.editingGarden;
      this.backUpPlants();
    },
    backUpPlants() {
      this.prevPlants = [];

      for(let plant of this.plants) {
        this.prevPlants.push({
          _id: plant._id,
          name: plant.name,
          plantType: plant.plantType,
          potType: plant.potType,
          isEmpty: plant.isEmpty,
          index: plant.index
        });
      }
    },
    cancelChanges() {
      this.editingGarden = false;
      this.plants = this.prevPlants;
    },
    removeAll() {
      let emptyShelf = [];

      for(let i = 0; i < this.plants.length; i++) {
        emptyShelf.push({
          _id: i,
          name:'',
          plantType: "images/empty-plant.png",
          potType: "images/empty-pot.png",
          isEmpty: true,
          index: i
        });
      }
      this.plants = emptyShelf;
    },
    removePlant(plant) {
      let newPlants = [];
      
      for (let planty of this.plants) {
        if (plant !== planty) newPlants.push(planty);
        else {
          const emptyPlant = {
            _id: plant._id,
            name:'',
            plantType: "images/empty-plant.png",
            potType: "images/empty-pot.png",
            isEmpty: true,
            index: plant.index
          };
          newPlants.push(emptyPlant);
        }
      }
      newPlants.sort((a, b) => (a.index > b.index) ? 1 : -1)
      this.plants = newPlants;
    },
    dragItem(plant) {
      this.drag = plant;
      event.dataTransfer
    },
    dropItem(plant) {
      const indexItem = this.drag.index;
      const indexTarget = plant.index;
      this.drag.index = indexTarget;
      plant.index = indexItem;
      this.plants.sort((a, b) => (a.index > b.index) ? 1 : -1)
    },
    isDraggable(plant) {
      return this.editingGarden && !plant.isEmpty
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
.whole-plant {
  display: flex;
  flex-direction: column;
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
  position: absolute;
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
  -webkit-user-drag: none;
  user-select: none
}

.shelf-img {
  width: 275px;
  height: auto;
  user-select: none;
  -webkit-user-drag: none;
}

.plant-name {
  position: absolute;
  background: #805301;

  color: white; /*#c4d270;*/
  border-radius: 5px;
  padding: 5px;
}
.name-tag {
  display: flex;
  justify-content: center;
  user-select: none;
  -webkit-user-drag: none;
}
ul {
  padding: 0;
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
#cancelButton {
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  background-color: #ffffff00;
  border-radius: 10px;
  border: 3px solid #c4d270;
  padding: 0.3em;
  width: 90px;
  color: #228c22;
  margin-right: 10px;
}
#cancelButton:hover {
  background-color: #c4d270;
  color: white;
}
#saveButton {
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  background-color: #ffffff00;
  border-radius: 10px;
  border: 3px solid #c4d270;
  padding: 0.3em;
  width: 75px;
  color: #228c22;
  margin-right: 10px;
}
#saveButton:hover {
  background-color: #c4d270;
  color: white;
}
#deleteAllButton {
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  background-color: #ffffff00;
  border-radius: 10px;
  border: 3px solid #c4d270;
  padding: 0.3em;
  width: 120px;
  color: #228c22;
  margin-right: 10px;
}
#deleteAllButton:hover {
  background-color: #c4d270;
  color: white;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-top: 20px;
}
#garden-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}
#garden-header {
  height: 60px
}
#title {
  -webkit-user-drag: none;
  user-select: none;
  align-self: center;
  margin-bottom: 0;
}
#backButton {
  cursor: pointer;
  width: 25px;
  height: 25px;
  -webkit-user-drag: none;
  user-select: none;
  margin-right: 5px;
}
</style>