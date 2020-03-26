<template>
    <!-- login-area start -->
        <div class="register-area ptb-100">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 col-12 col-lg-6 col-xl-6 ml-auto mr-auto">
                        <div class="login">
                        <h3><center>Login</center></h3>
                            <div class="login-form-container">
                                <div class="login-form">
                                    <form v-on:submit.prevent="Login">
                                    <input class="form-control form-control-lg border-left-0" id="email" name="email" placeholder="E-mail" v-model="email" required>
                                        <!-- <input type="password" name="user-password" placeholder="Password"> -->
                                        <div class="button-box">
                                            <div class="login-toggle-btn">
                                                <input type="password" class="form-control form-control-lg border-left-0" name="password" id="password" v-model="password" placeholder="Kata Sandi" required>                        
                                                
                                            </div>
                                            <!-- <button type="submit" class="default-btn floatright">Login</button> -->
                                            <input type="submit" href="#pablo" name="login" class="default-btn floatright" value="login">

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>


export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
        Login: function(){
            let email = this.email 
            let password = this.password
            this.$store.dispatch('login', { email, password })
            .then(() => this.$router.push('/profile'))
            .catch(err => console.log(err))
        }
    }
}
</script>