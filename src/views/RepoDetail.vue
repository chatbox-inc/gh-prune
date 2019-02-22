<template>
  <IonVuePage :title="title">
    <div class="container">

      <section class="mt-2" v-if="repo">

        <h2 class="h5">{{repo.full_name}}</h2>
        <p v-if="repo.description">
          {{repo.description}}
        </p>
        <p class="text-muted" v-else>
          no description with this repository
        </p>

        <div class="mb-3">
          <ion-chip v-if="repo.private">
            <ion-label>Private</ion-label>
          </ion-chip>
          <ion-chip v-if="!repo.private">
            <ion-label>Public</ion-label>
          </ion-chip>
          <ion-chip v-if="repo.fork">
            <ion-label>Forked</ion-label>
          </ion-chip>
        </div>

        <div class="mb-3">
          <ion-button color="primary" @click="openGithub()">
            <ion-icon name="logo-github"></ion-icon>
            &nbsp; Github
          </ion-button>
          <ion-button v-if="repo.has_issues" @click="openGithub('/issues')">
            <ion-icon name="logo-github"></ion-icon>
            &nbsp; Issues: {{repo.open_issues_count}}
          </ion-button>
        </div>

        <dl class="row">
          <dt class="col-sm-3">created</dt>
          <dd class="col-sm-9">{{repo.created_at}}</dd>
          <dt class="col-sm-3">updated</dt>
          <dd class="col-sm-9">{{repo.updated_at}}</dd>
        </dl>

        <ion-item-sliding>
          <ion-item>
            <ion-label>Slide to DELETE this repository</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="detail">DELETE</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </section>
    </div>
  </IonVuePage>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
      ...mapState(["repos"]),
      repo(){
          if(this.repos){
            for(let repo of this.repos){
                if(repo.full_name === this.routeFullName ){
                    return repo
                }
            }
            return false
          }
          return null
      },
      routeFullName(){
          return this.$route.params.owner + "/" + this.$route.params.repos
      },
      title(){
        if(this.repo){
            return this.repo.full_name
        }else{
            return "loading..."
        }
      }
  },
  methods: {
    ...mapActions(['deleteRepo']),
    openGithub(str=""){
        window.open(this.repo.html_url+str);
    },
    async detail(){
        const message = `
        Repository ${this.repo.full_name} will be removed.
        `
        const buttons = [
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {},
            },
            {
                text: 'OK',
                handler: async () => {
                    await this.deleteRepo({
                        full_name: this.repo.full_name
                    })
                    this.$router.push("/repos")
                },
            },
        ]
        const options = {
            header: 'Confirm!',
            message,
            buttons,
        }
        const alert = await this.$ionic.alertController.create(options)
        alert.present()
    },
  },
}
</script>
