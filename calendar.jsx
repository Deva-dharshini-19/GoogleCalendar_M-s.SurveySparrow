import React, { useState } from 'react';
import dayjs from 'dayjs';
import eventsData from '../data/events.json';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const days = [];
  let day = startDate;

  while (day.isBefore(endDate)) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const handlePrev = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNext = () => setCurrentDate(currentDate.add(1, 'month'));

  const eventsOnDate = (date) =>
    eventsData.filter((event) => event.date === date.format('YYYY-MM-DD'));

  return (
    <div>
      <h2>{currentDate.format('MMMM YYYY')}</h2>
      <button onClick={handlePrev}>←</button>
      <button onClick={handleNext}>→</button>
      <div className="calendar-grid">
        {days.map((day, i) => {
          const isToday = day.isSame(dayjs(), 'day');
          const events = eventsOnDate(day);

          return (
            <div key={i} className={`day ${isToday ? 'today' : ''}`}>
              <div>{day.format('D')}</div>
              {events.map((event, idx) => (
                <div key={idx} className="event" title={`${event.title} at ${event.time}`}>
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;


