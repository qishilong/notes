<template>
  <Center>
    <form class="login-container" @submit.prevent="handleSubmit">
      <div class="form-item">
        <div class="input">
          <label>账号：</label
          ><input
            v-model="userInfo.loginId"
            type="text"
            @input="validateEmpty('loginId', '账号不能为空')"
          />
        </div>
        <FormError :msg="error.loginId" />
      </div>
      <div class="form-item">
        <div class="input">
          <label>密码：</label
          ><input
            v-model="userInfo.loginPwd"
            type="password"
            autocomplete="new-password"
            @input="validateEmpty('loginPwd', '密码不能为空')"
          />
        </div>
        <FormError :msg="error.loginPwd" />
      </div>
      <div class="form-item">
        <div class="input">
          <label></label>
          <button>
            {{ $store.state.loginUser.isLoading ? "isLoading..." : "登录" }}
          </button>
        </div>
      </div>
    </form>
  </Center>
</template>

<script>
import Center from "../components/Center";
import FormError from "../components/FormError";
import { reg } from "../services/userService";
export default {
  components: {
    Center,
    FormError,
  },
  data() {
    return {
      userInfo: {
        loginId: "",
        loginPwd: "",
      },
      error: {
        loginId: "",
        loginPwd: "",
      },
    };
  },
  methods: {
    // 非空验证
    validateEmpty(field, msg) {
      if (this.userInfo[field]) {
        this.error[field] = "";
        return true;
      } else {
        this.error[field] = msg;
        return false;
      }
    },
    async handleSubmit() {
      if (this.$store.state.loginUser.isLoading) {
        //正在登录中
        return;
      }
      var validate1 = this.validateEmpty("loginId", "账号不能为空");
      var validate2 = this.validateEmpty("loginPwd", "密码不能为空");
      if (validate1 && validate2) {
        // 提交数据
        var result = await this.$store.dispatch(
          "loginUser/login",
          this.userInfo
        );
        if (result) {
          //登录成功
          this.$router.push({ name: "Home" });
        }
        else{
          this.error.loginId = "账号/密码不正确";
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 400px;
}

.form-item .input {
  display: flex;
}
.form-item label {
  width: 100px;
  display: inline-block;
  text-align: right;
  line-height: 41px;
}

.form-item input,
.form-item button {
  flex-grow: 1;
}
</style>
