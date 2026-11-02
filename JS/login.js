
let message = document.getElementById('message-login');

message.innerHTML = "";
message.style.padding = 0;

let submit_login = document.getElementById('submit-login');

submit_login.addEventListener('click', (e) => 
{
    e.preventDefault();
    login();
})

let username = document.getElementById('username-login');
let password = document.getElementById('password-login');

function login()
{
    const check_username = username.value;
    const check_password = password.value;

    let data_login;

    if(check_username.length > 2 && check_password.length >= 2)
    {
        data_login = 
        {
            username: username.value,
            password: password.value
        }
    }
    else
    {
        message.innerHTML = "Username and password must be at least 3 letters long!";
        return;
    }

    const response = fetch("https://www.fulek.com/data/api/user/login",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json_check(data_login)
    })

    response
    .then((result) => result.json())
    .then((data) => 
    {
        if(data.isSuccess == true)
        {
            window.validation_code = data.data.token;

            sessionStorage.setItem("User", JSON.stringify(data));
            location.replace("admin.html");
        }
        else
        {
            message.innerHTML = "User not found!";
            message.style.padding = "5px 0px 0px 0px";
        }
    })
}

function json_check(data)
{
    if(data != undefined)
    {
        return JSON.stringify(data);
    }

    return null;
}
