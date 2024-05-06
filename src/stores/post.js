import { defineStore } from "pinia";
import db from "@/Firebase/init.js";
import { doc, query, where, getDoc, getDocs, setDoc, collection, orderBy } from 'firebase/firestore';

export const usePostStore = defineStore('post', {
    state: () => {
        return {
            // when clicked upon
            post: {},
            // when profile visited - should have access to individual workout
            userPosts: [],
            // when on feed - should be on every reload/post - only those followed
            allPosts: [],
        }
    },
    getters: {
        getPost(state){
            return state.post;
        },
        getPostsByUser(state){
            return state.userPosts;
        },
        getAllPosts(state){
            return state.allPosts;
        }
    },
    actions: {
        // when specific post is accessed
        async setPost(postId){
            if(postId === null){
                this.$state.post = {}
                return;
            }
            try {
                const docRef = await getDoc(doc(collection(db, 'Post'), postId));
                const postData = docRef.data();
                this.$state.post = {
                    id: docRef.id,
                    user_id: postData.user_id,
                    username: postData.username,
                    targetDay: postData.targetDay,
                    duration: postData.duration,
                    date: postData.date,
                    totalMass: postData.totalMass,
                    totalSets: postData.totalSets
                }
                console.log('Setting Post: ', docRef);
            } catch(error){
                console.error('Error fetching ', postId, ' post: ', error);
            }
        },
        async setPostsByFollowing(userId){
            if (!userId) {
                this.$state.allPosts = [];
                return;
            }
            try {
                // Get the "Following" subcollection for the current user
                const followingCollectionRef = collection(db, 'User', userId, 'Following');
                const followingSnapshot = await getDocs(followingCollectionRef);
                
                const followingPosts = [];
        
                // Iterate through each followed user
                for (const doc of followingSnapshot.docs) {
                    const followedUserId = doc.id;
        
                    // Query posts for the followed user
                    const userPostsQuery = query(collection(db, 'Post'), where('user_id', '==', followedUserId));
                    const userPostsSnapshot = await getDocs(userPostsQuery);
        
                    // Iterate through each post of the followed user and add it to the followingPosts array
                    userPostsSnapshot.forEach(postDoc => {
                        followingPosts.push({
                            id: postDoc.id,
                            user_id: postDoc.data().user_id,
                            username: postDoc.data().username,
                            targetDay: postDoc.data().targetDay,
                            duration: postDoc.data().duration,
                            date: postDoc.data().date,
                            totalMass: postDoc.data().totalMass,
                            totalSets: postDoc.data().totalSets
                        });
                    });
                }
                this.$state.allPosts = followingPosts;
            } catch (error) {
                console.error('Error fetching following posts: ', error);
            }
        },
        
        // for individual profile
        async setPostsByUser(userId){
            if(userId === null){
                this.$state.userPosts = []
                return;
            }
            try {
                const querySnapshot = await getDocs(query(collection(db, 'Post'), where('user_id', '==', userId)));
                const userPosts = [];
                querySnapshot.forEach(doc => {
                    userPosts.push({
                        id: doc.id,
                        user_id: doc.data().user_id,
                        username: doc.data().username,
                        targetDay: doc.data().targetDay,
                        duration: doc.data().duration,
                        date: doc.data().date,
                        totalMass: doc.data().totalMass,
                        totalSets: doc.data().totalSets
                    });
                });
                this.$state.userPosts = userPosts;
            } catch(error){
                console.error('Error fetching ', userId, ' post: ', error)
            }
        },
        async addPost(postId){
            try {
                const docRef = await getDoc(doc(collection(db, 'Post'), postId));
                const postData = docRef.data();
                console.log('Adding to array: ', postData);
                this.$state.allPosts.push({
                    id: docRef.id,
                    user_id: postData.user_id,
                    username: postData.username,
                    targetDay: postData.targetDay,
                    duration: postData.duration,
                    date: postData.date,
                    totalMass: postData.totalMass,
                    totalSets: postData.totalSets
                });
                console.log('Adding Post   : ', docRef);
            } catch(error){
                console.error('Error fetching ', docRef);
            }
        }
    }
})