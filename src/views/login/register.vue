<template>
  <div class="register">
    <div class="register_title">
      <h4>Register with Web App</h4>
    </div>

    <div class="register_con_main">
      <div class="register_con_part">
        <p>Register</p>
      </div>

      <div class="register_con_part">
        <input v-model="username" placeholder="Name" type="text" autofocus required />
        <p class="tip">*Should between 6 ~ 15 characters</p>
      </div>

      <div class="register_con_part">
        <input v-model="email" placeholder="E-mail" type="email" autofocus required />
      </div>

      <div class="register_con_part">
        <input v-model="password" placeholder="Password" type="password" autofocus required />
        <p class="tip">*Should between 8 ~ 13 characters</p>
      </div>

      <div class="register_con_part">
        <button style="background-color: deepskyblue" @click="handleRegist">Register</button>
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
      password: "",
      username: ""
    };
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  methods: {
    ...mapActions("userState", ["regist"]),

    handleRegist() {
      const item = {
        email: this.email,
        password: this.password,
        name: this.username
      };

      try {
        if (item.email && item.password && item.name) {
          this.regist(item);
          this.$route.push('/device')
        } else {
          alert("请提供相应信息！");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.register {
  height: 737px;
}
/* register标题 */
.register_title {
  padding-top: 20px;
  font-size: 50px;
  color: black;
}
/* 
 *主体div 
 */
.register_con_main {
  margin: 20px 20%;
  border: 1px solid rgb(41, 40, 40);
  box-shadow: 0px 0px 20px #9c9c9c;
}

/* 
 *部件div
 */
.register_con_part {
  margin: 20px;
}

/* register-P */
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
.tip {
  color: red;
  font-size: 15px;
  padding-bottom: 0;
  text-align: left;
  padding-left: 8%;
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