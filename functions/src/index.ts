import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello, Bug Trackers!");
});

const createNotification = (notification: any) => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then((doc) => {
      console.log("notification added", doc);
    });
};

export const bugCreated = functions.firestore
  .document("/bugs/{bugId}")
  .onCreate((doc) => {
    const bug = doc.data();
    const notification: {
      content: string;
      userId: string;
      time: admin.firestore.FieldValue;
    } = {
      content: `added a new bug - ${bug.title}`,
      userId: `${bug.creatorId}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    };

    return createNotification(notification);
  });

export const userJoined = functions.auth.user().onCreate((user) => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      // const newUser = doc.data();
      const notification: {
        content: string;
        userId: string;
        time: admin.firestore.FieldValue;
      } = {
        content: `created account to application`,
        userId: doc.id,
        time: admin.firestore.FieldValue.serverTimestamp(),
      };

      return createNotification(notification);
    });
});
