<template>
  <div class="popup">
    <div class="popup_bg"></div>

    <div class="popup_con">
      <div class="popup_con_bd">
        <slot></slot>
      </div>

      <div class="popup_con_ft">
        <button
          class="popup_con_btn"
          style="background-color: red"
          @click="onCancel"
          v-if="cancel"
        >Cancel</button>
        <button
          class="popup_con_btn"
          style="background-color: deepskyblue"
          @click="onConfirm"
        >Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      cancel: this.cancelData
    };
  },
  props: {
    cancelData: {
      type: Boolean
    }
  },
  methods: {
    onConfirm() {
      if (this.cancel === true) {
        this.$emit("popupEvent", "yes");
      }
      if (this.cancel === false) {
        this.$emit("popupEvent", "success");
      }
    },
    onCancel() {
      this.$emit("popupEvent", "cancel");
    }
  }
};
</script>

<style scoped>
/* 虚化背景 */
.popup_bg {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

/* 弹窗 */
.popup_con {
  text-align: left;
  position: fixed;
  z-index: 5000;
  width: 80%;
  max-width: 400px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  text-align: center;
  border-radius: 4px;
  overflow: hidden;
}

/* 标题 */
.popup_con_bd {
  padding: 40px 50px 40px;
  font-size: 20px;
}

/* 按钮 */
.popup_con_ft {
  position: relative;
  font-size: 20px;
  display: flex;
}
.popup_con_btn {
  border: none;
  flex: 1;
  color: white;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>