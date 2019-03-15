<template>
  <div>
   <div class="top-nav">
      <button v-on:click="undo" id="undo-btn">Undo</button>
      <button v-on:click="clear" id="clear-btn">Clear</button>
      <input type="color" id="color-picker">
      <input type="range" id="brush-size" min="1" max="50" value="10">
    </div>
    <canvas v-canvas id="paint"></canvas>
  </div>
</template>

<script>
import canvas from '../src/canvas.js';

export default {
  name: 'app',
  directives: {
    canvas,
  }
}
</script>

<style>

body {
    margin: 0;
}

.top-nav {
    display: flex;
    flex-direction: row;
    background-color: rgb(248, 232, 4);
    border: 2px solid black;
    position: absolute;
    width: 100%;
}

.top-nav * {
    margin: 5px 10px;
}

#paint {
    display: block;
}
</style>
