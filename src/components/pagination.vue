<template>
  <div class="pagination">
    <div
      class="pagination_container"
      v-if="(this.pageData.lastPage !== 1 && this.pageData.lastPage !== 0)"
    >
      <button
        @click="firstP"
        v-if="(this.pageData.currentPage !== 1 && this.pageData.previousPage !== 1)"
      >1</button>
      <button
        @click="previousP"
        v-if="(this.pageData.hasPreviousPage)"
      >{{ this.pageData.previousPage }}</button>
      <button @click="current">{{ this.pageData.currentPage }}</button>
      <button @click="nextP" v-if="(this.pageData.hasNextPage)">{{ this.pageData.nextPage }}</button>
      <button
        @click="lastP"
        v-if="(this.pageData.lastPage !== this.pageData.currentPage && this.pageData.nextPage !== this.pageData.lastPage)"
      >{{ this.pageData.lastPage }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    pageData: {
      type: Object
    }
  },
  methods: {
    firstP() {
      this.$emit("paginationEvent", 1);
    },
    previousP() {
      this.$emit("paginationEvent", this.pageData.previousPage);
    },
    current() {
      this.$emit("paginationEvent", this.pageData.currentPage);
    },
    nextP() {
      this.$emit("paginationEvent", this.pageData.nextPage);
    },
    lastP() {
      this.$emit("paginationEvent", this.pageData.lastPage);
    }
  }
};
</script>

<style scoped>
/* 分页 */
.pagination_container {
  margin-top: 2rem;
  text-align: center;
}
.pagination_container button {
  text-decoration: none;
  color: rgb(55, 55, 241);
  background-color: white;
  padding: 10px;
  border: 1px solid lightgray;
  margin: 10px;
}
.pagination_container button:hover,
.pagination_container button:active {
  background: deepskyblue;
  color: white;
}
</style>