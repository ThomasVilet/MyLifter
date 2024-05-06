import { defineStore } from "pinia";

//Should include followers per user


import db from "@/Firebase/init.js";
import { doc, deleteDoc, getDoc, getDocs, setDoc, collection, query, where } from 'firebase/firestore';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userProfile: {
               
            },
            selectedUser: {
        
            },
            following: []
        }
    },  
    getters: {  
        getUser(state){ 
            return state.userProfile;
        },
        getSelectedUser(state){
            return state.selectedUser;
        },
        getFollowing(state){
            return state.following;
        }
        
    },
    actions: {
        async setSelectedUser(userId){
            if(userId === null){
                this.$state.selectedUser = {
                }
                return;
            }
            const docRef = doc(collection(db, 'User'), userId);
            try{
                const doc = await getDoc(docRef);
                if (doc.exists()){
                    const userData = doc.data();
                    this.$state.selectedUser={
                        id: doc.id,
                        username: userData.username,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        profilePicture: userData.profilePicture,
                        goal: userData.goal,
                        description: userData.description,
                        isPublic: userData.isPublic,
                        followingCount: userData.followingCount,
                        liftCount: userData.liftCount
                    }
                    return;
                }
                else{
                    this.$state.selectedUser={
                    }
                    return;
                }
            }
            catch (error){
                console.error('Error fetching selected user: ', error);
            }
        },
        async setUser(userId){
            if(userId === null){
                this.$state.userProfile={
                    
                }
                return;
            }
            const docRef = doc(collection(db, 'User'), userId);
            try{
                const doc = await getDoc(docRef);
                if (doc.exists()){
                    const userData = doc.data();
                    this.$state.userProfile={
                        id: userId,
                        username: userData.username,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        profilePicture: userData.profilePicture,
                        goal: userData.goal,
                        description: userData.description,
                        isPublic: userData.isPublic,
                        followingCount: userData.followingCount,
                        liftCount: userData.liftCount
                    }
                    this.setFollowing(userId);
                    this.updateLiftCount();
                    return;
                }
                else{
                    this.$state.userProfile={
                        
                    }
                    return;
                }
            }
            catch (error){
                console.error('Error fetching user: ', error);
            }
        },
        async setFollowing(){
            try {
                if (!this.$state.userProfile.id) {
                    this.$state.userProfile.following = [];
                    return;
                }
                const followingCollectionRef = collection(db, 'User', this.$state.userProfile.id, 'Following');
                const querySnapshot = await getDocs(followingCollectionRef);

                const following = [];
                querySnapshot.forEach(doc => {
                    following.push({
                        userId: doc.id
                    });
                });
                this.$state.following = following;
                // updateFollowingCount
                this.updateFollowingCount();
            } catch(error){
                console.error('Error setting the following: ', error);
            }
        },
        async follow(userId){
            try {
                const followingCollectionRef = collection(db, 'User', this.$state.userProfile.id, 'Following');
                const followingDocRef = doc(followingCollectionRef, userId);
                await setDoc(followingDocRef, {
                    // nothing here
                });
                this.setFollowing();
                this.updateFollowingCount();
            } catch(error){
                console.error('Error setting the following: ', error);
            }
        },
        async unfollow(userId){
            try {
                const followingCollectionRef = collection(db, 'User', this.$state.userProfile.id, 'Following');
                const querySnapshot = await getDocs(followingCollectionRef);
                
                querySnapshot.forEach(async (doc) => {
                    if (doc.id === userId) {
                        await deleteDoc(doc.ref);
                        console.log('Successfully unfollowed user:', userId);
                    }
                });
                this.setFollowing();
                this.updateFollowingCount();
            } catch(error) {
                console.error('Error unfollowing user:', error);
            }
        },
        async updateFollowingCount(){
            try {
                if (!this.$state.userProfile.id) {
                    return;
                }
                const followingCollectionRef = collection(db, 'User', this.$state.userProfile.id, 'Following');
                const querySnapshot = await getDocs(followingCollectionRef);
                
                const followingCount = querySnapshot.size;
        
                await setDoc(doc(db, 'User', this.$state.userProfile.id), { followingCount }, { merge: true });
        
                this.$state.userProfile.followingCount = followingCount;
            } catch (error) {
                console.error('Error updating following count: ', error);
            }
        },
        async updateLiftCount(){
            try {
                if (!this.$state.userProfile.id) {
                    return;
                }
                const userPostsCollectionRef = query(collection(db, 'Post'), where('user_id', '==', this.$state.userProfile.id));
                const querySnapshot = await getDocs(userPostsCollectionRef);
                
                const liftCount = querySnapshot.size;
        
                await setDoc(doc(db, 'User', this.$state.userProfile.id), { liftCount }, { merge: true });
        
                this.$state.userProfile.liftCount = liftCount;
            } catch (error) {
                console.error('Error updating lift count: ', error);
            }
        }
    }
})