let passengerCount = 1;
const passengerDetails = document.getElementById('passengerDetails');

document.getElementById('addPassengerBtn').addEventListener('click', () => {
    const totalPassengers = passengerDetails.querySelectorAll('.passenger-group').length + 1;
    const passengerDiv = document.createElement('div');
    passengerDiv.classList.add('passenger-group');

    passengerDiv.innerHTML = `
        <label>Passenger ${totalPassengers} Name:</label>
        <input type="text" name="passengerName" required>

        <label>Passenger ${totalPassengers} Age:</label>
        <input type="number" name="passengerAge" min="0" required>

        <button type="button" class="removePassengerBtn">Remove Passenger</button>
    `;

    passengerDetails.appendChild(passengerDiv);

    // Add remove functionality
    passengerDiv.querySelector('.removePassengerBtn').addEventListener('click', () => {
        passengerDiv.remove();
        renumberPassengers();
    });
});

// Function to re-label passengers correctly
function renumberPassengers() {
    const groups = passengerDetails.querySelectorAll('.passenger-group');
    groups.forEach((group, idx) => {
        const nameLabel = group.querySelector('label:nth-child(1)');
        const ageLabel = group.querySelector('label:nth-child(3)');
        nameLabel.textContent = `Passenger ${idx + 1} Name:`;
        ageLabel.textContent = `Passenger ${idx + 1} Age:`;
    });
}

// Prevent same source & destination
document.querySelector('select[name="destination"]').addEventListener('change', function () {
    const source = document.querySelector('select[name="source"]').value;
    if (this.value === source && source !== '') {
        alert('Source and Destination cannot be the same.');
        this.value = '';
    }
});

// Submit form
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const passengers = [];
    const contact = formData.get('contact');
    const email = formData.get('email');
    const mode = formData.get('mode');
    const source = formData.get('source');
    const destination = formData.get('destination');
    const date = formData.get('date');
    const time = formData.get('time');

    if (source === destination) {
        alert('Source and Destination cannot be the same.');
        return;
    }

    passengerDetails.querySelectorAll('.passenger-group').forEach(group => {
        const name = group.querySelector('input[name="passengerName"]').value;
        const age = parseInt(group.querySelector('input[name="passengerAge"]').value, 10);
        passengers.push({ name, age });
    });

    const bookingData = {
        contact, email, mode, source, destination, date, time, passengers
    };

    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    window.location.href = 'seats.html';
});
