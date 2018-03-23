import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB5Rh4D0hSe-oCE6rGdM6udhqcklCuAUT4",
    authDomain: "checklists-jph.firebaseapp.com",
    databaseURL: "https://checklists-jph.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
