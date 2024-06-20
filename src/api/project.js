import request from "@/utils/request";

export async function getProject() {
  return await request({
    url: "/api/project",
    method: "get",
  });
}

export async function deleteProject(id) {
  return await request({
    url: `/api/project/${id}`,
    method: "delete",
  });
}

export async function changeProject(data) {
  return await request({
    url: `/api/project/${data.id}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data: data.data,
  });
}

export async function addProject(data) {
  return await request({
    url: "/api/project",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
