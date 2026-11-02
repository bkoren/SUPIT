let message = document.getElementById('message-register');

message.style.display = "none";

let username = document.getElementById('username-register');
let password = document.getElementById('password-register');

let login_submit = document.getElementById('submit-register');

login_submit.addEventListener('click', (e) =>
{
    e.preventDefault();
    register();
});


function register() {
    
    const check_username = username.value;
    const check_password = password.value;

    let data_register;

    if(check_username.length > 2 && check_password.length >= 2)
    {
        data_register = 
        {
            username: username.value,
            password: password.value
        }
    }
    else
    {
        message.style.display = "block";
        message.innerHTML = "<span style='color:red;'>Username and password must be at least 3 characters long!</span>";
        return;
    }

    fetch("https://www.fulek.com/data/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data_register)
    })

    message.style.display = "block";
    message.innerHTML = "<span style='color:blue;'>Registration sucessful!</span>";
}


