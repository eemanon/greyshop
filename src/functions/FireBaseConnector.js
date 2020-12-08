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
    const query = data.limit(600);
    return useCollectionData(query, { idField: idField });
}

const userSignOut = () => {
    auth.signOut()
}

const userExists = (userID) => {

    let docRef = firestore.collection("users").doc(userID);

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
    let docRef2 = firestore.collection("properties").doc("count");

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

const getNumDiceGames = () => {
    let docRef2 = firestore.collection("properties").doc("dicegames");

    return docRef2.get().then(function (doc) {
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
const initialWrite = (uid, studentID, timestamp, calcVariant, numVariants) => {
    //doc refs:
    let docCounter = firestore.collection("properties").doc("count");
    let docData = firestore.collection("data").doc(uid);
    //read counter
    return firestore.runTransaction(function(transaction){
        return transaction.get(docCounter).then(function(sfDoc) {

            let newCounter = sfDoc.data().total + 1;
            let variant = calcVariant(newCounter, numVariants)
            transaction.update(docCounter, { total: newCounter });
            transaction.set(docData, { variant: variant, timeStart: timestamp, uid: uid, id: newCounter });
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
    console.log('FUNCTION addContent (FireBaseConnector)')
    return firestore.collection("data").doc(uid).set(object, { merge: merge });
}

const addAvailableDiceGames = (object, merge=true) => {
    console.log("now writing")
    let gameCounter = firestore.collection("properties").doc("dicegames");
    let gameData = firestore.collection("dicegames").doc("runs");
    //read counter
    return firestore.runTransaction(function(transaction){
        return transaction.get(gameCounter).then(function(sfDoc) {
            console.log(sfDoc.data().total)
            let newCounter = sfDoc.data().total + Object.keys(object).length;
            console.log('new counter: '+newCounter)
            transaction.update(gameCounter, { total: newCounter });
            transaction.set(gameData, object, { merge: merge });
            return newCounter;    
        });
    })
}

const getDiceGame = (uid, setDiceSeries) => {
    //get id
    console.log("FUNCTION getDiceGame")
    console.log('the user is '+uid)
    getUserContent(uid).then(function(userdata){
        console.log("userdata")
        console.log(userdata.data())
        //get dice game
        let docRef = firestore.collection("dicegames").doc("runs");
        return docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log(doc.data())
                setDiceSeries(doc.data()[userdata.data().id])
                console.log("user id is "+userdata.data().id)
                console.log((doc.data()[userdata.data().id]))
                return doc.data()[userdata.data().id]
            } else {
                console.log("dicegames does not exist")
                return "dicegames does not exist"
            }
        }).catch(function (error) {
            console.log("db connection error", error);
        });    
        
    })
    
}

const getUserContent = (uid) => {
    console.log("FUNCTION getUserContent")
    console.log("getting user content for "+uid)
    let docRef5 = firestore.collection("data").doc(uid);

    return docRef5.get().then(function (doc) {
        if (doc.exists) {
            console.log("retrived user data is: ")
            console.log(doc.data())
            return doc
        } else {
            console.log("user doesnt exist")
            return "user doesnt exist"
        }
    }).catch(function (error) {
        console.log("db connection error", error);
    });    
}

export { getDiceGame, addAvailableDiceGames, getNumDiceGames, addContent, addUser, useLoggedIn, initialWrite, incrementCounter, getCounter, userExists, userSignOut, userSignInWithMail, useConnectedUser, useAllData, userSignInAnonymously };