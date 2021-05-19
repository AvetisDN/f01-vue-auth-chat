import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'animate.css/animate.min.css'
import './scss/main.scss'
import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCeivYz9gPkULfBKghTczFeYxepsPqGUdM",
    authDomain: "vue-app-f01.firebaseapp.com",
    projectId: "vue-app-f01",
    storageBucket: "vue-app-f01.appspot.com",
    messagingSenderId: "567868302071",
    appId: "1:567868302071:web:e8e82bf8c56120c619a9f2"
};
firebase.initializeApp(firebaseConfig)

createApp(App).use(router).mount('#app')
