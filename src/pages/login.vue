<template>
  <div class="form-login-box">
      <p class="login-title">登录</p>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="username" prop="username">
              <Input type="text" v-model="formCustom.username"></Input>
          </FormItem>
          <FormItem label="Password" prop="passwd">
              <Input type="password" v-model="formCustom.passwd"></Input>
          </FormItem>
          <!-- <FormItem label="Confirm" prop="passwdCheck">
              <Input type="password" v-model="formCustom.passwdCheck"></Input>
          </FormItem> -->
          <FormItem>
              <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
              <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
          </FormItem>
      </Form>
  </div>
    
</template>
<script>
    export default {
        name:'login',
        data () {
            const validateUserName = (rule,value,callback) =>{
              if(value === ''){
                callback(new Error('Please enter your username'));
              }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password'));
                }
            };
            return {
                formCustom: {
                    username:'',
                    passwd: ''
                },
                ruleCustom: {
                    username:[
                        {
                          validator: validateUserName, trigger: 'blur'
                        }
                    ],
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style lang="scss" scoped>
.form-login-box{
  position: absolute;
  width: 500px;
  height: auto;
  border: 1px solid #cecece;
  padding: 20px 30px;
  background: #f7f7f7;
  position: absolute;
  left: 50%;
  top: 30%;
  margin-left: -300px;
  .login-title{
    font-size: 18px;
    color:#333;
  }
}
</style>
