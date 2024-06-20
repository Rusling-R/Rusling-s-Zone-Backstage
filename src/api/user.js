import request from "@/utils/request";

export async function getCodeImg() {
  return await request({ url: "/res/captcha", method: "get" });
}

// 登录方法
export async function login(data) {
  return await request({
    url: "/api/admin/login",
    method: "post",
    data,
  });
}

// 恢复登录
export async function getInfo() {
  return await request({
    url: "/api/admin/whoami",
    method: "get",
  });
}

export async function changeInfo(data) {
  return await request({
    url: "/api/admin",
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
