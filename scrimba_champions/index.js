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

// Pushar up to db
btn.addEventListener("click", function() {
    let newInput = inputFieldEl.value //get value from inputfield
    push(endorsementListInDB, newInput) //pushes newInput to endorsement-DB
    clearInputField() // clear inputfield

    console.log(`"${newInput}" pushed to database`)
})

onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val())
        
        clearEndorsementList()

        for (let i = 0; i < itemArray.length; i++) {
            let currentItem = itemArray[i]
            let currentID = currentItem[0]
            let currentValue = currentItem[1] 

            console.log(currentID)

            // skicka in till lista här med ny funktion
            addEndorsementToList(currentID, currentValue)
        }
    } else {
        endorsementList.innerHTML = "nothing here for you now dawg..."
    }
})

function addEndorsementToList(itemID, itemValue) {
    let newEndorsement = document.createElement("li")

    newEndorsement.textContent = itemValue
    
    newEndorsement.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)

        console.log("clicked")
        remove(exactLocationOfItemInDB)
    })

    endorsementList.append(newEndorsement)
}

function clearInputField() {
    inputFieldEl.value = ""
}

function clearEndorsementList() {
    endorsementList.innerHTML = ""
}
