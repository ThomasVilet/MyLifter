
<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if="navigationAvailable"/>
      <RouterView />
      <!-- Add footer -->
    </div>
  </div>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router';
import { auth } from '@/Firebase/init.js';
import db from "@/Firebase/init.js";
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';

import Navigation from '@/components/Navigation/Navigation.vue';
import { onAuthStateChanged } from 'firebase/auth';

import { useUserStore } from './stores/user';
import { usePostStore } from './stores/post';
import { mapState, mapActions } from 'pinia';


export default {
  name: 'App',
  components: {
    Navigation,
    RouterLink,
    RouterView
  },
  data(){
    return{
      navigationAvailable: true,
    }
  },
  async created(){
    auth.onAuthStateChanged( async (user) => {
      // if exists...
      if(user){
        await this.setUser(user.uid);
        await this.setFollowing();
        await this.setPostsByFollowing(user.uid);
        this.getUser;
        console.log( 'Current user: ' ,this.getUser.username);
      } else{
        await this.setUser(null);
        await this.setFollowing()
        await this.setPostsByFollowing(null)
        this.getUser;
      }
    });
    this.checkRouteAvailable();
  },
  computed: {
    ...mapState(useUserStore, ['getUser', 'getSelectedUser', 'getFollowing']),
  },
  methods: {
    ...mapActions(useUserStore, ['setUser', 'setSelectedUser', 'setFollowing', 'calculateFollowers', 'calculateLifts']),
    ...mapActions(usePostStore, ['setPostsByAll', 'setPostsByFollowing']),
    checkRouteAvailable(){
      if(this.$route.name === "login" || this.$route.name === "register" || this.$route.name === "forgotpassword" ){
          this.navigationAvailable = false;
          return;
      }
      this.navigationAvailable = true;
    }
  },
  watch: {
    $route(){
      this.checkRouteAvailable();
    }
  }
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

}

.container {
  max-width: 1440px;
  margin: 0 auto;

}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: white;
  text-transform: uppercase;
}

.lift-card-wrap {
  position: absolute;
  padding: 80px 16px;
  background-color: white;
  @media(min-width: 500px){
    padding: 100px 16px;
  }

  .lift-cards {
    display: grid;
    gap: 32px;
    grid-template-rows: 1fr;

    @media (min-width: 800px){
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1200px){
      grid-template-columns: repeat(3, 1fr);
    }

  }
}

.arrow {
  margin-left: 8px;
  width: 18px;
  path {
    fill: black;
  }
}

.arrow-light {
  path {
    fill: white;
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: white;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, .7);
  }
}

.button-ghost {
  color: black;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px){
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, .5) !important;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

</style>

