// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const pages = document.querySelectorAll('.page');
    const backButtons = document.querySelectorAll('.btn-back');
    
    // Movie Booking
    const movieCards = document.querySelectorAll('.movie-card');
    const dateItems = document.querySelectorAll('.date-item');
    const timeItems = document.querySelectorAll('.time-item');
    const proceedBtn = document.getElementById('btn-proceed');
    const confirmPaymentBtn = document.getElementById('btn-confirm-payment');
    const termsCheckbox = document.getElementById('terms-check');
    const downloadBtn = document.getElementById('btn-download');
    const emailBtn = document.getElementById('btn-email');
    const homeBtn = document.getElementById('btn-home');
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    // Seat Map Variables
    const seatMap = document.querySelector('.seat-map');
    const movieTitle = document.getElementById('movie-title');
    const movieDetails = document.getElementById('movie-details');
    const summaryMovie = document.getElementById('summary-movie');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    const summarySeats = document.getElementById('summary-seats');
    const summaryCount = document.getElementById('summary-count');
    const summaryTotal = document.getElementById('summary-total');
    
    // Payment Variables
    const paymentMovie = document.getElementById('payment-movie');
    const paymentDatetime = document.getElementById('payment-datetime');
    const paymentSeats = document.getElementById('payment-seats');
    const paymentTotal = document.getElementById('payment-total');
    
    // Invoice Variables
    const invoiceMovie = document.getElementById('invoice-movie');
    const invoiceId = document.getElementById('invoice-id');
    const invoiceDatetime = document.getElementById('invoice-datetime');
    const invoiceSeats = document.getElementById('invoice-seats');
    const invoiceTotal = document.getElementById('invoice-total');
    
    // State Management
    let selectedSeats = [];
    let selectedMovie = {
        id: 'movie1',
        title: 'The Space Odyssey',
        details: 'Sci-Fi, Adventure | 2h 15m',
        price: 150
    };
    let selectedDate = 'Mar 8, 2025';
    let selectedTime = '10:00 AM';
    
    // Toggle Navigation Menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
    
    // Navigation Page Switching
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(link => link.classList.remove('active'));
            item.classList.add('active');
            
            const targetPage = item.getAttribute('data-page');
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                }
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('show');
        });
    });
    
    // Back Button Functionality
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the current active page
            const currentPage = document.querySelector('.page.active');
            
            // Logic for specific back button actions
            if (currentPage.id === 'booking') {
                // Go back to home
                switchPage('home');
            } else if (currentPage.id === 'payment') {
                // Go back to booking
                switchPage('booking');
            }
        });
    });
    
    // Date Selection
    dateItems.forEach(item => {
        item.addEventListener('click', () => {
            dateItems.forEach(date => date.classList.remove('active'));
            item.classList.add('active');
            
            // Update selected date
            const dateObj = new Date(item.getAttribute('data-date'));
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            selectedDate = dateObj.toLocaleDateString('en-US', options);
            
            // Update summary
            summaryDate.textContent = selectedDate;
        });
    });
    
    // Time Selection
    timeItems.forEach(item => {
        item.addEventListener('click', () => {
            timeItems.forEach(time => time.classList.remove('active'));
            item.classList.add('active');
            
            // Update selected time
            selectedTime = item.textContent;
            
            // Update summary
            summaryTime.textContent = selectedTime;
        });
    });
    
    // Movie Card Booking Button Click
    movieCards.forEach(card => {
        const bookBtn = card.querySelector('.btn-book');
        if (bookBtn) {
            bookBtn.addEventListener('click', () => {
                const movieId = card.getAttribute('data-id');
                const title = card.querySelector('h3').textContent;
                const details = card.querySelector('p').textContent;
                
                selectedMovie = {
                    id: movieId,
                    title: title,
                    details: details,
                    price: 150 // Default price
                };
                
                // Update booking page
                movieTitle.textContent = title;
                movieDetails.textContent = details;
                summaryMovie.textContent = title;

                // Switch to booking page
                switchPage('booking');
                
                // Generate seat map
                generateSeatMap();
            });
        }
    });
    
    // Generate Seat Map
    function generateSeatMap() {
        // Clear existing seat map
        seatMap.innerHTML = '';
        
        // Define the seat layout
        const rows = 8;
        const seatsPerRow = 8;
        const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        
        // Pre-occupied seats (random for demo)
        const occupiedSeats = generateRandomOccupiedSeats(rows, seatsPerRow);
        
        // Create rows and seats
        for (let i = 0; i < rows; i++) {
            const seatRow = document.createElement('div');
            seatRow.className = 'seat-row';
            
            // Add row label (A, B, C, etc.)
            const rowLabel = document.createElement('div');
            rowLabel.className = 'row-label';
            rowLabel.textContent = rowLabels[i];
            seatRow.appendChild(rowLabel);
            
            // Create left group of seats (4 seats)
            const leftGroup = document.createElement('div');
            leftGroup.className = 'seat-group';
            
            for (let j = 0; j < seatsPerRow / 2; j++) {
                const seat = document.createElement('div');
                const seatId = `${rowLabels[i]}${j + 1}`;
                seat.className = occupiedSeats.includes(seatId) ? 'seat occupied' : 'seat available';
                seat.setAttribute('data-seat', seatId);
                
                if (!occupiedSeats.includes(seatId)) {
                    seat.addEventListener('click', () => toggleSeat(seat, seatId));
                }
                
                leftGroup.appendChild(seat);
            }
            
            // Create right group of seats (4 seats)
            const rightGroup = document.createElement('div');
            rightGroup.className = 'seat-group';
            
            for (let j = seatsPerRow / 2; j < seatsPerRow; j++) {
                const seat = document.createElement('div');
                const seatId = `${rowLabels[i]}${j + 1}`;
                seat.className = occupiedSeats.includes(seatId) ? 'seat occupied' : 'seat available';
                seat.setAttribute('data-seat', seatId);
                
                if (!occupiedSeats.includes(seatId)) {
                    seat.addEventListener('click', () => toggleSeat(seat, seatId));
                }
                
                rightGroup.appendChild(seat);
            }
            
            // Add an aisle between left and right groups
            seatRow.appendChild(leftGroup);
            const aisle = document.createElement('div');
            aisle.style.width = '20px';
            seatRow.appendChild(aisle);
            seatRow.appendChild(rightGroup);
            
            // Add row to the seat map
            seatMap.appendChild(seatRow);
        }
    }
    
    // Generate random occupied seats for demo
    function generateRandomOccupiedSeats(rows, seatsPerRow) {
        const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const occupiedSeats = [];
        const numberOfOccupiedSeats = Math.floor(Math.random() * 15) + 10; // Between 10-25 occupied seats
        
        for (let i = 0; i < numberOfOccupiedSeats; i++) {
            const rowIndex = Math.floor(Math.random() * rows);
            const seatIndex = Math.floor(Math.random() * seatsPerRow) + 1;
            const seatId = `${rowLabels[rowIndex]}${seatIndex}`;
            
            if (!occupiedSeats.includes(seatId)) {
                occupiedSeats.push(seatId);
            }
        }
        
        return occupiedSeats;
    }
    
    // Toggle seat selection
    function toggleSeat(seatElement, seatId) {
        if (seatElement.classList.contains('available')) {
            seatElement.classList.remove('available');
            seatElement.classList.add('selected');
            selectedSeats.push(seatId);
        } else if (seatElement.classList.contains('selected')) {
            seatElement.classList.remove('selected');
            seatElement.classList.add('available');
            selectedSeats = selectedSeats.filter(id => id !== seatId);
        }
        
        // Update summary
        updateSummary();
    }
    
    // Update booking summary
    function updateSummary() {
        // Sort seats for better display
        selectedSeats.sort();
        
        // Update seats display
        summarySeats.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : '-';
        
        // Update count and total
        const count = selectedSeats.length;
        console.log(selectedMovie.price)
        const total = count * selectedMovie.price;
        
        summaryCount.textContent = count;
        summaryTotal.textContent = `₹${total.toFixed(2)}`;
        
        // Enable/disable proceed button
        proceedBtn.disabled = count === 0;
    }
    
    // Proceed to Payment
    if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
            // Update payment page information
            paymentMovie.textContent = selectedMovie.title;
            paymentDatetime.textContent = `${selectedDate} at ${selectedTime}`;
            paymentSeats.textContent = selectedSeats.join(', ');
            paymentTotal.textContent = summaryTotal.textContent;
            
            // Switch to payment page
            switchPage('payment');
        });
    }
    
    // Payment Option Selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Terms Checkbox
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', () => {
            confirmPaymentBtn.disabled = !termsCheckbox.checked;
        });
    }
    
    // Confirm Payment
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', () => {
            // Generate a random booking ID
            const bookingId = 'CT' + Math.floor(Math.random() * 90000000 + 10000000);
            
            // Update invoice information
            invoiceMovie.textContent = selectedMovie.title;
            invoiceId.textContent = bookingId;
            invoiceDatetime.textContent = `${selectedDate} at ${selectedTime}`;
            invoiceSeats.textContent = selectedSeats.join(', ');
            invoiceTotal.textContent = summaryTotal.textContent;
            
            // Switch to invoice page
            switchPage('invoice');
        });
    }
    
    // Download Ticket (mock functionality)
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            alert('Ticket downloaded successfully!');
        });
    }
    
    // Email Ticket (mock functionality)
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            alert('Ticket sent to your email!');
        });
    }
    
    // Go back to home
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            switchPage('home');
            
            // Reset selected seats
            selectedSeats = [];
        });
    }
    
    // Helper function to switch pages
    function switchPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId) {
                page.classList.add('active');
            }
        });
        
        // If switching to home, update nav
        if (pageId === 'home') {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-page') === 'home') {
                    item.classList.add('active');
                }
            });
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Initialize the first date and time item as active
    if (dateItems.length > 0) {
        dateItems[0].classList.add('active');
    }
    
    if (timeItems.length > 0) {
        timeItems[0].classList.add('active');
    }
});