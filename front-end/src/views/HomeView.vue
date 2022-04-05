<template>
  <div class="home">
    <typewriter
      class="zen-type"
      :replace="replace"
      :type-replace="100"
      :replace-interval="1250"
    >
      Looking for zen?
    </typewriter>
    <div class="button" v-on:click="switchToPlanter">Start Planting</div>
  </div>
</template>

<script>
import Typewriter from "typewriter-vue";
export default {
  name: "HomeView",
  components: {
    Typewriter,
  },
  data: () => ({
    replace: [
      {
        from: "Looking for zen?",
        to: "Plant here!",
      },
    ],
  }),
  methods: {
    switchToPlanter() {
      this.$router.push("/planter");
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.zen-type {
  user-select: none;
  font-size: 140px;
  padding: 10px;
}

.home h2 {
  padding: 20px;
  font-size: 25px;
}

.button {
  user-select: none;
  cursor: pointer;
  font-size: 30px;
  background-color: #ffffff00;
  border-radius: 10px;
  border: 3px solid #c4d270;
  color: #228c22;
  padding: 0.3em;
  width: 250px;
  margin: 0 auto 25px auto;
}

.button:hover {
  background-color: #c4d270;
  color: white;
}

@media (max-width: 450px) {
  .zen-type {
    font-size: 50px;
    margin-bottom: 25px;
  }
  .button:hover {
    background-color: #ffffff00;
    color: #228c22;
  }
}
</style>
