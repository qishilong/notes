<template>
  <div id="app">
    <div>
      <el-link @click="handleClick" href="https://element.eleme.io" target="_blank">默认链接</el-link>
      <el-link @click="handleClick" type="primary">主要链接</el-link>
      <el-link type="success">成功链接</el-link>
      <el-link type="warning">警告链接</el-link>
      <el-link type="danger">危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </div>
    <div>
      <el-link disabled>默认链接</el-link>
      <el-link @click="handleClick" type="primary" disabled>主要链接</el-link>
      <el-link type="success" disabled>成功链接</el-link>
      <el-link type="warning" disabled>警告链接</el-link>
      <el-link type="danger" disabled>危险链接</el-link>
      <el-link type="info" disabled>信息链接</el-link>
    </div>
    <div>
      <el-link :underline="false">无下划线</el-link>
      <el-link>有下划线</el-link>
    </div>
    <div>
      <el-link icon="el-icon-edit">编辑</el-link>
      <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    handleClick() {
      console.log('xxx');
    },
  },
};
</script>

<style>
  .el-link {
    margin-right: 10px;
  }
</style>
