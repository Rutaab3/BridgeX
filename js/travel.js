    // JavaScript functionality
    function switchTab(tab) {
      // Update active tab
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      if (tab === 'bus') {
        document.querySelector('.tab:nth-child(1)').classList.add('active');
        document.getElementById('bus-form').style.display = 'block';
        document.getElementById('flight-form').style.display = 'none';
      } else {
        document.querySelector('.tab:nth-child(2)').classList.add('active');
        document.getElementById('bus-form').style.display = 'none';
        document.getElementById('flight-form').style.display = 'block';
      }
    }

    function searchBuses() {
      const from = document.getElementById('bus-from').value || 'Anywhere';
      const to = document.getElementById('bus-to').value || 'Anywhere';
      const date = document.getElementById('bus-date').value || 'any date';
      const passengers = document.getElementById('bus-passengers').value;
      
      // Hide flight results if visible
      document.getElementById('flight-results').style.display = 'none';
      
      // Show bus results
      const resultsDiv = document.getElementById('bus-results');
      resultsDiv.style.display = 'block';
      resultsDiv.innerHTML = `
        <h2>Bus Results from ${from} to ${to} on ${date}</h2>
        <div class="result-item">
          <div class="result-header">
            <h3>${from} to ${to}</h3>
            <div class="result-price">$45</div>
          </div>
          <div class="result-details">
            <span class="result-company">GreenLine Express</span>
            <span>8:00 AM - 12:30 PM</span>
          </div>
          <p>Non-stop • Free WiFi • Power outlets</p>
          <button class="book-btn" onclick="bookTicket('GreenLine Express', 'bus')">Book Now</button>
        </div>
        <div class="result-item">
          <div class="result-header">
            <h3>${from} to ${to}</h3>
            <div class="result-price">$38</div>
          </div>
          <div class="result-details">
            <span class="result-company">CityLink</span>
            <span>10:15 AM - 3:00 PM</span>
          </div>
          <p>1 stop • Refreshments available</p>
          <button class="book-btn" onclick="bookTicket('CityLink', 'bus')">Book Now</button>
        </div>
        <div class="result-item">
          <div class="result-header">
            <h3>${from} to ${to}</h3>
            <div class="result-price">$52</div>
          </div>
          <div class="result-details">
            <span class="result-company">Luxury Liners</span>
            <span>6:30 PM - 10:45 PM</span>
          </div>
          <p>Non-stop • Luxury seating • Onboard entertainment</p>
          <button class="book-btn" onclick="bookTicket('Luxury Liners', 'bus')">Book Now</button>
        </div>
      `;
    }

    function searchFlights() {
      const from = document.getElementById('flight-from').value || 'Anywhere';
      const to = document.getElementById('flight-to').value || 'Anywhere';
      const depart = document.getElementById('flight-depart').value || 'any date';
      const returnDate = document.getElementById('flight-return').value || 'one-way';
      const flightClass = document.getElementById('flight-class').value;
      const passengers = document.getElementById('flight-passengers').value;
      
      // Hide bus results if visible
      document.getElementById('bus-results').style.display = 'none';
      
      // Show flight results
      const resultsDiv = document.getElementById('flight-results');
      resultsDiv.style.display = 'block';
      resultsDiv.innerHTML = `
        <h2>Flight Results from ${from} to ${to}</h2>
        <div class="result-item">
          <div class="result-header">
            <h3>${from} to ${to}</h3>
            <div class="result-price">$189</div>
          </div>
          <div class="result-details">
            <span class="result-company">SkyWings Airlines</span>
            <span>7:30 AM - 9:45 AM</span>
          </div>
          <p>Non-stop • ${flightClass} • Free carry-on</p>
          <button class="book-btn" onclick="bookTicket('SkyWings Airlines', 'flight')">Book Now</button>
        </div>
        <div class="result-item">
          <div class="result-header">
            <h3>${from} to ${to}</h3>
            <div class="result-price">$165</div>
          </div>
          <div class="result-details">
            <span class="result-company">Global Airways</span>
            <span>12:15 PM - 2:50 PM</span>
          </div>
          <p>Non-stop • ${flightClass} • Meal included</p>
          <button class="book-btn" onclick="bookTicket('Global Airways', 'flight')">Book Now</button>
        </div>
        <div class="result-item">
          <div class="result-header">
            <h3>${from} to ${to}</h3>
            <div class="result-price">$210</div>
          </div>
          <div class="result-details">
            <span class="result-company">Oceanic Airlines</span>
            <span>5:20 PM - 7:40 PM</span>
          </div>
          <p>Non-stop • ${flightClass} • Entertainment system</p>
          <button class="book-btn" onclick="bookTicket('Oceanic Airlines', 'flight')">Book Now</button>
        </div>
        ${returnDate !== 'one-way' ? `
        <h3 style="margin-top: 2rem;">Return Flights (${to} to ${from})</h3>
        <div class="result-item">
          <div class="result-header">
            <h3>${to} to ${from}</h3>
            <div class="result-price">$175</div>
          </div>
          <div class="result-details">
            <span class="result-company">SkyWings Airlines</span>
            <span>10:00 AM - 12:15 PM</span>
          </div>
          <p>Non-stop • ${flightClass} • Free carry-on</p>
          <button class="book-btn" onclick="bookTicket('SkyWings Airlines', 'flight')">Book Now</button>
        </div>
        ` : ''}
      `;
    }

    function bookTicket(company, type) {
      alert(`Booking confirmed with ${company} for ${type === 'bus' ? 'bus travel' : 'flight'}! Thank you for choosing TravelEasy.`);
    }

    // Set default date to tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formattedDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('bus-date').value = formattedDate;
    document.getElementById('flight-depart').value = formattedDate;
    
    // Set return date to 3 days after departure
    const returnDate = new Date(tomorrow);
    returnDate.setDate(returnDate.getDate() + 3);
    document.getElementById('flight-return').value = returnDate.toISOString().split('T')[0];