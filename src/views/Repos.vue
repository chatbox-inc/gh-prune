<template>
  <IonVuePage :title="'Repositories'" :showBackButton="false">
    <div class="container">

      <section class="mb-3">
        <ion-list class="mb-3">
          <ion-list-header>
            <ion-label>Repositories</ion-label>
          </ion-list-header>
          <ion-item
              v-for="(repo,index) in repos" :key="index"
              @click="detail(repo)" detail>
            <ion-label>{{repo.full_name}}</ion-label>
          </ion-item>
        </ion-list>
      </section>

    </div>


  </IonVuePage>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
      ...mapState(["repos"])
  },
  methods: {
    detail(repo){
      this.$router.push("/repos/"+repo.full_name)
    },
    presentActionSheet() {
    },
  },
}
</script>
