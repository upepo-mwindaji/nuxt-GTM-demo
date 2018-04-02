<template>
  <div>
    <h3>
      Mounted
    </h3>
  </div>
</template>

<script>
export default {
  mounted () {
    this.gtmStandardEvent(false, 'Mounts', 'mounted', 'mounted demo component', 0)
  }
}
</script>

<style scoped>

h3 {
  font-weight: 600;
  font-size: 30px;
  color: #5d3f92;
  word-spacing: 5px;
  padding-bottom: 15px;
}

</style>
