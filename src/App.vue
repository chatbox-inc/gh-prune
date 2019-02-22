<template>
  <ion-app id="app">
    <ion-vue-router />
  </ion-app>
</template>

<script>
import {mapActions} from "vuex"
export default {
  components: {
  },
  mounted(){
      setTimeout(async ()=>{
          const loader = await this.$ionic.loadingController
              .create({
                  message: 'loading',
                  duration: this.timeout,
              })
          this.setLoader(loader)
      },0)
  },
  methods: {
      ...mapActions(["setLoader"]),
  }
}
</script>

<style>
</style>
