import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBt8nT0L4576yEzl0Bpwwx5S6udZu5Dqzk",
    authDomain: "hc-domynos.firebaseapp.com",
    databaseURL: "https://hc-domynos.firebaseio.com",
    projectId: "hc-domynos",
    storageBucket: "gs://hc-domynos.appspot.com",
    messagingSenderId: "976435832933"
};

firebase.initializeApp(config);

export default firebase;