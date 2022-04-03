<template>
  <div class="planter">
    <input v-model="plantName" placeholder="Enter a name!" spellcheck="false" />
    <img class="sign" src="images/sign.png" />
    <div class="img_container">
      <div class="plant_selector">
        <div class="arrow_container">
          <img class="arrow" @click="getPrevPlant" src="images/left.png" />
        </div>
        <img id="plant" v-bind:src="plantList[currPlant]" />
        <div class="arrow_container">
          <img class="arrow" @click="getNextPlant" src="images/right.png" />
        </div>
      </div>
      <div class="pot_selector">
        <div class="arrow_container">
          <img class="arrow" @click="getPrevPot" src="images/left.png" />
        </div>
        <img id="pot" v-bind:src="potList[currPot]" />
        <div class="arrow_container">
          <img class="arrow" @click="getNextPot" src="images/right.png" />
        </div>
      </div>
    </div>
    <div class="button-container">
      <div id="addButton" @click="addPlant">Add</div>
      <div id="randomizeButton" @click="randomizePlant">Randomize</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlanterView",
  data() {
    return {
      plantName: "",
      currPlant: 0,
      currPot: 0,
      plantList: [
        "images/plant-01.png",
        "images/plant-02.png",
        "images/plant-03.png",
        "images/plant-04.png",
        "images/plant-05.png",
        "images/plant-06.png",
        "images/plant-07.png",
        "images/plant-08.png",
      ],
      potList: [
        "images/pot-01.png",
        "images/pot-02.png",
        "images/pot-03.png",
        "images/pot-04.png",
        "images/pot-05.png",
        "images/pot-06.png",
        "images/pot-07.png",
        "images/pot-08.png",
      ],
    };
  },
  methods: {
    getNextPlant() {
      if (this.currPlant === this.plantList.length - 1) {
        this.currPlant = 0;
      } else {
        this.currPlant++;
      }
    },
    getNextPot() {
      if (this.currPot === this.potList.length - 1) {
        this.currPot = 0;
      } else {
        this.currPot++;
      }
    },
    getPrevPlant() {
      if (this.currPlant === 0) {
        this.currPlant = this.plantList.length - 1;
      } else {
        this.currPlant--;
      }
    },
    getPrevPot() {
      if (this.currPot === 0) {
        this.currPot = this.potList.length - 1;
      } else {
        this.currPot--;
      }
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      console.log()
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(num);
      return num;
    },
    randomizePlant() {
      this.currPlant = this.getRandomInt(0, this.plantList.length - 1);
      this.currPot = this.getRandomInt(0, this.potList.length - 1);
    },
    getNextAvaiableSpot(takenSpots) {
      let allSpots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for(let spot in allSpots) {
        if (!takenSpots.includes(spot)) {
          return spot;
        }
      }
    },
    async addPlant() {
      try {
        let plantResult = await axios.get('/api/plants');
        let plants = plantResult.data;
        console.log(plants);
        let plantCount = 0;
        let takenSpots = [];
        
        for (let plant of plants) {
          if(!plant.isEmpty) {
            plantCount++;
            takenSpots.push(plant.index);
          }
        }
    
        if(plantCount < 10) {
          let nextSpot = this.getNextAvaiableSpot(takenSpots);
          await axios.post("/api/plants", {
          name: this.plantName,
          plantType: this.plantList[this.currPlant],
          potType: this.potList[this.currPot],
          isEmpty: false,
          index: nextSpot
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.sign {
  width: 300px;
  height: auto;
  margin-bottom: 20px;
  margin-top: 20px;
}
.planter input {
  width: 175px;
  padding-top: 44px;
  font-size: 20px;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  border: none;
  outline: none;
  text-align: center;
  background: #fffff000;
  color: black;
}
.planter input::placeholder {
  color: black;
  font-style: italic;
}
.img_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#plant {
  width: 300px;
  height: auto;
}
#pot {
  width: 300px;
  height: auto;
}
.arrow {
  cursor: pointer;
  width: 50px;
  height: 50px;
}
.plant_selector {
  display: flex;
}
.pot_selector {
  display: flex;
}
.arrow_container {
  display: flex;
  align-items: center;
  padding: 25px;
}
#addButton {
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
#addButton:hover {
  background-color: #c4d270;
  color: white;
}
#addButton:active {
  background-color: #c4d270;
  color: white;
}
#randomizeButton {
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  background-color: #ffffff00;
  border-radius: 10px;
  border: 3px solid #c4d270;
  padding: 0.3em;
  width: 150px;
  color: #228c22;
}
#randomizeButton:hover {
  background-color: #c4d270;
  color: white;
}
#randomizeButton:active {
  background-color: #c4d270;
  color: white;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  margin: 50px auto 25px auto;
}
</style>
