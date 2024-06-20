import request from "@/utils/request";

export async function getSetting() {
  return await request({
    url: "/api/setting",
    method: "get",
  });
}

export async function changeSetting(data) {
  return await request({
    url: "/api/setting",
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
