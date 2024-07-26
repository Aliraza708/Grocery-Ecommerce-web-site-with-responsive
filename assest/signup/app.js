
import { auth, createUserWithEmailAndPassword, doc, setDoc, storage, ref, uploadBytes, getDownloadURL, db } from "../../unitly.js"

let form_submit = document.getElementById("form_submit")
let submit_btn = document.getElementById("submit-btn")

form_submit.addEventListener("submit", (e) => {
    e.preventDefault()

    console.log("e====>", e)
    let profileImage = e.target[0].files[0]
    let userName = e.target[1].value
    let userAge = e.target[2].value
    let userEmail = e.target[3].value
    let userPassword = e.target[4].value
    let userContanct = e.target[5].value

    let userProfile = {
        userName,
        userAge,
        userContanct,
        userEmail,
        userPassword
    }
    console.log(userProfile)
    submit_btn.innerHTML = "Loading ..."
    submit_btn.disabled = true

    createUserWithEmailAndPassword(auth, userEmail, userPassword).then((user) => {
        console.log("userlogin===>", user)
        let id = user.user.uid

        let imageRef = ref(storage, `user/${id}`)
        uploadBytes(imageRef, profileImage).then(() => {
            console.log('Uploaded a blob or file!')

            getDownloadURL(imageRef).then((url) => {
                console.log("url====>", url)
                userProfile.profileImage = url

                const userDbRef = doc(db, "users", id)
                setDoc(userDbRef, userProfile).then(() => {
                    console.log("user Information uploaded")
                    submit_btn.innerHTML = "Submit"
                    submit_btn.disabled = false
                    window.location.href = "/"
                }).catch((err) => {
                    console.error("Firestore setDoc error:", err)
                    submit_btn.innerHTML = "Submit"
                    submit_btn.disabled = false
                })
            }).catch((err) => {
                console.error("Storage getDownloadURL error:", err)
                submit_btn.innerHTML = "Submit"
                submit_btn.disabled = false
            })
        }).catch((err) => {
            console.error("Storage uploadBytes error:", err)
            submit_btn.innerHTML = "Submit"
            submit_btn.disabled = false
        })
    }).catch((err) => {
        console.error("Auth createUserWithEmailAndPassword error:", err)
        submit_btn.innerHTML = "Submit"
        submit_btn.disabled = false
    })
})
