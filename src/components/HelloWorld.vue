<template>
  <div>
   <div>
      <button id="undo-btn">Undo</button>
      <button id="clear-btn">Clear</button>
      <input type="color" id="color-picker">
      <input type="range" id="brush-size" min="1" max="50" value="10">
    </div>
    <canvas id="paint"></canvas>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


