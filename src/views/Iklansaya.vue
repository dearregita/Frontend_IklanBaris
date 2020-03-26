<template>
     <div class="cart-main-area pt-95 pb-100 wishlist">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h1 class="cart-heading">Iklan Saya</h1> <br />
                      
                         <b-button class="submit contact-btn btn-hover" type="submit" variant="success" v-b-modal.modalIklan v-on:click="Add"><i class="animate-right"></i> Tambah Iklan </b-button>

                        <div class="table-content table-responsive">
                            <b-table striped hover :items="barang" :fields="fields">
                                <template v-slot:cell(kondisi)="data">
                                    <h5><b-badge variant="warning">{{ data.item.barang}}</b-badge></h5>
                                </template>
                                <template v-slot:cell(Aksi)="data">
                                    <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalIklan><i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah</b-button>&nbsp;
                                    <b-button size="sm" variant="danger" v-on:click="Drop(data.item.id)"><i class="mdi mdi-delete btn-icon-prepend"></i> Hapus</b-button>
                                </template>
                            </b-table>
                                <b-pagination
                                v-model="currentPage"
                                :per-page="perPage"
                                :total-rows="rows"
                                align="center"
                                v-on:input="pagination">
                                </b-pagination>
                                
                                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="success"></b-spinner>
                  <strong class="text-success">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>
                        </div>
                    </div>
                </div>
            </div>

            
    <b-modal id="modalIklan" @ok="Save">
      <template v-slot:modal-title>
        Masukkan Iklan
      </template>
        <form ref="form">
          <div class="form-group">
            <label for="gambar" class="col-form-label">Gambar</label>
            <input type="text" name="gambar" class="form-control" id="gambar" placeholder="" v-model="gambar">
          </div>
           <div class="form-group">
            <label for="kondisi" class="col-form-label">Kondisi</label>
            <select class="form-control" name="kondisi" id="kondisi" v-model="kondisi">
              <option value="baru" checked>Baru</option>
              <option value="bekas">Bekas</option>
            </select>
          </div>
          <div class="form-group">
            <label for="juduliklan" class="col-form-label">Judul Iklan</label>
            <input type="text" name="juduliklan" class="form-control" id="juduliklan" placeholder="Judul Iklan" v-model="juduliklan">
          </div>
          <div class="form-group">
            <label for="deskripsi" class="col-form-label">Deskripsi</label>
            <input type="text" name="deskripsi" class="form-control" id="deskripsi" placeholder="Deskripsi" v-model="deskripsi">
          </div>
          <div class="form-group">
            <label for="harga" class="col-form-label">Harga</label>
            <input type="integer" name="harga" class="form-control" id="harga" placeholder="harga" v-model="harga">
          </div>
        </form>
    </b-modal>
        </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      gambar: "",
      kondisi: "",
      juduliklan: "",
      deskripsi: "",
      harga: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      barang: [],
      fields: ["id", "gambar", "kondisi", "juduliklan", "deskripsi", "harga","Aksi"],
    }
  },

  methods: {
   getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/barang/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.barang = response.data.barang;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data petugas."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },
    pagination : function(){
      if(this.search == ""){
        this.getData();
      } 
    },
  Add : function(){
      this.action = "insert";
      this.gambar = "";
      this.kondisi = "";
      this.juduliklan = ""; 
      this.deskripsi = "";
      this.harga = "";
    },

    Edit : function(item){
      this.action = "update";
      this.id = item.id;
      this.gambar = item.gambar;
      this.kondisi = item.kondisi;
      this.juduliklan = item.juduliklan;
       this.deskripsi = item.deskripsi;
      this.harga = item.harga;
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("gambar", this.gambar);
        form.append("kondisi", this.kondisi);
        form.append("juduliklan", this.juduliklan);
        form.append("deskripsi", this.deskripsi);
        form.append("harga", this.harga);

        this.axios.post("/barang", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        let form = {
        gambar: this.gambar,
        kondisi: this.kondisi,
        juduliklan: this.juduliklan,
        deskripsi: this.deskripsi,
        harga: this.harga
        
        }
        this.axios.put("/barang/" + this.id, form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },

    // Drop : function(id){
    //   let conf = { headers: { "Authorization" : "Bearer " + this.key} };
    //   if(confirm('Apakah anda yakin ingin menghapus data ini?')){
    //     this.$bvToast.show("loadingToast");
    //     this.axios.delete("/petugas/" + id, conf)
    //     .then(response => {
    //         this.getData();
    //         this.$bvToast.hide("loadingToast");
    //         this.message = response.data.message;
    //         this.$bvToast.show("message");
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //   }
    // },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>

