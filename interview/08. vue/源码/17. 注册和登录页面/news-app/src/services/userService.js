import axios from "axios";
export async function login(loginInfo) {
  // post http://study.yuanjin.tech/api/user/login
  var resp = await axios.post("/api/user/login", loginInfo);
  var token = resp.headers.authorization; // 拿到服务器的令牌
  if (token) {
    // 把令牌保存下来
    localStorage.setItem("token", token);
  }
  return resp.data;
}

// 使用保存的令牌从服务器换取登录信息
export async function whoAmI() {
  // get http://study.yuanjin.tech/api/user/whoami
  // authorization: bearer tokenxxxxx
  var token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  var resp = await axios.get("/api/user/whoami", {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  return resp.data.data;
}

// 注销
export function loginOut() {
  localStorage.removeItem("token");
}

// 注册
export async function reg(userInfo) {
  // post http://study.yuanjin.tech/api/user/reg
  var resp = await axios.post("/api/user/reg", userInfo);
  return resp.data;
}
