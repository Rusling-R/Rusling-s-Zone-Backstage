<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎{{ info.name }}来到后台管理！！！</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Dashboard",
  computed: { ...mapState("user", ["info"]) },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
