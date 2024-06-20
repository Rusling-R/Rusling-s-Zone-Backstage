import request from "@/utils/request";

export async function getAbout() {
  return await request({
    url: "/api/about",
    method: "get",
  });
}

export async function changeAbout(url) {
  return await request({
    url: "/api/about",
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: {
      url,
    },
  });
}
