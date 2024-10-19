// Kuuntele lomakkeen lähetyspainiketta
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Estää lomakkeen automaattisen lähetyksen

    // Hae lomakkeen tiedot
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Lähetä EmailJS:n kautta
    emailjs.send("service_dt83era", "template_xi7j7x6", {
        name: name,
        email: email,
        message: message
    })
    .then(function(response) {
        alert("Kiitos, viestisi on lähetetty!");
        // Tyhjennetään lomake
        document.getElementById("contactForm").reset();
    }, function(error) {
        console.error("Virhe viestin lähetyksessä:", error); // Lokita virhe
        alert("Virhe viestin lähetyksessä: " + JSON.stringify(error));
    });
});
