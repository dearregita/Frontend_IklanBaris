<template>
    <section class="story">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="images/services/service-one.jpg" class="responsive" alt="story">
                        </div>
                        <div class="col-md-6">
                            <div class="story-content">
                                <h2>Our Story</h2>
                                <h5 class="tagline">"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, minima."</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus totam ducimus est vero, officiis, placeat optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias aliquam nesciunt fugit optio illum aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque assumenda, est quam perferendis expedita autem?</p>
                                <h6>Mission</h6>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam nihil dolorum beatae consequatur mollitia iure?</p>
                                <h6>Vision</h6>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consectetur adipisci, voluptatum dolores nostrum omnis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
</template>

<script>
module.exports = {
  data: function(){
    return{
      users: 0,
      perPage: 5,
      currentPage: 1,
      key: "",
    }
  },
  methods: {
   getDataUser : function(){
      this.key = this.$cookies.get("Authorization");
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      axios.get(base_url + "/user/" + this.perPage + "/" + offset, conf)
      .then(response => {
          this.$bvToast.hide("loadingToast");
          this.users = response.data.count;    
          console.log(response.data);
             
      })
      .catch(error => {
        console.log(error);
      });
    },
    mounted(){
    this.getDataUser();
    this.getDataSiswa();
    }
  }
}
</script>
