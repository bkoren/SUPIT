window.onload = function()
{
    const text = document.getElementById('container-Text')
    const typewriter = new Typewriter(text);

    typewriter
    .start()
    .typeString('Budi izvrstan u onome što vidiš!')
    .pauseFor(1000)
    .deleteChars(6)
    .typeString('voliš.<span style="color:red"><br><b>ZAISKRI</b></span>')
    .typeString('.')
    
}
