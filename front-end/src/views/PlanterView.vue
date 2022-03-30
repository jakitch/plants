<template>
    <div class="planter">
        <input v-model="plantName" placeholder="Enter a name!" spellcheck="false">
        <img class="sign" src="images/sign.png">
        <div class="img_container">
            <div class="plant_selector">
                <div class="arrow_container">
                    <img class="arrow" @click="getPrevPlant" src="images/left.png">
                </div>
                <img id="plant" v-bind:src="plantList[currPlant]">
                <div class="arrow_container">
                    <img class="arrow" @click="getNextPlant" src="images/right.png">
                </div>
            </div>
            <div class="pot_selector">
                <div class="arrow_container">
                    <img class="arrow" @click="getPrevPot" src="images/left.png">
                </div>
                <img id="pot" v-bind:src="potList[currPot]">
                <div class="arrow_container">
                    <img class="arrow" @click="getNextPot" src="images/right.png">
                </div>
            </div>
        </div>
        <div id="addButton" @click="addPlant">Add</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "PlanterView",
    data() {
        return {
            plantName: "",
            currPlant: 0,
            currPot: 0,
            plantList: ['images/test1.jpg', 'images/test2.jpg', 'images/test3.jpg', 'images/rockHead.jpeg'],
            potList: ['images/oh1.jpg', 'images/oh2.jpg', 'images/oh3.jpg', 'images/rockBottom.png'],
        }
    },
    methods: {
        getNextPlant() {
            if(this.currPlant === this.plantList.length - 1) {
                this.currPlant = 0;
            }
            else {
                this.currPlant++;
            }
        },
        getNextPot() {
            if(this.currPot === this.potList.length - 1) {
                this.currPot = 0;
            }
            else {
                this.currPot++;
            }
        },
        getPrevPlant() {
            if(this.currPlant === 0) {
                this.currPlant = this.plantList.length - 1;
            }
            else {
                this.currPlant--;
            }
        },
        getPrevPot() {
            if(this.currPot === 0) {
                this.currPot = this.potList.length - 1;
            }
            else {
                this.currPot--;
            }
        },
        async addPlant() {
            try {
                await axios.post('/api/plants', {
                    name: this.plantName,
                    plantType: this.plantList[this.currPlant],
                    potType: this.potList[this.currPot]
                });
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style scoped>

    .sign {
        width:200px;
        height: auto;
        margin-bottom: 20px;
    }
    .planter input{
        width:175px;
        padding-top: 30px;
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
    .planter input::placeholder{
        color:black;
        font-style: italic;
    }
    .img_container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #plant {
        width:300px;
        height:auto;
    }
    #pot {
        width:300px;
        height:auto;
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
    #addButton{
        user-select: none;
        cursor: pointer;
        font-size: 20px;
        background-color: #c4d270;
        border-radius: 10px;
        padding: 0.3em;
        width: 75px;
        margin: 20px auto 25px auto;
        color: black;
    }
    #addButton:hover {
        background-color: #86b64f;
    }
</style>
