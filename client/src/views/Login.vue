<template>
    <div class="login">
        <div class="form">
            <h1>用户登录</h1>
            <el-form label-width="80px">
                <el-form-item label="用户名称">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from "../utils/request";
export default {
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        login() {
            request.post("/login", this.user).then((res) => {
                if (res.data.code === 20000) {
                    localStorage.setItem("token", res.data.token);
                    this.$router.push("/");
                } else {
                    alert("登录失败,请重新填写登陆信息")
                }
            });
        },
    },
};
</script>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height:500px;
}
.login h1{
  text-align: center;
}

</style>