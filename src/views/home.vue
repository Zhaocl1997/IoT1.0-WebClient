<template>
  <div>
    <img src="../assets/home.png" alt="">
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    document.title = this.$route.meta.title;
  }
};
</script>

<style>
img {
  height: 733px;
}
</style>