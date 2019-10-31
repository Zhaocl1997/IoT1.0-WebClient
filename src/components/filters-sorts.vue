<template>
  <div class="filters_sorts">
    <div class="actions">
      <div class="actions__container">
        <input type="text" id="input" placeholder="Filter devices" @input="inputFunc" />
        <select id="filter-by" class="dropdown" v-model="sorts" @change="selectFunc">
          <option disabled value>Pick your choice</option>
          <option>byEdited</option>
          <option>byCreated</option>
          <option>alphabetical</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      sorts: ""
    };
  },
  methods: {
    selectFunc() {
      this.$emit("sortsEvent", this.sorts);
    },
    inputFunc() {
      const inputText = document.querySelector("input").value;
      this.$emit("filtersEvent", inputText);
    }
  }
};
</script>

<style scoped>
.actions {
  float: left;
  padding-top: 40px;
}
#input {
  padding: 10px;
  margin-right: 10px;
}
.dropdown {
  padding: 10px;
  width: 200px;
}
</style>