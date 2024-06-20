import request from "@/utils/request";

export function getBanner() {
  return new Promise((resolve, reject) => {
    request({
      url: "/api/banner",
      method: "get",
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function postBanner(data) {
  return await request({
    url: "/api/banner",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
