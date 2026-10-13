
document.addEventListener("DOMContentLoaded", function () {

    
    const kviz = document.querySelector("#kvizObrazec");
    const rezultatKviza = document.querySelector("#rezultatKviza");

    if (kviz && rezultatKviza) {
        kviz.addEventListener("submit", function (dogodek) {
            dogodek.preventDefault();

            const odgovor = kviz.querySelector(
                'input[name="odgovor"]:checked'
            );

            rezultatKviza.classList.remove("uspeh", "napaka");

            if (!odgovor) {
                rezultatKviza.textContent = "Najprej izberi odgovor.";
                rezultatKviza.classList.add("napaka");
            } else if (odgovor.value === "tek") {
                rezultatKviza.textContent =
                    "Pravilno! Tek na 100 m je tekaška disciplina.";
                rezultatKviza.classList.add("uspeh");
            } else {
                rezultatKviza.textContent =
                    "Odgovor ni pravilen. Poskusi znova!";
                rezultatKviza.classList.add("napaka");
            }
        });
    }

    
    const obrazec = document.querySelector("#prijavniObrazec");
    const izpis = document.querySelector("#izpisPrijave");

    if (obrazec && izpis) {
        obrazec.addEventListener("submit", function (dogodek) {
            dogodek.preventDefault();

            izpis.textContent = "";
            izpis.classList.remove("uspeh", "napaka");

            const ime = obrazec.elements["ime"].value.trim();
            const email = obrazec.elements["email"].value.trim();
            const disciplina = obrazec.elements["disciplina"].value;
            const starost = Number(obrazec.elements["starost"].value);
            const datum = obrazec.elements["datum"].value;
            const sporocilo = obrazec.elements["sporocilo"].value.trim();
            const pogoji = obrazec.elements["pogoji"].checked;

            if (ime.length < 2) {
                prikaziSporocilo(
                    izpis, "Vpiši ime, dolgo vsaj 2 znaka.", false
                );
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                prikaziSporocilo(
                    izpis, "Vpiši veljaven e-poštni naslov.", false
                );
                return;
            }

            if (!disciplina) {
                prikaziSporocilo(
                    izpis, "Izberi atletsko disciplino.", false
                );
                return;
            }

            if (
                obrazec.elements["starost"].value === "" ||
                !Number.isFinite(starost) ||
                starost < 6 ||
                starost > 100
            ) {
                prikaziSporocilo(
                    izpis, "Starost mora biti med 6 in 100 let.", false
                );
                return;
            }

            if (!pogoji) {
                prikaziSporocilo(
                    izpis, "Potrdi, da so podatki pravilni.", false
                );
                return;
            }

            const podatki = [
                "Prijava je uspešno pripravljena!",
                "Ime: " + ime,
                "E-pošta: " + email,
                "Disciplina: " + disciplina,
                "Starost: " + starost,
                datum
                    ? "Želeni datum začetka: " + datum
                    : "Datum začetka ni izbran.",
                sporocilo
                    ? "Sporočilo: " + sporocilo
                    : "Dodatnega sporočila ni."
            ];

            prikaziSporocilo(izpis, podatki.join("\n"), true);
        });

        obrazec.addEventListener("reset", function () {
            izpis.textContent = "";
            izpis.classList.remove("uspeh", "napaka");
        });
    }

    // Pomožna funkcija za prikaz sporočil.
    function prikaziSporocilo(element, besedilo, uspesno) {
        element.textContent = besedilo;
        element.classList.remove("uspeh", "napaka");
        element.classList.add(uspesno ? "uspeh" : "napaka");
    }
});
