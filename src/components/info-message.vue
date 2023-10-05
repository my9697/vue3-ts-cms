<script setup lang="ts">
import { localCatch } from "../utils/catch"
import { useRouter } from "vue-router"

const router = useRouter()
function click() {
  // 1.删除token
  localCatch.removeCatch("token")
  // 2.跳回登录界面
  router.push("/login")
}
</script>

<template>
  <div class="message">
    <span
      ><el-icon><Message /></el-icon
    ></span>
    <span class="dot"
      ><el-icon><ChatLineRound /></el-icon>
      <div class="dot_1"></div>
    </span>
    <span
      ><el-icon><Search /></el-icon
    ></span>
    <div class="img">
      <img src="#" alt="" />
    </div>
    <div class="text">
      <el-dropdown>
        <div class="MYu">MYu</div>

        <template #dropdown>
          <el-dropdown-item @click="click">
            <span
              ><el-icon><CircleClose /></el-icon
            ></span>
            <span>退出系统</span>
          </el-dropdown-item>

          <el-dropdown-item>
            <span
              ><el-icon><Unlock /></el-icon
            ></span>
            <span>个人信息</span>
          </el-dropdown-item>

          <el-dropdown-item>
            <span
              ><el-icon><InfoFilled /></el-icon
            ></span>
            <span>修改密码</span>
          </el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.message {
  display: flex;
  flex-direction: row;
  .img {
    height: 26px;
    width: 26px;
    background-color: antiquewhite;
    border-radius: 13px;
    margin-left: 10px;
  }
  .MYu {
    margin: 0px 30px 0px 6px;
    text-align: center;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
  }
}
span {
  margin: 6px;
}
.dot {
  position: relative;
  .dot_1 {
    position: absolute;
    height: 4px;
    width: 4px;
    border-radius: 2px;
    background-color: red;
    top: -3px;
    right: -4px;
  }
}
</style>
