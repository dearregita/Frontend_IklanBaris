<template>

         <!-- register-area start -->
        <div class="register-area ptb-100">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 col-12 col-lg-12 col-xl-6 ml-auto mr-auto">
                        <div class="login">
                        <h3><center>Registrasi</center></h3>
                        <br />
                            <div class="login-form-container">
                                <div class="login-form">
                                    <form v-on:submit.prevent="Register">
                                        <div class="button-box">
                                            <div class="col-form-label">
                                                <input type="text" name="name"  id="name" placeholder="Your Name" v-model="name">   
                                            </div>
                                        </div>
                                        <div class="button-box">
                                            <div class="col-form-label">
                                        <input type="text" name="email"  id="email" placeholder="Email" v-model="email">
                                            </div>
                                        </div>
                                        <div class="button-box">
                                            <div class="col-form-label">
                                                <input type="password" class="form-control form-control-lg border-left-0" name="password" id="password" v-model="password" placeholder="Kata Sandi" required>                           
                                            </div>
                                            <input type="submit" href="#pablo" value="register" class="default-btn floatright">
                                            <!-- <b-button variant="success"><i class="mdi mdi-plus btn-icon-prepend"></i>Register</b-button> -->
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
module.exports = {
  data: function() {
    return {
      search: "",
      id: "",
      name: "",
      email: "",
      password: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      users: [],
      fields: ["id", "name", "email", "password"]
    };
  },

  methods: {
      getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/register", conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.users = response.data.users;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data petugas."
          this.$bvToast.show("message");
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },
    Register: function() {
      this.action = "insert";
      this.name = "";
      this.email = "";
      this.password = "";
    },

    Save: function() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      if (this.action === "insert") {
        let form = new FormData();
        form.append("id", this.id);
        form.append("name", this.name);
        form.append("email", this.email);
        form.append("password", this.password);
      

        this.axios
          .post("/register", form, conf)
          .then(response => {
            if (this.search == "") {
              this.getData();
            } else {
              this.searching();
            }
            this.message = response.data.message;
          })
          .catch(error => {
            console.log(error);
          });
      } 
    },
  }
};
</script>