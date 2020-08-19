<template>
  <div class="userInfo">
    <router-view />

    <van-tabbar route v-model="active">
      <van-tabbar-item to="/userInfo/detail/1" icon="home-o">
        个人信息
      </van-tabbar-item>
      <van-tabbar-item to="/userInfo/department/1" icon="cluster-o">
        部门信息
      </van-tabbar-item>
      <van-tabbar-item to="/userInfo/roleManage/1" icon="user-o">
        角色信息
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      active: 0
    };
  }
};
</script>
