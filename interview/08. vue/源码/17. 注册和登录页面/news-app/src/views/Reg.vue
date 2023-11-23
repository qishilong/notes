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
          <label>重复密码：</label
          ><input
            v-model="userInfo.pwdAgain"
            type="password"
            autocomplete="new-password"
            @input="validatePwdAgain"
          />
        </div>
        <FormError :msg="error.pwdAgain" />
      </div>
      <div class="form-item">
        <div class="input">
          <label>昵称：</label
          ><input
            v-model="userInfo.nickname"
            type="text"
            autocomplete="new-password"
            @input="validateEmpty('nickname', '请输入昵称')"
          />
        </div>
        <FormError :msg="error.nickname" />
      </div>
      <div class="form-item">
        <div class="input">
          <label></label>
          <button>注册</button>
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
        pwdAgain: "",
        nickname: "",
      },
      error: {
        loginId: "",
        loginPwd: "",
        pwdAgain: "",
        nickname: ""
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
      var validate1 = this.validateEmpty("loginId", "账号不能为空");
      var validate2 = this.validateEmpty("loginPwd", "密码不能为空");
      var validate3 = this.validatePwdAgain();
      var validate4 = this.validateEmpty("nickname", "请输入昵称");
      if (validate1 && validate2 && validate3 && validate4) {
        // 提交数据
        var resp = await reg(this.userInfo);
        if (resp.data) {
          // 注册成功
          alert("注册成功！！！");
          this.$router.push({
            name: "Login",
          });
        } else {
          this.error.loginId = resp.msg;
        }
      }
    },
    validatePwdAgain() {
      var result = this.validateEmpty("pwdAgain", "重复密码不能为空");
      if (result) {
        if (this.userInfo.loginPwd !== this.userInfo.pwdAgain) {
          this.error.pwdAgain = "两次密码不一致";
          return false;
        }
        return true;
      }
      return false;
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
