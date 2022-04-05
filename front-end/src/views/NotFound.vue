<template>
<div class="not-found">
  <h2 id="message">Woah, you're trying to access stuff that doesn't exist!</h2>   
  <img id="head" src="cool-plant.png">
  <img id="pot" src="nuke.png">
  <div id="backButton" @click="backToPlanting">Back to Planting</div>

</div>
</template>

<script>
export default {
   name: 'NotFound',
   methods: {
       backToPlanting(){
           this.$router.push('/planter')
       }
   }
}
</script>


<style scoped>

.not-found{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
#head{
    width:300px;
    height:auto;
    user-select: none;
    -webkit-user-drag: none;
}
#pot{
    width:300px;
    height:auto;
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