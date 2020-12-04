//database related imports
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebaseConfig from '../firebase.conf.js';
import 'firebase/auth'
import 'firebase/firestore';
import firebase from 'firebase/app'

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const useConnectedUser = () => {
    return useAuthState(auth);
}

const userSignInWithMail = (mail, pw) => {
    return auth.signInWithEmailAndPassword(mail, pw);
}
const userSignInAnonymously = () => {
    return auth.signInAnonymously();
}

const useAllData = (idField, collection) => {
    const data = firestore.collection(collection);
    const query = data.limit(30);
    return useCollectionData(query, { idField: idField });
}

const userSignOut = () => {
    auth.signOut()
}

const userExists = (userID) => {

    var docRef = firestore.collection("users").doc(userID);

    return docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("user exists")
            return "exists"
        } else {
            console.log("user doesnt exist yet")
            return "does not exist"
        }
    }).catch(function (error) {
        console.log("db connection error", error);
    });
}

const getCounter = () => {
    var docRef2 = firestore.collection("properties").doc("count");

    docRef2.get().then(function (doc) {
        if (doc.exists) {
            console.log(doc.data().total)
            return doc.total
        } else {
            console.log("counter doesnt exist yet")
            return "does not exist"
        }
    }).catch(function (error) {
        console.log("db connection error", error);
    });
}

const incrementCounter = () => {
    firestore.collection("properties").doc("count").update({"total": firebase.firestore.FieldValue.increment(1)})    
}
const initialWrite = (uid, studentID, timestamp, calcVariant, numVariants, setVariant) => {
    //doc refs:
    let docCounter = firestore.collection("properties").doc("count");
    let docData = firestore.collection("data").doc(uid);
    //read counter
    return firestore.runTransaction(function(transaction){
        return transaction.get(docCounter).then(function(sfDoc) {

            let newCounter = sfDoc.data().total + 1;
            let variant = calcVariant(newCounter, numVariants)
            transaction.update(docCounter, { total: newCounter });
            transaction.set(docData, { variant: variant, startTime: timestamp, uid: uid, id: newCounter });
            return [variant, newCounter];    
        });
    })
}
const useLoggedIn = () => {
    return firebase.auth().onAuthStateChanged();
}
const addUser = (studentID, uid) => {
    return firestore.collection("users").doc(studentID).set({
        uid: uid
    })
}
const addContent = (uid, object, merge=true) => {
    return firestore.collection("data").doc(uid).set(object, { merge: merge });
}

export { addContent, addUser, useLoggedIn, initialWrite, incrementCounter, getCounter, userExists, userSignOut, userSignInWithMail, useConnectedUser, useAllData, userSignInAnonymously };