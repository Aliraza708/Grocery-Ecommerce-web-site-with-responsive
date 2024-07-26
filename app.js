
import { auth, onAuthStateChanged, collection, updateDoc, arrayRemove, arrayUnion, signOut, getDoc, doc, db, getDocs } from "./unitly.js";
let useImage = document.getElementById("useImage")
let useImage1 = document.getElementById("useImage1")
let login_btn = document.getElementById("login_btn")
let logout_btn = document.getElementById("logout_btn")
let usrProduct = document.getElementById("usrProduct")

onAuthStateChanged(auth, (user) => {
  if (user) {
    let uid = user.uid
    login_btn.style.display = "none"
    logout_btn.style.display = "flex"
    useImage.style.display = "flex"
    userProfile(uid)
    logout_btn.addEventListener("click", () => {
      signOut(auth)
    })
    console.log(user)

  } else {
    login_btn.style.display = "flex"
    logout_btn.style.display = "none"
    useImage.style.display = "none"

  }

})
function userProfile(uid) {
  let profileImageRef = doc(db, "users", uid)
  getDoc(profileImageRef).then((data) => {
    console.log("data", data.data())
    console.log("data", data.id)
    useImage.src = data.data().profileImage
    useImage1.src = data.data().profileImage
  })
}

async function getAllProuduct() {
  try {
    const querySnapshot = await getDocs(collection(db, "ProductsGrocery"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      let Products = doc.data()
      console.log(Products)
      let { productName,
        productDescrption,
        productPrice,
        productFile
      } = Products
      const pr = `
    <div
      class="m-2  group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&amp;_p]:delay-200 [&amp;_p]:transition-all"
    >
    <img src="${productFile}" class="w-44 card1img aspect-square text-[#abd373] group-hover:bg-gray-800 text-5xl  p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2 mx-auto"
 alt="Product 10">

      <p
        class="cardtxt font-semibold text-gray-200 tracking-wider group-hover:text-gray-700 text-xl"
      >
        ${productName}
      </p>
      <p class="blueberry  font-semibold text-gray-600  text-xs">
        ${productDescrption}
      </p>
      <div class="ordernow flex flex-row justify-between items-center w-full">
        <p
          class="ordernow-text text-[#abd373] font-semibold group-hover:text-gray-800"
        >
          $${productPrice}
        </p>
        <p id = ${doc.id}
          class="btun4 lg:inline-flex items-center gap-3 group-hover:bg-white/10 bg-[#abd373] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-4 text-sm font-semibold rounded-full butn"
         onclick="buy(this)">
           ${(auth?.currentUser && Products?.ProductCreater?.includes(auth?.currentUser.uid) ? "Cancel Order" : "Order Now")}
        </p>
      </div>
    </div>
    
    `
      // <button id="${doc.id}"onclick ="cart(this)"
      //  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  ${(auth?.currentUser && product?.cartProductFire?.includes(auth?.currentUser.uid) ? "Carted" : "Add to Cart")}</button>

      usrProduct.innerHTML += pr


    })
  } catch (err) {
    alert(err)
  }
}
getAllProuduct()


window.buy = buy
async function buy(e) {
  e.disabled = true
  if (auth.currentUser) {
    const docRef = doc(db, "ProductsGrocery", e.id)
    if (e.innerText == "Cancel Order") {
      updateDoc(docRef, {
        cartProductFire: arrayRemove(auth.currentUser.uid),
      })
        .then(() => {
          e.innerText = "Order Now";
          e.disabled = false;
        })
        .catch((err) => console.log(err));
    } else {
      updateDoc(docRef, {
        likes: arrayUnion(auth.currentUser.uid),
      })
        .then(() => {
          e.innerText = "Cancel Order";
          e.disabled = false;
        })
        .catch((err) => console.log(err));
    }
    console.log("run")

  } else {
    window.location.href = "assest/login/index.html"
  }

}






















window.addEventListener('scroll', function () {
  const backToTopButton = document.getElementById('back-to-top');
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'flex';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// Scroll smoothly to the top
document.getElementById('back-to-top').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// });




// serch btn

let serachiIcon = document.getElementById("serachiIcon");
let searchHeader = document.getElementById("searchHeader");
let cancel = document.getElementById("cancel");
let navbar = document.getElementById("navbar");
let menuToggle = document.getElementById("menuToggle");

serachiIcon.addEventListener("click", () => {
  searchHeader.style.display = "flex";
  navbar.style.display = "none";
});

cancel.addEventListener("click", () => {
  searchHeader.style.display = "none";
  navbar.style.display = "flex";
});

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

document.getElementById("close").addEventListener("click", () => {
  navbar.classList.remove("active");
});

function scrollLeft1() {
  document.querySelector('.gallery').scrollBy({
    left: -200,
    behavior: 'smooth'
  });
}

function scrollRight() {
  document.querySelector('.gallery').scrollBy({
    left: 200,
    behavior: 'smooth'
  });
}

