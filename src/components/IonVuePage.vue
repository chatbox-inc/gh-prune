<template>
  <ion-page class="ion-page" main>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
        <ion-buttons v-if="showBackButton" slot="start">
          <ion-back-button default-href="/" />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-content" padding>
      <div class="text-right" v-if="user">
        <ion-button color="light" @click="userMenu">
          <ion-icon name="contact"></ion-icon>
          &nbsp;
          {{user.name || user.login}}
        </ion-button>
      </div>
      <slot />
    </ion-content>
    <ion-footer>
      <div class="footer-text">crafted by chatbox</div>
    </ion-footer>
  </ion-page>
</template>

<script>
import {mapState, mapActions} from "vuex"
export default {
  name: 'IonVuePage',
  props: {
    title: { type: String, default: '' },
    showBackButton: { type: Boolean, default: true },
  },
  computed:{
      ...mapState(["user"])
  },
  methods: {
    ...mapActions(['logout']),
    userMenu() {
          return this.$ionic.actionSheetController
              .create({
                  header: 'menu',
                  buttons: [
                      {
                          text: 'Logout',
                          role: 'destructive',
                          icon: 'trash',
                          handler: async () => {
                              this.logout()
                              this.$router.push("/")
                              const toast = await this.$ionic.toastController.create({
                                  message: 'logged out.',
                                  position: 'top',
                                  duration: 2000
                              });
                              toast.present();
                          },
                      }
                  ],
              })
              .then(a => a.present())
      },

  }
}
</script>

<style scoped>
.footer-text {
  font-size: 80%;
  margin: 10px 0;
  text-align: center;
}
.modus-labs-logo {
  display: block;
  margin: 0 auto 10px auto;
  width: 9.6825rem;
}
</style>
