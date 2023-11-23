<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
      >
        Remember me
      </a-checkbox>
      <a class="login-form-forgot" href="">
        Forgot password
      </a>
      <a-button type="primary" html-type="submit" class="login-form-button">
        Log in
      </a-button>
      Or
      <a href="">
        register now!
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  middleware: 'login',
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          const {userName, password} = values;
          try {
            const val = await this.$axios.post('/login', {userName, password});
            this.$message.success(val.msg);
            this.$store.commit('setUser', val.name);
            this.$store.commit('setLogin', true);
            const url = this.$route.query.url || '/home';
            this.$router.push(url);
            // console.log(val);
          } catch (error) {
            this.$message.error(error.msg);
          }
        }
      });
    },
  },
};
</script>
<style>
.login-form {
  max-width: 300px;
  margin: 0 auto;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
</style>
