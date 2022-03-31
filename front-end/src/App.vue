<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link active" to="/planter">Planter</router-link>
          <router-link class="nav-item nav-link active" to="/shelf">Shelf</router-link>
        </div>
      </div>
    </nav>
    <router-view class="view-content" />
    <footer id="foot">
        <a
          class="git-link"
          href="https://github.com/jakitch/plants"
          ><img src="/images/gitdark.png"
        /></a>
    </footer>
  </div>
</template>

<style>

#app{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    margin: 0px;
    background: rgb(238, 238, 238);
    text-align: center;
}
footer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color:#ffffff00; 
    text-align: center;
    height: 55px;
    flex-shrink: 0;
}
.view-content{
     flex: 1 0 auto;
}
</style>

