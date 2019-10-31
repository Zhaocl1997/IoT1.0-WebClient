<template>
  <div class="device_card">
    <div class="device_card_container" v-for="item in devData" :key="item._id">
      <div class="device_card_title">{{ item.name }}</div>

      <div class="device_card_message">
        <span style="color: black">{{ item.macAddress }}</span>
        <span style="color: grey">{{ item.updatedAt }}</span>
        <p style="visibility: hidden;width: 0px;height: 0px">{{ item._id }}</p>
      </div>

      <div class="device_card_button">
        <button style="background-color: deepskyblue" @click="handleView">View</button>
        <button style="background-color: red" @click="handleDel">Delete</button>
        <button style="background-color: green" @click="handleUpdate">Update</button>
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
  inject: ["reload"],
  name: "",
  data() {
    return {
      isPopup: false,
      iscancel: true,
      title: "",
      id: ""
    };
  },
  props: {
    devData: {
      type: Array
    }
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
            const result = await deviceService.del(this.id);

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
            this.reload();
          }
          break;

        default:
          break;
      }
    },
    getDeviceID(e) {
      return e.target.parentNode.parentNode.childNodes[1].childNodes[2]
        .innerHTML;
    },
    handleDel(e) {
      const deviceId = this.getDeviceID(e);
      this.id = deviceId;

      this.isPopup = true;
      this.title = "Are you sure to delete?";
    },
    async handleView(e) {
      const deviceId = this.getDeviceID(e);

      const result = await deviceService.retrieve(deviceId);

      if (result.status === true) {
        this.$router.push("/view-device");
      }
    },
    async handleUpdate(e) {
      const deviceId = this.getDeviceID(e);

      const result = await deviceService.retrieve(deviceId);

      if (result.status === true) {
        local.saveLocal("deviceinfo", result.data);
        this.$router.push("/update-device");
      }
    }
  }
};
</script>

<style scoped>
/* 主体 */
.device_card_container {
  display: inline-block;
  border: 5px solid lightgrey;
  margin: 20px;
}

/* 标题 */
.device_card_title {
  font-size: 30px;
  text-align: left;
  background-color: grey;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
}

/* 信息 */
span {
  display: block;
  text-align: left;
  background-color: white;
  margin-bottom: 15px;
  margin-top: 15px;
  padding-left: 20px;
}

/* 按钮 */
.device_card_button {
  width: 400px;
}
button {
  border: none;
  width: 33.33%;
  height: 50px;
  color: white;
}
</style>