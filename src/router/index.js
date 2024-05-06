import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import FeedView from '@/views/FeedView.vue';
import ProfileView from '@/views/ProfileView.vue';
import ExploreView from '@/views/ExploreView.vue';
import CreateView from '@/views/CreateView.vue';
import LoginView from '@/views/LoginView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import RegisterView from '@/views/RegisterView.vue';
import EditProfileView from '@/views/EditProfileView.vue';
import ViewPost from '@/views/ViewPost.vue';
import ViewProfile from '@/views/ViewProfile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/feed',
      name: 'feed',
      component: FeedView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPasswordView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfileView
    },
    {
      path: '/view-profile/:userId',
      name: "viewProfile",
      component: ViewProfile
    },
    {
      path: '/view-post/:postid',
      name: 'viewPost',
      component: ViewPost
    }
  ]
})

export default router
