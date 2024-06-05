import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champions-50542-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("endorsement_input")
const btn = document.getElementById("btn")
const endorsementList = document.getElementById("endorsements")

const newEndorsement = document.createElement("li")


// Pushar up to db
btn.addEventListener("click", function() {
    let newInput = inputFieldEl.value //get value from inputfield
    push(endorsementListInDB, newInput) //pushes newInput to endorsement-DB
    clearInputField() // clear inputfield

    console.log(`"${newInput}" pushed to database`)
})


onValue(endorsementListInDB, function(snapshot) {
if (snapshot.exists()) {


}

})








// function to clear inputfield
function clearInputField (){
    inputFieldEl.value = ""
}





function addEndorsementToList (){

    newEndorsement.addEventListener("click", function(){


    })


}

