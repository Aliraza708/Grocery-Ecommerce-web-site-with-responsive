import { auth, signInWithEmailAndPassword } from "../../unitly.js";

let form_login = document.getElementById("form_login")
let submit_Login = document.getElementById("submit_Login")

form_login.addEventListener("submit", (e) => {

  e.preventDefault()


  console.log("e===>", e)
  submit_Login.innerHTML = "Loading ..."
  submit_Login.disabled = true
  let email = e.target[0].value
  let password = e.target[1].value
  console.log(e)
  signInWithEmailAndPassword(auth, email, password).then((user) => {

    window.location.href = "/"
  }).catch((err) => {
    alert("your account is not found", err)
    submit_Login.innerHTML = "Submit"
    submit_Login.disabled = false
  })
})