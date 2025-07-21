const seatGrid = document.getElementById('seatGrid');
const proceedBtn = document.getElementById('proceedBtn');
const info = document.getElementById('info');
const bookingData = JSON.parse(localStorage.getItem('bookingData'));

if (!bookingData || !bookingData.passengers) {
  alert("Booking info missing! Please start from the beginning.");
  window.location.href = "index.html";
}

const totalSeatsToSelect = bookingData.passengers.length;
let selectedSeats = [];

// Create seat map (4 rows × 5 columns = 20 seats: A1–D5)
const rows = ['A', 'B', 'C', 'D'];
const cols = [1, 2, 3, 4, 5];

rows.forEach(row => {
  cols.forEach(col => {
    const seat = document.createElement('div');
    const seatNumber = `${row}${col}`;
    seat.textContent = seatNumber;
    seat.classList.add('seat');
    seat.dataset.seat = seatNumber;

    seat.addEventListener('click', () => {
      if (seat.classList.contains('occupied')) return;

      if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== seatNumber);
      } else {
        if (selectedSeats.length >= totalSeatsToSelect) {
          alert(`You can only select ${totalSeatsToSelect} seat(s).`);
          return;
        }
        seat.classList.add('selected');
        selectedSeats.push(seatNumber);
      }

      info.textContent = `Selected Seat(s): ${selectedSeats.join(', ')}`;
    });

    seatGrid.appendChild(seat);
  });
});

proceedBtn.addEventListener('click', () => {
  if (selectedSeats.length !== totalSeatsToSelect) {
    alert(`Please select exactly ${totalSeatsToSelect} seat(s).`);
    return;
  }

  bookingData.seats = selectedSeats;
  localStorage.setItem('bookingData', JSON.stringify(bookingData));
  window.location.href = 'payment.html';
});
