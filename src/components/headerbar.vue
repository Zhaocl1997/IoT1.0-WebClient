<template>
  <div class="header">
    <div class="header_title">
      <button id="home" @click="handleHome" disabled style="font-size: 50px">Web App</button>
    </div>

    <div class="header_logout" v-if="isLogout">
      <button @click="handleLogout">Logout</button>
    </div>

    <div class="header_register" v-if="isRegister">
      <button @click="handleRegister">Register</button>
    </div>

    <div class="header_login" v-if="isLogin">
      <button @click="handleLogin">Login</button>
    </div>

    <popup v-if="isPopup" @popupEvent="popupValue" :cancelData="iscancel">
      <h3 style="color: #ee0f06">{{ title }}</h3>
    </popup>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "",
  data() {
    return {
      isPopup: false,
      iscancel: true,
      title: ""
    };
  },
  methods: {
    ...mapActions("userState", ["logout"]),

    handleLogout() {
      this.title = "Are you sure to leave?";
      this.isPopup = true;
    },
    handleRegister() {
      this.$router.push("/register");
    },
    handleLogin() {
      this.$router.push("/login");
    },
    handleHome() {
      this.$router.push("/");
    },
    popupValue(data) {
      switch (data) {
        case "cancel":
          this.isPopup = false;
          break;

        case "yes":
          this.logout();
          this.$router.push("/");
          this.isPopup = false;
          break;

        default:
          break;
      }
    }
  },
  computed: {
    isLogout() {
      if (this.$store.state.userState.status === "login") {
        return true;
      }
    },
    isRegister() {
      if (this.$store.state.userState.status === "logout") {
        return true;
      }
    },
    isLogin() {
      if (this.$store.state.userState.status === "logout") {
        return true;
      }
    }
  },
  mounted() {
    if (this.$store.state.userState.status === "logout") {
      document.getElementById("home").disabled = false;
    }
  }
};
</script>

<style scoped>
/* 
 *主体div 
 */
.header {
  background-color: deepskyblue;
  height: 100px;
  width: 100%;
}

/* 
 *部件div
 */
.header_title {
  float: left;
  padding-left: 20%;
  padding-top: 20px;
  font-size: -webkit-xxx-large;
  color: white;
}

/* 按钮 */
button {
  font-size: 25px;
  color: white;
  background-color: deepskyblue;
  text-decoration: none;
  border: none;
}
.header_logout {
  float: right;
  padding-right: 20%;
  padding-top: 40px;
}
.header_register {
  float: right;
  padding-right: 20%;
  padding-top: 40px;
}
.header_login {
  float: right;
  padding-right: 5%;
  padding-top: 40px;
}
</style>