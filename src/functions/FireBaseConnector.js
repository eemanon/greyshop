
//database related imports

import firebase from 'firebase/app'
import firebaseConfig from '../firebase.conf.js';

function userExists(userHash){
    //returns 0 if user does not exist, 1 if it's a loser and 2 if it's a winner.
    console.log("user Exists function called with "+userHash)
    return 0
}

export default userExists;