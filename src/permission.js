import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  document.title = getPageTitle(to.meta.title);

  const userInfo = store.getters.userInfo;

  if (to.meta.auth) {
    if (userInfo) {
      next();
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await store.dispatch("user/getInfo");
          next();
        } catch (error) {
          await store.dispatch("user/resetToken");
          Message.error("登录过期，请重新登录");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    if (to.path === "/login" && userInfo) {
      next({ path: "/" });
    } else {
      next();
    }
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
