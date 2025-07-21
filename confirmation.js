const bookingData = JSON.parse(localStorage.getItem('bookingData'));
const confirmationDiv = document.getElementById('confirmationDetails');

if (bookingData) {
    let passengerList = '';
    bookingData.passengers.forEach((p, idx) => {
        passengerList += `<li>${idx + 1}. ${p.name} (Age: ${p.age})</li>`;
    });

    // Generate transport number if not already present
    if (!bookingData.transportNumber) {
        bookingData.transportNumber = bookingData.mode === 'Bus' ? `BUS-${Math.floor(Math.random() * 900 + 100)}`
                                : bookingData.mode === 'Train' ? `TRAIN-${Math.floor(Math.random() * 9000 + 1000)}`
                                : `FLIGHT-${Math.floor(Math.random() * 90000 + 10000)}`;
    }

    // Generate ticket ID if not already present
    if (!bookingData.ticketId) {
        bookingData.ticketId = `QT${Math.floor(Math.random() * 100000)}`;
    }

    // Update localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    confirmationDiv.innerHTML = `
        <h3>Thank you for booking, ${bookingData.contact}!</h3>
        <p><strong>Email:</strong> ${bookingData.email}</p>
        <p><strong>Mode of Travel:</strong> ${bookingData.mode}</p>
        <p><strong>Journey:</strong> ${bookingData.source} ➡️ ${bookingData.destination}</p>
        <p><strong>Date & Time:</strong> ${bookingData.date} at ${bookingData.time}</p>
        <p><strong>Payment Mode:</strong> ${bookingData.paymentMode}</p>
        <p><strong>Seat Numbers:</strong> ${bookingData.seats ? bookingData.seats.join(', ') : 'Not Assigned'}</p>
        <p><strong>Transport Number:</strong> ${bookingData.transportNumber}</p>
        <p><strong>Ticket ID:</strong> ${bookingData.ticketId}</p>

        <h3>Passenger(s):</h3>
        <ul>${passengerList}</ul>

        <h3>Total Fare Paid: ₹${bookingData.totalFare}</h3>
    `;
} else {
    confirmationDiv.textContent = 'No booking data found. Please start from the booking page.';
}

// Download ticket functionality
document.getElementById('downloadTicketBtn').addEventListener('click', function() {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));

    if (!bookingData) {
        alert('No booking data available.');
        return;
    }

    let ticketContent = `--- QuickTicket Travel Ticket ---\n`;
    ticketContent += `Ticket ID: ${bookingData.ticketId}\n`;
    ticketContent += `Mode of Travel: ${bookingData.mode}\n`;
    ticketContent += `Transport Number: ${bookingData.transportNumber}\n`;
    ticketContent += `Source: ${bookingData.source}\n`;
    ticketContent += `Destination: ${bookingData.destination}\n`;
    ticketContent += `Travel Date & Time: ${bookingData.date} at ${bookingData.time}\n`;
    ticketContent += `Payment Mode: ${bookingData.paymentMode}\n`;
    ticketContent += `Seat Numbers: ${bookingData.seats ? bookingData.seats.join(', ') : 'Not Assigned'}\n`;
    ticketContent += `Contact: ${bookingData.contact}\n`;
    ticketContent += `Email: ${bookingData.email}\n`;
    ticketContent += `\nPassengers:\n`;

    bookingData.passengers.forEach((p, index) => {
        ticketContent += `  ${index + 1}. ${p.name}, Age: ${p.age}\n`;
    });

    ticketContent += `\nTotal Fare Paid: ₹${bookingData.totalFare}\n`;
    ticketContent += `\nThank you for booking with QuickTicket!`;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `ticket_${bookingData.ticketId}.txt`;
    link.click();
});
