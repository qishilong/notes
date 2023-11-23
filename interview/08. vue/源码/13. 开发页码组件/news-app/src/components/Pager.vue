<template>
  <div class="pager" v-if="total > 0">
    <a
      href=""
      class="pager-item"
      :class="{
        disabled: page === 1,
      }"
      @click.prevent="handleChange(1)"
      >首页</a
    >
    <a
      href=""
      class="pager-item"
      :class="{
        disabled: page === 1,
      }"
      @click.prevent="handleChange(page - 1)"
      >上一页</a
    >

    <a
      class="pager-item"
      :class="{
        active: n === page,
      }"
      @click.prevent="handleChange(n)"
      href=""
      v-for="n in numbers"
      :key="n"
    >
      {{ n }}
    </a>

    <a
      href=""
      class="pager-item"
      :class="{
        disabled: page === pageNumber,
      }"
      @click.prevent="handleChange(page + 1)"
      >下一页</a
    >
    <a
      href=""
      class="pager-item"
      :class="{
        disabled: page === pageNumber,
      }"
      @click.prevent="handleChange(pageNumber)"
      >尾页</a
    >

    <span class="pager-text">
      <i>{{ page }}</i>
      /
      <i>{{ pageNumber }}</i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      // 当前页码
      default: 1,
      type: Number,
    },
    total: {
      // 总数据量
      default: 0,
      type: Number,
    },
    limit: {
      // 页容量：每页显示多少条数据
      default: 10,
      type: Number,
    },
    panelNumber: {
      // 最多显示多少个数字页码
      default: 10,
      type: Number,
    },
  },
  computed: {
    // 总页数
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    minNumber() {
      //计算当前显示的最小的页码数字
      var n = this.page - this.panelNumber / 2;
      if (n < 1) {
        n = 1;
      }
      return n;
    },
    maxNumber() {
      var n = this.minNumber + this.panelNumber - 1;
      if (n > this.pageNumber) {
        n = this.pageNumber;
      }
      return n;
    },
    numbers() {
      var nums = [];
      for (var i = this.minNumber; i <= this.maxNumber; i++) {
        nums.push(i);
      }
      return nums;
    },
  },
  methods: {
    handleChange(newPage) {
      if (newPage < 1) {
        newPage = 1;
      } else if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.page) {
        // 页码没有变化
        return;
      }
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style scoped>
.pager {
  text-align: center;
  margin: 20px 0;
}

.pager .pager-item {
  display: inline-block;
  padding: 5px 7px;
  border: 1px solid #ccc;
  margin: 8px;
  cursor: pointer;
  color: rgb(96, 96, 224);
}

.pager .pager-item.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.pager .pager-item.active {
  color: #f40;
  border: none;
  cursor: auto;
}
</style>
