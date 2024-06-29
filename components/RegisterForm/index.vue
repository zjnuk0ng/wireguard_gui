<template>
  <div class="p-4 bg-background rounded flex-row">
    <div>
      <Input
        label="Username"
        placeholder="123@A1natas.com"
        type="text"
        @data-change="updateUsername"
      />
    </div>
    <div class="pt-4">
      <ValidationText text="用户名不得为空" :valid="noSpaces" />
    </div>
    <div class="pt-4">
      <Input
        label="Password"
        placeholder="**********"
        type="password"
        @data-change="updatePassword"
      />
    </div>
    <div class="pt-4">
      <ValidationText text="必须包含小写字母" :valid="lowercase" />
      <ValidationText text="必须包含大写字母" :valid="uppercase" />
      <ValidationText text="必须包含特殊符号" :valid="symbol" />
      <ValidationText text="长度不得小于8个字符" :valid="length" />
    </div>
    <div class="pt-4">
      <Input
        label="Confirm Password"
        placeholder="**********"
        type="password"
        @data-change="updateConfirmPwd"
      />
    </div>
    <div class="pt-4">
      <ValidationText text="两次密码相同" :valid="match" />
    </div>
    <div class="pt-11 flex justify-end">
      <Button label="Register" @btn-click="registerCall" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Button from '../Button';
import Input from '../Input';
import ValidationText from '../ValidationText';

export default {
  name: 'RegisterForm',
  components: {
    Button,
    Input,
    ValidationText,
  },
  data() {
    return {
      username: '',
      noSpaces: false,
      password: '',
      confirmPwd: '',
      lowercase: false,
      uppercase: false,
      symbol: false,
      length: false,
      match: false,
    };
  },
  watch: {
    username() {
      this.noSpaces = /^[^\s]+$/.test(this.username);
    },
    password() {
      this.lowercase = /[a-z]/.test(this.password);
      this.uppercase = /[A-Z]/.test(this.password);
      this.symbol = /\W/.test(this.password);
      this.length = this.password.length > 7;
      this.validationCheck();
    },
    confirmPwd() {
      this.validationCheck();
    },
  },
  methods: {
    updateUsername(name) {
      this.username = name;
    },
    updatePassword(pass) {
      this.password = pass;
    },
    updateConfirmPwd(pass) {
      this.confirmPwd = pass;
    },
    validationCheck() {
      this.match = this.confirmPwd === this.password && this.password.length > 7;
    },
    async registerCall() {
      if (
        this.noSpaces &&
        this.lowercase &&
        this.uppercase &&
        this.symbol &&
        this.length &&
        this.match
      ) {
        try {
          await axios.post('/api/auth/register', {
            username: this.username,
            password: this.password,
          });
          alert('User registered successfully!');
          // Handle success (e.g., redirect to login page)
        } catch (error) {
          console.error('Error registering user:', error);
          alert('Failed to register user.');
        }
      } else {
        alert('Please ensure all validation checks are passed.');
      }
    },
  },
};
</script>



