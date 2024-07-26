
import { ref, storage, uploadBytes, getDownloadURL, db, collection, addDoc, auth } from "../unitly.js";




let formAddProuduct = document.getElementById("card_form");
let submitbtn = document.getElementById("submitbtn");

formAddProuduct.addEventListener("submit", (e) => {
    submitbtn.innerHTML = "Uploading wait.."
    submitbtn.disabled = true
    e.preventDefault()
    console.log(e)
    let productName = e.target[0].value;
    let productDescrption = e.target[1].value;
    let productPrice = e.target[2].value;
    let productQuantity = e.target[3].value;
    let productFile = e.target[4].files[0]

    let dataProduct = {
        productName,
        productDescrption,
        productPrice,
        productQuantity,
        productFile,
        CreatedBy: auth.currentUser.uid,
        CreatedByEmail: auth.currentUser.email,
        ProductCreater: []
    }
    // console.log(dataProduct)
    let productImgRef = ref(storage, dataProduct.productFile.name)
    uploadBytes(productImgRef, dataProduct.productFile).then(() => {
        console.log("File upload")
        getDownloadURL(productImgRef).then((url) => {
            console.log("url===>", url)
            dataProduct.productFile = url
            console.log(dataProduct)

            //  add document

            let productCollection = collection(db, "ProductsGrocery")
            addDoc(productCollection, dataProduct).then(() => {
                console.log("Document upload")
                submitbtn.innerHTML = "Submit"
                submitbtn.disabled = false
                window.location.href = "/"
            })



        })
    })
})