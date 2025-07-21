// Distance matrix
const distanceMatrix = {
    'Mumbai':     { 'Mumbai': 0,    'Delhi': 1400, 'Kolkata': 2000, 'Pune': 150,  'Bangalore': 980,  'Chennai': 1330, 'Jaipur': 1140 },
    'Delhi':      { 'Mumbai': 1400, 'Delhi': 0,    'Kolkata': 1500, 'Pune': 1420, 'Bangalore': 2150, 'Chennai': 2200, 'Jaipur': 280  },
    'Kolkata':    { 'Mumbai': 2000, 'Delhi': 1500, 'Kolkata': 0,    'Pune': 2050, 'Bangalore': 1870, 'Chennai': 1670, 'Jaipur': 1550 },
    'Pune':       { 'Mumbai': 150,  'Delhi': 1420, 'Kolkata': 2050, 'Pune': 0,    'Bangalore': 840,  'Chennai': 1200, 'Jaipur': 1180 },
    'Bangalore':  { 'Mumbai': 980,  'Delhi': 2150, 'Kolkata': 1870, 'Pune': 840,  'Bangalore': 0,    'Chennai': 350,  'Jaipur': 2000 },
    'Chennai':    { 'Mumbai': 1330, 'Delhi': 2200, 'Kolkata': 1670, 'Pune': 1200, 'Bangalore': 350,  'Chennai': 0,    'Jaipur': 2100 },
    'Jaipur':     { 'Mumbai': 1140, 'Delhi': 280,  'Kolkata': 1550, 'Pune': 1180, 'Bangalore': 2000, 'Chennai': 2100, 'Jaipur': 0    }
};

function getDistance(source, destination) {
    if (distanceMatrix[source] && distanceMatrix[source][destination] !== undefined) {
        return distanceMatrix[source][destination];
    } else {
        return 500; // Default fallback distance
    }
}

const bookingData = JSON.parse(localStorage.getItem('bookingData'));
const paymentSummaryDiv = document.getElementById('paymentSummary');

if (bookingData) {
    let totalAmount = 0;
    const perKmCost = {
        'Bus': 4,
        'Train': 2,
        'Flight': 8
    };

    const distance = getDistance(bookingData.source, bookingData.destination);

    bookingData.passengers.forEach(p => {
        if (p.age >= 6) {
            totalAmount += distance * perKmCost[bookingData.mode];
        }
    });

    // Store totalFare for confirmation page
    bookingData.totalFare = totalAmount;
    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    paymentSummaryDiv.innerHTML = `
        <p><strong>Contact:</strong> ${bookingData.contact}</p>
        <p><strong>Email:</strong> ${bookingData.email}</p>
        <p><strong>Mode:</strong> ${bookingData.mode}</p>
        <p><strong>From:</strong> ${bookingData.source} ➡️ ${bookingData.destination}</p>
        <p><strong>Distance:</strong> ${distance} km</p>
        <p><strong>Travel Date:</strong> ${bookingData.date} at ${bookingData.time}</p>
        <p><strong>Total Passengers:</strong> ${bookingData.passengers.length}</p>
        <p><strong>Total Payable Amount:</strong> ₹${totalAmount}</p>
    `;
}

document.getElementById('confirmPaymentBtn').addEventListener('click', () => {
    const selectedPaymentMode = document.getElementById('paymentMode').value;

    if (!selectedPaymentMode) {
        alert('Please select a payment mode.');
        return;
    }

    bookingData.paymentMode = selectedPaymentMode; // Store selected mode
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    window.location.href = 'confirmation.html';
});
