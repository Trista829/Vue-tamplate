<template>
  <div class="app">
    <!-- 最好写一个通用组件，不建议多个页面都写 -->
    <!-- <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar> -->
    <div class="app__content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
