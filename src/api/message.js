import request from "@/utils/request";

export async function getMessage(page, limit) {
  return await request({
    url: "/api/message",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

export async function deleteMessage(id) {
  return await request({
    url: `/api/message/${id}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
