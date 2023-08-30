// console.log("js is loaded");
const registerURL = "https://hp.hnktrecruitment.in/register";
const loginURL = "https://hp.hnktrecruitment.in/login";

const loader  = document.getElementById("spinnerContainer");

async function sendRegisterData(event) {
    loader.style.display = 'flex';

    //console.log("function is called");
    event.preventDefault();
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const mobile_no = document.getElementById("mobile_no").value;
    const email = document.getElementById("email").value;

    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById("confirm_password").value;

    console.log(first_name, last_name, mobile_no, email, password, confirm_password);

    const formdata = new FormData();

    formdata.append('first_name', first_name);
    formdata.append('last_name', last_name);
    formdata.append("mobile_no", mobile_no);
    formdata.append('email', email);
    formdata.append("password", password);
    formdata.append("confirm_password", confirm_password);


    // const formDataObj = {};
    // formdata.forEach((value,key)=>{
    //     formDataObj[key] = value;
    // });

    //console.log(formDataObj);

try{

     // fetch code
     const response  = await fetch(registerURL, {
        method: 'POST',
        body: formdata
    }).then((res)=>{
        return res.json();
    })

    console.log(response);
   
    

    // const fakeStatus = 200;
    if(response.status ==200){
        loader.style.display = 'none';
        console.log('working');
        
        showMessage('success' , "Registration Successful" , "🌟 Hooray! You're now part of our community" , 'login.html');
    }

    else {
        loader.style.display = 'none';
        const errMsg  =  '🔧 Oops! Looks like a little glitch.'+ response.message;
        showMessage('error', 'Registration Failed' ,errMsg ,'registration.html' );
    }

}catch(error){
    console.log('error')
    console.error(error);
}
   


}

const loginloader  = document.getElementById("spinnerContainer");

//sending login data
async function sendLoginData(event) {
    loginloader.style.display = 'flex';

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const formdata = new FormData();

    formdata.append('email', email);
    formdata.append('password', password);

    const response = await fetch(loginURL, {
        method: 'POST',
        body: formdata
    }).then((res)=>{
        return res.json();
    })
    console.log(response);

    if (response.token) {
        loginloader.style.display = 'none';
        const token = response.token;
        console.log(token);
        localStorage.setItem("token", token);
        showMessage('success', 'You\'re In!', '🌟 Success! Access granted. Let\'s get started!', 'dashboard.html');

    }

    else {
        loginloader.style.display = 'none';
        showMessage('error', 'Hold Up!', '🛑 Access denied. Double-check your credentials.', 'login.html');
    }



}





// This function is called when the registration is successful (status code 200)
function showMessage(icon, title, message, path) {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        // You can customize more properties here
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = path;
        }
    });


}




