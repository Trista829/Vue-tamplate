<template>
  <div class="department">
    <header class="department__header">
      <!-- 导航栏 -->
      <van-nav-bar left-text="返回" title="部门信息" left-arrow @click-left="goBack">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </header>
    <div class="department__content">
      <el-tree
        :props="props"
        :load="loadNode"
        lazy
        show-checkbox
        @check-change="handleCheckChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "department",
  data() {
    return {
      props: {
        label: "name",
        children: "zones"
      }
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++
            },
            {
              name: "zone" + this.count++
            }
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    }
  }
};
</script>
