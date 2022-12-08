importScripts("https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAyB98q3WYl86qpcvlxf5TC1xcCZ15SR8o",
  authDomain: "start-up-c1e7b.firebaseapp.com",
  projectId: "start-up-c1e7b",
  storageBucket: "start-up-c1e7b.appspot.com",
  messagingSenderId: "1091659317486",
  appId: "1:1091659317486:web:6e86f69396e906cb1a73ff",
  measurementId: "G-QRHZTP82XN",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
