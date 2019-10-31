<template>
  <div class="dev_add">
    <div class="dev_add_title">
      <h4>Add New Device</h4>
    </div>

    <div class="dev_add_con_main">
      <div class="dev_add_con_part">
        <input type="text" v-model="name" placeholder="Device name" autofocus required />
      </div>

      <div class="dev_add_con_part">
        <input type="text" v-model="macAddress" placeholder="MacAddress" autofocus required />
      </div>

      <div class="dev_add_con_part">
        <button @click="handleCreate" style="background-color: deepskyblue">Create</button>
      </div>

      <div class="dev_add_con_part">
        <center>
          <hr />
        </center>
      </div>

      <div class="dev_add_con_part">
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

export default {
  name: "",
  data() {
    return {
      name: "",
      macAddress: "",
      isPopup: false,
      iscancel: true,
      title: ""
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
            const item = {
              name: this.name,
              macAddress: this.macAddress
            };

            const result = await deviceService.create(item);

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
            this.$router.push("/device");
          }
          break;

        default:
          break;
      }
    },
    handleCreate() {
      this.isPopup = true;

      if (this.name && this.macAddress !== "") {
        this.title = `Are you sure to add device ${this.name} with macAddress ${this.macAddress} ?`
      } else {
        this.title = "Must provide name and macAddress!";
        this.iscancel = false;
        setTimeout(() => {
          this.iscancel = true;
        }, 1000);
      }
    },
    handleBack() {
      this.$router.push("/device");
    }
  }
};
</script>

<style scoped>
.dev_add {
  height: 737px;
}
/* add device标题 */
.dev_add_title {
  padding: 20px;
  font-size: 50px;
  color: black;
}

/* 
 *主体div 
 */
.dev_add_con_main {
  margin: 20px 20%;
  border: 1px solid rgb(41, 40, 40);
  box-shadow: 0px 0px 20px #9c9c9c;
}

/* 
 *部件div
 */
.dev_add_con_part {
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