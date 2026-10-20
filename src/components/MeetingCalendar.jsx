import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MeetingCalendar.css';

export default function MeetingCalendar() {
  const [date, setDate] = useState(new Date());
  const [meetings, setMeetings] = useState([
    { date: '2026-10-25', title: 'Investor Pitch - TechCorp', time: '02:00 PM' }
  ]);
  const [timeSlot, setTimeSlot] = useState('10:00 AM');

  // Handle booking a meeting slot
  const handleBookMeeting = () => {
    const formattedDate = date.toISOString().split('T')[0];
    const newMeeting = {
      date: formattedDate,
      title: 'New Collaboration Meeting',
      time: timeSlot
    };
    setMeetings([...meetings, newMeeting]);
    alert(`Meeting successfully requested for ${formattedDate} at ${timeSlot}!`);
  };

  return (
    <div className="calendar-dashboard-container">
      <h2>📅 Nexus Meeting Scheduler</h2>
      <p>Schedule and manage your investor-entrepreneur collaboration slots.</p>

      <div className="calendar-grid">
        {/* Calendar Picker UI */}
        <div className="calendar-box">
          <Calendar onChange={setDate} value={date} />
          <p className="selected-date-text">
            Selected Date: <strong>{date.toDateString()}</strong>
          </p>
        </div>

        {/* Meeting Request Form */}
        <div className="meeting-form-box">
          <h3>Request a Time Slot</h3>
          <label>Select Time:</label>
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="time-select">
            <option value="10:00 AM">10:00 AM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="04:30 PM">04:30 PM</option>
          </select>

          <button onClick={handleBookMeeting} className="book-btn">Confirm Meeting Request</button>
        </div>
      </div>

      {/* Confirmed Meetings Dashboard Section */}
      <div className="confirmed-meetings-section">
        <h3>Confirmed Meetings Dashboard</h3>
        {meetings.length === 0 ? (
          <p>No confirmed meetings yet.</p>
        ) : (
          <ul className="meetings-list">
            {meetings.map((meeting, index) => (
              <li key={index} className="meeting-item">
                <span>📌 <strong>{meeting.title}</strong></span>
                <span>📅 {meeting.date} at 🕒 {meeting.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}