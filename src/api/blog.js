import request from "@/utils/request";

export async function getBlogList(page = 1, limit = 10) {
  return await request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

export async function addBlog(data) {
  return await request({
    url: "/api/blog",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function deleteBlog(id) {
  return await request({
    url: `/api/blog/${id}`,
    method: "delete",
  });
}

export async function getBlogType() {
  return await request({
    url: "/api/blogtype",
    method: "get",
  });
}

export async function deleteBlogType(id) {
  return await request({
    url: `/api/blogtype/${id}`,
    method: "delete",
  });
}

export async function addBlogType(data) {
  return await request({
    url: "/api/blogtype",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function changeBlogType(info) {
  return await request({
    url: `/api/blogtype/${info.id}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data: info.data,
  });
}

export async function getBlog(id) {
  return await request({
    url: `/api/blog/${id}`,
    method: "get",
  });
}

export async function changeBlog(blog) {
  return await request({
    url: `/api/blog/${blog.id}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data: blog.data,
  });
}
