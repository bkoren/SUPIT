const log_in = document.getElementById('navigation-login');
const option = document.getElementById('navigation-admin-option');

const token = sessionStorage.getItem("User");
if(token == null || token.isSuccess == false)
{
    set_log_in_values();
}
else
{
    set_logout_values();
}


function set_log_in_values()
{
    log_in.onclick = "";
    log_in.href = "/HTML/login.html";
    log_in.innerHTML = "<b>Prijavi se</b><img src=\"/Materials/Icons/login.png\" alt=\"Login_icon.png\">";

    option.style.display = "none"
}

function set_logout_values() 
{
    log_in.onclick = function() {sessionStorage.clear()};
    log_in.href = "/HTML/login.html";
    log_in.innerHTML = "<img src=\"/Materials/Icons/log-out.jpg\" alt=\"Logout_icon.png\"><b>Odjavite se</b>"
        + "<span class=\"username-navigation\">" + add_username() + "</span>";
    
    option.href = "/HTML/admin-option.html";
    option.innerHTML = "<img src=\"/Materials/Icons/info-icon.png\" alt=\"Info_icon.png\"><b>Nastavni plan</b>";
    option.style.display = "block";
}

function add_username() 
{
    const result = JSON.parse(sessionStorage.getItem("User"));

    return result.data.username;
}

function delete_token() 
{
    sessionStorage.clear();
}

