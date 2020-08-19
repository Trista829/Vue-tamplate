<template>
  <div class="home">
    <header class="home__header">
      <!-- 导航栏 -->
      <van-nav-bar title="首页" @click-left="leftPanel">
        <template #left>
          <van-icon name="ellipsis" size="18" />
        </template>
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
      <!-- 侧边栏 还有问题没有弹出，用top或bottom可以正常 -->
      <van-popup v-model="showLeftPanel" position="left" :style="{ width: '30%' }" />
    </header>
    <div class="home__content">
      <!-- 轮播图 -->
      <van-swipe class="my-banner" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" width="100%" height="200px" />
        </van-swipe-item>
      </van-swipe>
      <!-- 九宫格 -->
      <van-grid class="my-grid" :gutter="10">
        <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
      </van-grid>
      <!-- 用户信息列表 -->
      <div class="my-userList">
        <ul>
          <li v-for="(item, index) in userList" :key="index">
            <van-swipe-cell>
              <van-cell
                :border="false"
                :title="item.title"
                is-link
                :to="`/userInfo/detail/${item.id}`"
              />
              <template #right>
                <van-button square type="danger" text="删除" />
                <van-button square type="info" text="编辑" />
              </template>
            </van-swipe-cell>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      showLeftPanel: false,
      images: ["https://img.yzcdn.cn/vant/apple-1.jpg", "https://img.yzcdn.cn/vant/apple-2.jpg"],
      userList: [
        { title: "item1", id: "1" },
        { title: "item2", id: "2" },
        { title: "item3", id: "3" },
        { title: "item4", id: "4" },
        { title: "item5", id: "5" }
      ]
    };
  },
  methods: {
    leftPanel() {
      this.showLeftPanel = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  &__content {
    .my-grid {
      margin: 20px 0;
    }
  }
}
</style>
