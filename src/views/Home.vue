<template>
  <IonVuePage :title="'Github Issues'" :showBackButton="false">

    <div class="container">
      <section>
        <h1 class="text-center mb-5">Github Isseus</h1>
        <div class="mb-5">
          <img src="https://placehold.it/800x200" class="img-fluid" alt="Responsive image">
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid corporis, culpa cupiditate delectus doloribus eveniet facere illo nisi non, pariatur quisquam, tempora totam voluptate! Atque commodi dolore illum quasi ratione.
        </p>
        <div class="text-center">
          <div class="mb-3">
            <ion-item>
              <ion-label position="stacked">Personal Access Token</ion-label>
              <ion-input :value="form.token" @input="input"/>
            </ion-item>
          </div>
          <div class="mb-5">
            <ion-button @click="submitLogin">login with github</ion-button>
          </div>
          <p>
            your personal access token will be published from
            <a href="https://github.com/settings/tokens" target="_blank" rel="noopener">here</a>.
          </p>
        </div>
      </section>
    </div>
  </IonVuePage>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
  data() {
    return {
      form: {
        token: ""
      },
      links: ['Action Sheet', 'Alert', 'Loading', 'Menu', 'Modal'],
    }
  },
  computed:{
      ...mapState(["user"])
  },
  mounted(){
      if(this.user){
          return this.$router.push("/repos")
      }
      if(this.$route.query.authError){
          setTimeout( async ()=>{
            const toast = await this.$ionic.toastController.create({
                message: 'authentication error',
                position: 'top',
                duration: 2000
            });
            toast.present();
          },0)
      }
  },
  methods: {
    ...mapActions(['login']),
    input(e){
        this.form.token = e.srcElement.value
    },
    async submitLogin(){
      try{
        await this.login(this.form.token)
      }catch (e) {
          return this.$ionic.alertController
              .create({
                  header: 'Invalid Token',
                  message: 'You need use valid token which has scope "repos & delete_repo".',
                  buttons: ['OK'],
              })
              .then(a => a.present())

      }
      this.$router.push("/repos")
    }
  },
}
</script>
