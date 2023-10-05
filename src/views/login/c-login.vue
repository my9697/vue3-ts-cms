<script setup lang="ts">
import { ref, watch } from "vue"
import Account from "./account.vue"
import { localCatch } from "../../utils/catch"

const remember = ref<boolean>(Boolean(localCatch.getCatch("remember")) ?? false)
watch(remember, (newValue) => {
  localCatch.setCatch("remember", newValue)
})
const accountRef = ref<InstanceType<typeof Account>>()
const activeName = ref("account")
function btnClick() {
  if (activeName.value === "account") {
    accountRef.value?.loginAction(remember.value)
  } else {
    console.log("password")
  }
}
</script>

<template>
  <div class="c-login">
    <div class="content">
      <h2>后台管理系统</h2>
      <div class="tabs">
        <el-tabs type="border-card" stretch v-model="activeName">
          <el-tab-pane name="account">
            <template #label>
              <span class="icon">
                <el-icon><UserFilled /></el-icon>
              </span>
              <span class="text"> 帐户登录 </span>
            </template>
            <Account ref="accountRef" />
          </el-tab-pane>
          <el-tab-pane name="phone">
            <template #label>
              <span class="icon">
                <el-icon><Iphone /></el-icon>
              </span>
              <span class="text">手机登录</span>
            </template>
            456
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="control">
        <div class="remember">
          <el-checkbox v-model="remember" label="记住密码" size="large" />
        </div>
        <div class="forget">
          <el-link type="primary">忘记密码</el-link>
        </div>
      </div>
      <el-button type="primary" class="login-btn" size="large" @click="btnClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.c-login {
  width: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    text-align: center;
  }
  .tabs {
    margin-top: 20px;
    .icon {
      padding-right: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .control {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .remember {
      flex: 1;
    }
    .forget {
      flex: 1;
      margin-left: 110px;
    }
  }
  .login-btn {
    width: 100%;
  }
}
</style>
