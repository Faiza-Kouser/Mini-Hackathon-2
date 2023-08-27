import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref as ref_database, set, onValue, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD7YEZ7Zgj5aYzooIVosbb17yq86MzwMRk",
    authDomain: "hackathon-df8b7.firebaseapp.com",
    projectId: "hackathon-df8b7",
    storageBucket: "hackathon-df8b7.appspot.com",
    messagingSenderId: "533615595333",
    appId: "1:533615595333:web:a3648f7da9178f6748382c"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
//===========================SignUp===============================================
let sign_up = document.getElementById("signup-btn");
let signup = () => {
  let username = document.getElementById("fname");
  let lastname = document.getElementById("lname");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let repassword =  document.getElementById("re-password");
  let fillFields = false;
  let userData = {
    username: username.value,
    lastname : lastname.value,
    email: email.value,
    password: password.value,
    repassword: repassword.value
  };

  if (username.value == "" && lastname.value==""  && email.value == "" && password.value == "" && repassword.value == "") {
    let p4 = document.getElementById("p4");
    p4.innerText = "Fill out all fields!!";
    username.style.borderColor = "red";
    lastname.style.borderColor = "red";
    email.style.borderColor = "red";
    password.style.borderColor = "red";
    repassword.style.borderColor = "red";
  }
  else if (username.value == "") {
    username.style.borderColor = "red";
  }
  else if (lastname.value == "") {
    lastname.style.borderColor = "red";
  }
  else if (email.value == "") {
    email.style.borderColor = "red";
  }
  else if (password.value == "") {
    password.style.borderColor = "red";
  }
  else if (repassword.value == "") {
    repassword.style.borderColor = "red";
  }
  else {
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
          userData.uid = user.uid;
          ids = user.uid;

          const userRef = ref_database(database, 'users/' + user.uid);
          set(userRef, userData)

            .then(() => {
              console.log("User data written to the database");
              window.location.href = './signin.html';
            })
            .catch((error) => {
              console.error("Error writing user data to the database: ", error);
            });
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("ErrorCode :", errorCode);
          console.log("ErrorMessage", errorMessage);
        });
    }
  };


if (sign_up) {
  sign_up.addEventListener("click", signup);
}

// ===========================signin=================================================

let sign_in = document.getElementById("login-btn");
let uName = document.getElementById("p-name");
var ids
let nameOfUser;
let signin = () => {
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      nameOfUser = user.nameOfUser;
      let userInfo = {
        email: user.email,
        password : user.password,

      }
      ids = user.uid;
      console.log(ids);
      console.log(email);
      console.log(userInfo);
      onValue(ref_database(database, 'users/' + user.uid), (snapshot) => {
        const user_role = (snapshot.val() && snapshot.val().role) || 'Anonymous';
        localStorage.setItem("user" , JSON.stringify(userInfo))
         window.location.href = './dashboard.html';
         uName.innerHTML = user.username;
        
      });
        console.log("Logged in successfully...");

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("ErrorCode :", errorCode);
      console.log("ErrorMessage", errorMessage);
    });
  
};

if (sign_in) {
  sign_in.addEventListener("click", signin);
}

// ===============================DashBoard=====================================

let publishPost = document.getElementById("publish-btn");
let user_db= document.getElementById("userDashboard");
let title = document.getElementById("title");
let post = document.getElementById("post");
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; 
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

let newdate = year + "/" + month + "/" + day;
console.log(newdate)
let postForPublish = () => {
    let blog = {
        title : title.value,
        date: newdate,
        post : post.value,
        
    }
    const userRef = ref_database(database, 'posts/' + `${blog.title}`);
    set(userRef, blog)

      .then(() => {
        console.log("post has been written to the database");
        console.log(nameOfUser)
        //window.location.href = './signin.html';
      })
      .catch((error) => {
        console.error("Error writing user data to the database: ", error);
      });

}

if (publishPost) {
    publishPost.addEventListener("click", postForPublish);
    let getuserData = () =>{
        onValue(ref_database(database, `/posts/`), (snapshot) => {
            const data = (snapshot.val() && snapshot.val()) || 'Anonymous';
             try{
                for(let title in data){
                   console.log(data[title].title)
                   console.log(data[title].date)
                   console.log(data[title].post)
                let titleOfPost = data[title].title;
                let dateOfPost = data[title].date;
                let blogPost = data[title].post;
                
                let div1 = document.createElement("div");
                let p11 = document.createElement("p");
                 let p21 = document.createElement("p");
                 let p31 = document.createElement("p");
                 p1.setAttribute("id", "title1");
                 p2.setAttribute("id", "date1");
                 p3.setAttribute("id", "post1");
                 let text11 = document.createTextNode(titleOfPost);
                 let text21 = document.createTextNode(`Date: ${dateOfPost}`);
                 let text31 = document.createTextNode(blogPost);
                 p11.appendChild(text11);
                 p21.appendChild(text21);
                 p31.appendChild(text31);
                 div1.appendChild(p1);
                 div1.appendChild(p2) ;
                 div1.appendChild(p3) ;
                 user_db.appendChild(div1);
                }
             }catch(err){
                console.log(err)
             }
            
        })
    
    }
    getuserData()
  }

//   =======================userDashboard============================
// let user_db= document.getElementById("userDashboard");
// let userDataDisplay = () =>{
//     console.log(nameOfUser)
//     onValue(ref_database(database, `/posts/`), (snapshot) => {
//         const data = (snapshot.val() && snapshot.val()) || 'Anonymous';
//         console.log(data)
//         try{
//             for(let usernam in data){
//                 console.log(data[usernam])
//             }
//         }catch(err){
//             console.log(err)
//             }
//     })
// }
// if (user_db) {
//     user_db.addEventListener("click", userDataDisplay);
//   }
//   =================================getdata=========================
let div2= document.getElementById("dataDisplay");
let getData = () =>{
    onValue(ref_database(database, `/posts/`), (snapshot) => {
        const data = (snapshot.val() && snapshot.val()) || 'Anonymous';
         try{
            for(let title in data){
               console.log(data[title].title)
               console.log(data[title].date)
               console.log(data[title].post)
            let titleOfPost = data[title].title;
            let dateOfPost = data[title].date;
            let blogPost = data[title].post;
            
            let div = document.createElement("div");
            let p1 = document.createElement("p");
             let p2 = document.createElement("p");
             let p3 = document.createElement("p");
             p1.setAttribute("id", "title1");
             p2.setAttribute("id", "date1");
             p3.setAttribute("id", "post1");
             let text1 = document.createTextNode(titleOfPost);
             let text2 = document.createTextNode(`Date: ${dateOfPost}`);
             let text3 = document.createTextNode(blogPost);
             p1.appendChild(text1);
             p2.appendChild(text2);
             p3.appendChild(text3);
             div.appendChild(p1);
             div.appendChild(p2) ;
             div.appendChild(p3) ;
             div2.appendChild(div);
            }
         }catch(err){
            console.log(err)
         }
    })

}
getData()

// ================================================logout=======================
let logout = document.getElementById("logout-btn");


    function isAuthenticated() {
        const user = localStorage.getItem('user');
        return user !== null;
    }
    if (!isAuthenticated()) {
         window.location.href = './signin.html' ;
    } 
    const log_out = () => {
        localStorage.removeItem('user');
        window.location.href = './signin.html' ;
    }
    


if (logout) {
    logout.addEventListener("click",log_out);
  }
