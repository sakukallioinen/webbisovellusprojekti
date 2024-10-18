// script.js

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Estää lomakkeen lähetyksen

    // Hae lomakkeen tiedot
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Tarkista, että kaikki kentät ovat täytetty
    if (name && email && message) {
        alert("Kiitos, viestisi on lähetetty!");
        // Tässä voit lisätä toiminnallisuuden, kuten viestin lähetyksen palvelimelle
    } else {
        alert("Täytä kaikki kentät ennen lähettämistä.");
    }
});
