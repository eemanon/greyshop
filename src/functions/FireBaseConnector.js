import React, { useEffect } from 'react';
//database related imports
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebaseConfig from '../firebase.conf.js';
import 'firebase/auth'
import 'firebase/firestore';
import firebase from 'firebase/app'
import { AccordionActions } from '@material-ui/core';

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const useConnectedUser = () => {
    return useAuthState(auth);
}

const userSignInWithMail = (mail, pw) => {
    return auth.signInWithEmailAndPassword(mail, pw);
}

const useAllData = (idField, collection) => {
    const data = firestore.collection(collection);
    const query = data.limit(30);
    return useCollectionData(query, { idField: idField });
}

const userSignOut = () => {
    auth.signOut()
}

const userExists = (userID, action) => {

    var docRef = firestore.collection("users").doc(userID);

    return docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("user exists")
            return "exists"
        } else {
            console.log("user doesnt exist yet")
            action()
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
    var docRef2 = firestore.collection("properties").doc("count").
    update({"total": firebase.firestore.FieldValue.increment(1)})    
}


export { incrementCounter, getCounter, userExists, userSignOut, userSignInWithMail, useConnectedUser, useAllData };