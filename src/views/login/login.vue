<template>
  <div class="login" @keyup.enter="handleLogin">
    <div class="login_title">
      <h4>Login to Web App</h4>
    </div>

    <div class="login_con_main">
      <div class="login_con_part">
        <p>Sign In</p>
      </div>

      <div class="login_con_part">
        <input v-model="email" placeholder="E-mail" type="email" autofocus required />
      </div>

      <div class="login_con_part">
        <input v-model="password" placeholder="Password" type="password" autofocus required />
      </div>

      <div class="login_con_part">
        <button style="background-color: deepskyblue" @click="handleLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  methods: {
    ...mapActions("userState", ["login"]),

    handleLogin() {
      const item = {
        email: this.email,
        password: this.password
      };

      if (item.email && item.password !== "") {
        this.login(item);
      } else {
        alert("请输入账号密码！");
      }
    }
  }
};
</script>

<style scoped>
.login {
  height: 737px;
}
/* login标题 */
.login_title {
  padding: 20px;
  font-size: 50px;
  color: black;
}
/* 
 *主体div 
 */
.login_con_main {
  margin: 20px 20%;
  border: 1px solid rgb(41, 40, 40);
  box-shadow: 0px 0px 20px #9c9c9c;
}

/* 
 *部件div
 */
.login_con_part {
  margin: 20px;
}

/* login-P */
p {
  font-size: 30px;
  color: grey;
  padding-bottom: 20px;
}

/* 输入框 */
input {
  padding: 20px;
  width: 80%;
  font-size: 30px;
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