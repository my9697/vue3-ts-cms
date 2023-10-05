<script setup lang="ts">
import { reactive, ref } from "vue"
// import { defineExpose } from "vue";
import type { FormRules, ElForm } from "element-plus"
import { ElMessage } from "element-plus"
import { accountLogin } from "../../serve/login/login"
import useLoginStore from "../../stores/login/login"
import type { Iaccount } from "../../types/type"
import { localCatch } from "../../utils/catch"
import { useRouter } from "vue-router"

const router = useRouter()

// 定义数据

const account = reactive<Iaccount>({
  name: localCatch.getCatch("name") ?? "",
  password: localCatch.getCatch("password") ?? ""
})

// 定义规则
const accountRules = {
  name: [
    {
      required: true,
      message: "必须输入帐号信息",
      trigger: "blur"
    },
    {
      min: 6,
      max: 12,
      message: "必须是8~12位的数字或者字母组成",
      trigger: "change"
    }
  ],
  password: [
    {
      required: true,
      message: "必须输入密码信息",
      trigger: "blur"
    },
    {
      // pattern: /^[a-z0-9]{6~12}$/,
      min: 6,
      max: 12,
      message: "必须是6~12位数字或者字母组成",
      trigger: "change"
    }
  ]
}

// 登录逻辑

const loginStore = useLoginStore()
function loginAction(remember: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      //  获取用户账号和密码
      const name = account.name
      const password = account.password
      // 向服务器发送网络请求（携带帐号和密码）
      loginStore.accountLoginAction({ name, password }).then((res) => {
        // 判断是否需要记住密码
        if (remember) {
          localCatch.setCatch("name", name)
          localCatch.setCatch("password", password)
        } else {
          localCatch.removeCatch("name")
          localCatch.removeCatch("password")
        }
        router.push("./main")
      })
    } else {
      ElMessage.error("Oops,请您输入正确的格式后再登陆")
    }
  })
}
defineExpose({
  loginAction
})

const formRef = ref<InstanceType<typeof ElForm>>()
</script>

<template>
  <div class="account">
    <el-form :model="account" :rules="accountRules" status-icon ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less"></style>
