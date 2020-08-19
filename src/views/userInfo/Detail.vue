<template>
  <div class="detail">
    <header class="detail__header">
      <!-- 导航栏 -->
      <van-nav-bar
        left-text="返回"
        title="用户信息"
        left-arrow
        @click-left="goBack"
      >
        <template #right>
          <van-icon
            name="search"
            size="18"
          />
        </template>
      </van-nav-bar>
    </header>
    <div class="detail__content">

    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
