document.addEventListener("DOMContentLoaded", function () {
    const flights = document.querySelector("#flights");
    const container = document.querySelector(".container");

    const button = document.createElement("button");
    button.textContent ="Manage Filght";
    button.id = "manageFlightsButton"
    container.appendChild(button)

    async function fetchFlights(code) {
        await fetch("API.json")
            .then(response => response.json())
            .then(data => {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const flight = data[key];
                        setTimeout(() => {
                            if (flight.from === code || flight.to === code) {
                                const li = document.createElement("li");
                                li.textContent = `ID: ${flight.flightID}, From: ${flight.from}, To: ${flight.to}, Departure: ${flight.departure}, Arrival: ${flight.arival}`;
                                flights.appendChild(li);
                            }
                        }, 2000)
                    };
                };
            })
            .catch(error => {
                console.error('Veriler getirilirken veya ayrıştırılırken hata oluştu:', error);
            });

    }

    const airportCode = prompt("Lütfen bir havaalanı kodu girin").toUpperCase();
    fetchFlights(airportCode);

    const flightForm = document.querySelector("#flightForm");
    const flightId = document.querySelector("#flightId");
    const from = document.querySelector("#from");
    const to = document.querySelector("#to");
    const departure = document.querySelector("#departure");
    const arrival = document.querySelector("#arrival");

    flightForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addFlight();
    })



    async function addFlight() {

        let newFlightId = flightId.value.trim().toUpperCase();
        let newFrom = from.value.trim().toUpperCase();
        const newTo = to.value.trim().toUpperCase();
        const newDeparture = departure.value.trim().toUpperCase();
        const newArrival = arrival.value.trim().toUpperCase();

        const listItem = document.getElementsByTagName("li");
        console.log(typeof listItem);
        console.log(listItem);
        if (listItem.hasOwnProperty(newFlightId)) {
            //1. güncellemede ekliyor sonra güncelliyor  daha sonra normal çalışıyor sadece ilk seferde 3  güncellemk istesek
            updateFlight(newFlightId);
        } else {
            const promise = await new Promise((resolve) => {
                setTimeout(() => {
                    const li = document.createElement("li");
                    li.textContent = `ID: ${newFlightId}, From: ${newFrom}, To: ${newTo}, Departure: ${newDeparture}, Arrival: ${newArrival}`;
                    flights.appendChild(li);
                    alert("Uçuş başarıyla eklendi", resolve)
                }, 3000);
            }).then(res => {
                res(console.log("Uçuş eklendi"));
            })
        }

    }

    async function updateFlight(flightId) {
        const listItems = document.getElementsByTagName("li");
        for (let i = 0; i < listItems.length; i++) {
            const li = listItems[i];
            if (li.textContent.includes(`ID: ${flightId}`)) {
                li.textContent = `ID: ${flightId}, From: ${from.value.trim()}, To: ${to.value.trim()}, Departure: ${departure.value.trim()}, Arrival: ${arrival.value.trim()}`;
                alert("Uçuş başarıyla güncellendi");
                return;
            }
        }
    }

    const removeFlightButton = document.querySelector("#removeFlightButton");

    removeFlightButton.addEventListener("click", (event) => {
        const flightId = Number(prompt("Silmek istedğiniz uçuş ID'sini belirtiniz:"));
        event.preventDefault();
        removeFlight(flightId);
    })


    async function removeFlight(flightID) {
        const listItems = document.getElementsByTagName("li");
        for (let i = 0; i < listItems.length; i++) {
            const li = listItems[i];
            if (li.textContent.includes(`ID: ${flightID}`)) {
                flights.removeChild(listItems[i]);
                break;
            }
        }
    }
    document.getElementById("manageFlightsButton").addEventListener("click", manageFlights);

    async function manageFlights(airportCode) {
        await fetchFlights(airportCode);
    
        const action = prompt("Yapmak istediğiniz işlemi seçin: (1) Uçuş Ekle, (2) Uçuş Güncelle, (3) Uçuş Sil");
    
        switch (action) {
            case "1":
                await addFlight();
                break;
            case "2":
                const updateFlightId = prompt("Güncellemek istediğiniz uçuş ID'sini girin:");
                await updateFlight(updateFlightId);
                break;
            case "3":
                const removeFlightId = Number(prompt("Silmek istediğiniz uçuş ID'sini girin:"));
                await removeFlight(removeFlightId);
                break;
            default:
                console.log("Geçersiz işlem seçildi.");
        }
    
        console.log("İşlem tamamlandı.");
    }
    
    

})