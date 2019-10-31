<template>
  <div class="dev_update">
    <div class="dev_update_title">
      <h4>Add New Device</h4>
    </div>

    <div class="dev_update_con_main">
      <div class="dev_update_con_part">
        <input type="text" v-model="name" autofocus required />
      </div>

      <div class="dev_update_con_part">
        <input type="text" v-model="macAddress" autofocus required />
      </div>

      <div class="dev_update_con_part">
        <button @click="handleUpdate" style="background-color: deepskyblue">Update</button>
      </div>

      <div class="dev_update_con_part">
        <center>
          <hr />
        </center>
      </div>

      <div class="dev_update_con_part">
        <button @click="handleBack" style="background-color: purple">Back</button>
      </div>
    </div>

    <popup v-if="isPopup" @popupEvent="popupValue" :cancelData="iscancel">
      <h3 style="color: #ee0f06">{{ title }}</h3>
    </popup>
  </div>
</template>

<script>
import { deviceService } from "../../api/device";
import { local } from "../../function/local";

export default {
  name: "",
  data() {
    return {
      isPopup: false,
      iscancel: true,
      title: "",
      name: local.loadLocal("deviceinfo").name,
      macAddress: local.loadLocal("deviceinfo").macAddress,
      id: local.loadLocal("deviceinfo")._id
    };
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  methods: {
    async popupValue(data) {
      switch (data) {
        case "cancel":
          this.isPopup = false;
          break;

        case "yes":
          this.isPopup = false;

          try {
            const result = await deviceService.update({
              id: this.id,
              name: this.name,
              macAddress: this.macAddress
            });

            if (result.status === true) {
              this.title = "Success";
              this.iscancel = false;
              this.isPopup = true;
            }
          } catch (error) {
            this.title = "Failure";
            this.iscancel = false;
            this.isPopup = true;
          }

          break;

        case "success":
          this.isPopup = false;
          if (this.title === "Success") {
            local.removeLocal("deviceinfo");
            this.$router.push("/device");
          }
          break;

        default:
          break;
      }
    },
    handleUpdate() {
      this.isPopup = true;

      if (this.name && this.macAddress !== "") {
        this.title = "Are you sure to update?";
      } else {
        this.title = "Must provide name and macAddress!";
        this.iscancel = false;
        setTimeout(() => {
          this.iscancel = true;
        }, 1000);
      }
    },
    handleBack() {
      local.removeLocal("deviceinfo");
      this.$router.push("/device");
    }
  }
};
</script>

<style scoped>
.dev_update {
  height: 737px;
}
/* update device标题 */
.dev_update_title {
  padding: 20px;
  font-size: 50px;
  color: black;
}

/* 
 *主体div 
 */
.dev_update_con_main {
  margin: 20px 20%;
  border: 1px solid rgb(41, 40, 40);
  box-shadow: 0px 0px 20px #9c9c9c;
}

/* 
 *部件div
 */
.dev_update_con_part {
  margin: 20px;
}

/* 输入框 */
input {
  padding: 20px;
  width: 80%;
  font-size: 30px;
  background-color: lightyellow;
}
input:focus {
  border-color: #66afe9;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

/* 按钮 */
button {
  padding: 20px;
  width: 84%;
  font-size: 30px;
  color: white;
  border: none;
}
button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

/* 分割线 */
hr {
  width: 82%;
}
</style>