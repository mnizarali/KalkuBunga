const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context, {}); //membuat objek chart atau diagram

//Value dari form itu
const intialAmount = document.getElementById("initialamount");
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const compound = document.getElementById("compound");

//Pesan
const message = document.getElementById("message");

//Tombol kalkulasi
const button = document.querySelector(".input-group button");

//Attach an event listener
button.addEventListener("click", calculateGrowth);

//array kosong untuk diisi dibawah
const data = [];
const labels = [];

function calculateGrowth(e) {
    e.preventDefault(); //reset ke default agar bebas mengatur variable (e)
    data.length = 0;
    labels.length = 0;
    let growth = 0;

    try {
        const initial = parseInt(intialAmount.value);
        const period = parseInt(years.value);
        const interest = parseInt(rates.value);
        const comp = parseInt(compound.value);

        for(let i = 1; i <= period; i++) {
            const final = initial / Math.pow(1 + ((interest / 100) / comp), comp * i);
            const hasil = final + (final * (interest / 100));
            data.push(toDecimal(hasil, 2)); //memasukan ke array kosong
            labels.push("Uang tahun ke - " + i); 
            growth =  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(final); //,2 dua angka dibelakang koma desima
        }
        //
        message.innerText = `Present Value : ${growth}`;
        drawGraph();
    } catch (error) {
        console.error(error);
    }
}

function drawGraph() {
    line.destroy();
    line = new Chart(context, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Perkembangan",
                data: data.reverse(),
                fill: true,
                backgroundColor: "rgba(109, 47, 255)",
                borderWidth: 3
            }]
        }
    });
}


function toDecimal(value, decimals) {
    return +value.toFixed(decimals);
}