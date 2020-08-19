<template>
  <div class="roleManage">
    <header class="roleManage__header">
      <!-- 导航栏 -->
      <van-nav-bar left-text="返回" title="角色管理" left-arrow @click-left="goBack">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </header>
    <div class="roleManage__content">
      <van-cell v-for="(item, index) in roleList" :key="index" :value="item.value" />
      <van-button type="info" block @click="showPickerRole = true">添加</van-button>

      <!-- 用户角色选择器 -->
      <van-popup v-model="showPickerRole" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPickerRole = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";

export default {
  name: "roleManage",
  data() {
    return {
      showPickerRole: false,
      roleList: [
        {
          value: "USER"
        }
      ],
      columns: ["ADMIN", "USER"]
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
    onConfirm(value) {
      let haveValue = this.roleList.filter(el => {
        return el.value === value;
      });
      if (haveValue.length === 0) {
        this.roleList.push({ value });
        this.showPickerRole = false;
      } else {
        Notify({ type: "danger", message: `该用户已存在${value}角色` });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.roleManage {
  &__content {
    margin-top: 20px;
    button {
      margin-top: 20px;
    }
  }
}
</style>
