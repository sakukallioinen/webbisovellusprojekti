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
        setTimeout(() => {
            alert("Tämä viesti katoaa nyt.");
        }, 2000); // Alert will disappear after 2 seconds
    } else {
        alert("Täytä kaikki kentät ennen lähettämistä.");
    }
});
