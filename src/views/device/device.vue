<template>
  <div class="device">
    <div class="device_header">
      <div class="device_header_actions" v-if="(!hasDevices)">
        <filtersANDsorts @filtersEvent="filterValue" @sortsEvent="sortValue" />
      </div>

      <div class="device_header_btn">
        <button @click="handleAddDevice">Add Device</button>
      </div>
    </div>

    <div class="device_con">
      <div class="device_con_tip" v-if="hasDevices">
        <p>No Devices</p>
      </div>

      <div class="device_con_card" v-if="(!hasDevices)">
        <deviceCard :devData="device" />

        <pagination :pageData="pagination" @paginationEvent="pageValue" />
      </div>
    </div>
  </div>
</template>

<script>
import deviceCard from "./device-card";
import pagination from "../../components/pagination";
import filtersANDsorts from "../../components/filters-sorts";
import { deviceService } from "../../api/device";
import { local } from "../../function/local";
import moment from "moment";
import { mapActions } from "vuex";

export default {
  name: "",
  components: {
    deviceCard,
    pagination,
    filtersANDsorts
  },
  data() {
    return {
      // 传入至子组件数据
      device: [], //设备数据
      pagination: [], //分页数据

      hasDevices: true,

      // 传出至父组件数据
      deviceReq: {
        page: 1, //页码
        filters: "", //查询
        sorts: "byEdited" //排序
      }
    };
  },
  methods: {
    ...mapActions("deviceState", ["index"]),

    pageValue(data) {
      this.deviceReq.page = data;
      this.getDevices(this.deviceReq);
    },
    filterValue(data) {
      this.deviceReq.filters = data;
      this.getDevices(this.deviceReq);
    },
    sortValue(data) {
      this.deviceReq.sorts = data;
      this.getDevices(this.deviceReq);
    },
    async getDevices(item) {
      const result = await this.index(item);

      this.hasDevices = false;
      this.device = result.devices;
      this.pagination = result.pagination;
      this.device.forEach(item => {
        item["updatedAt"] = `Last Update: ${moment(item["updatedAt"]).format(
          "ddd D, YYYY, h:mm:ss A"
        )}`;
      });
    },
    handleAddDevice() {
      this.$router.push("/add-device");
    }
  },
  mounted() {
    document.title = this.$route.meta.title;
    this.getDevices(this.deviceReq);
  }
};
</script>

<style scoped>
.device {
  height: 717px;
}
/* 设备头 */
.device_header_actions {
  text-align: left;
  margin-left: 20%;
  margin-top: 20px;
}
.device_header_btn {
  text-align: right;
  margin-right: 20%;
  margin-top: 20px;
}
button {
  border: none;
  border-radius: 15px;
  background-color: rgb(122, 24, 122);
  color: white;
  font-size: 30px;
  padding: 20px 20px 20px 60px;
}
button:hover {
  background-color: deepskyblue;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

/* 设备卡片 */
.device_con_tip {
  font-size: 80px;
  margin-top: 200px;
}
.device_con_card {
  margin: 0 50px 0;
  padding: 20px 50px 0;
}
</style>