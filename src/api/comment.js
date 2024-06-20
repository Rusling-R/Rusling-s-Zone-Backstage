import request from "@/utils/request";

export async function getComment(page, limit) {
  return await request({
    url: "/api/comment",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

export async function deleteComment(id) {
  return await request({
    url: `/api/comment/${id}`,
    method: "delete",
  });
}
