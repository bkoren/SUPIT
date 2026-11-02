
const btnOpenContact = document.getElementById('open-form-contact');
const btnCloseContact = document.getElementById('close-form-contact');
const overlay = document.getElementById('overlay');

let form = null;
btnOpenContact.addEventListener('click', () => 
{
    form = document.getElementById('form-contact')
    openContactForm(form)
})

btnCloseContact.addEventListener('click', () => 
{
    form = document.getElementById('form-contact')
    closeContactForm(form)
})

function openContactForm(form) 
{
    form.classList.add('active')
    overlay.classList.add('active')
}

function closeContactForm(form) 
{  
    form.classList.remove('active')
    overlay.classList.remove('active')
}












