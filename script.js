let lastSubmissionTime = null; // Muuttuja edellisen lähetyksen ajalle

// Kuuntele lomakkeen lähetyspainiketta
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Estää lomakkeen automaattisen lähetyksen

    const now = new Date();
    const fiveMinutes = 5 * 60 * 1000; // 5 minuuttia millisekunteina

    // Tarkista, onko edellisestä lähetyksestä kulunut vähemmän kuin 5 minuuttia
    if (lastSubmissionTime && (now - lastSubmissionTime < fiveMinutes)) {
        const remainingTime = Math.ceil((fiveMinutes - (now - lastSubmissionTime)) / 1000); // Jäljellä oleva aika sekunteina
        alert(`Uuden yhteydenottopyynnön voi lähettää ${remainingTime} sekunnin kuluttua.`);
        return; // Lopetetaan toiminta, jos aikaa ei ole kulunut tarpeeksi
    }

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
        
        // Päivitetään viimeinen lähetysaika
        lastSubmissionTime = now;
    }, function(error) {
        console.error("Virhe viestin lähetyksessä:", error); // Lokita virhe
        alert("Virhe viestin lähetyksessä: " + JSON.stringify(error));
    });
});

const repoContainer = document.getElementById("repo");

// GitHub-repositorion hakutoiminto

async function fetchRepo(repoId, owner, repoName, descriptionElementId) {
    const repoUrl = `https://api.github.com/repos/${owner}/${repoName}`;
    const languagesUrl = `https://api.github.com/repos/${owner}/${repoName}/languages`;

    try {
        // Fetch repository details
        const response = await fetch(repoUrl);
        const data = await response.json();

        // Update the project description with the data from GitHub
        document.getElementById(descriptionElementId).innerHTML = `
            <p><strong>Nimi:</strong> <a href="${data.html_url}" target="_blank">${data.full_name}</a></p>
            <p><strong>Kuvaus:</strong> ${data.description || 'Ei kuvausta saatavilla'}</p>
        `;

        // Fetch languages
        const languagesResponse = await fetch(languagesUrl);
        const languages = await languagesResponse.json();
        const languagesList = Object.keys(languages).join(', ');

        // Add language info after the description
        document.getElementById(descriptionElementId).innerHTML += `
            <p><strong>Käytetyt kielet:</strong> ${languagesList || 'Ei tietoa käytetyistä kielistä'}</p>
        `;
    } catch (error) {
        console.log(descriptionElementId);
        document.getElementById(descriptionElementId).innerHTML = `<p>Virhe haettaessa tietoja GitHubista.</p>`;
        console.error('Virhe:', error);
    }
}


// Hakee projektitiedot ja asettaa ne kuvauskohtiin
function fetchProjects() {
    //fetchRepo(1, 'sakukallioinen', 'profilesapp', 'project1-description');  // Ensimmäinen projekti
    fetchRepo(2, 'sakukallioinen', 'pankkiautomaatti', 'project2-description');  // Toinen projekti
}

// Kutsutaan sivun latauksessa
fetchProjects();
