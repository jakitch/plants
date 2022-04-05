<template>
  <div class="not-found">
    <h2 id="message">
      Woah, you're trying to access stuff that doesn't exist!
    </h2>
    <img id="head" @click="addCoolPlant" src="/cool-plant.png" />
    <img id="pot" @click="addCoolPlant" src="/nuke.png" />
    <div id="backButton" @click="backToPlanting">Back to Planting</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NotFound",
  data() {
      return {
          awaitingDatbase: false
      }
  },
  methods: {
    backToPlanting() {
      this.$router.push("/planter");
    },
    getNextAvaiableSpot(takenSpots) {
      let allSpots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let spot in allSpots) {
        if (!takenSpots.includes(Number(spot))) {
          return Number(spot);
        }
      }
    },
    async addCoolPlant() {
      if (!this.awatingDatabase) {
        this.awatingDatabase = true;
        try {
          let plantResult = await axios.get("/api/plants");
          let plants = plantResult.data;
          let plantCount = 0;
          let takenSpots = [];
          
          let coolPlantExists = false;

          for (let plant of plants) {
            if (!plant.isEmpty) {
              plantCount++;
              takenSpots.push(plant.index);
            }
            if(plant.plantType === "/cool-plant.png")
                coolPlantExists = true;
          }
          if (plantCount < 10 && !coolPlantExists) {
            let nextSpot = this.getNextAvaiableSpot(takenSpots);
            await axios.post("/api/plant", {
              name: "Dr. Chill",
              plantType: "/cool-plant.png",
              potType: "/nuke.png",
              isEmpty: false,
              index: nextSpot,
            });
          } 
          this.awatingDatabase = false;
        } catch (error) {
          console.log(error);
          this.awaitingDatbase = false;
        }
      }
    },
  },
};
</script>


<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#head {
  width: 300px;
  height: auto;
  user-select: none;
  -webkit-user-drag: none;
}
#pot {
  width: 300px;
  height: auto;
  user-select: none;
  -webkit-user-drag: none;
}

#backButton {
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  background-color: #ffffff00;
  border-radius: 10px;
  border: 3px solid #c4d270;
  padding: 0.3em;
  width: 175px;
  color: #228c22;
  margin-top: 25px;
}
#backButton:hover {
  background-color: #c4d270;
  color: white;
}

@media (max-width: 450px) {
  #backButton:hover {
    background-color: #ffffff00;
    color: #228c22;
  }
}
</style>