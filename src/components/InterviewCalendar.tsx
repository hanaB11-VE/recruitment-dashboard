import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import type { Event } from 'react-big-calendar'; 
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// STEP 1: Set up localization using Moment
const localizer = momentLocalizer(moment);

// STEP 2: Define the type of event we're using
interface InterviewEvent extends Event {
  title: string;
  start: Date;
  end: Date;
}

// STEP 3: Main Component
const InterviewCalendar: React.FC = () => {
  // List of all interviews (state)
  const [events, setEvents] = useState<InterviewEvent[]>([]);

  // Function to add a new interview
  const handleAddEvent = () => {
    const candidate = prompt('Enter Candidate Name:');
    const role = prompt('Enter Job Role:');
    const interviewer = prompt('Enter Interviewer Name:');

    // Set time: current time + 30 mins
    const start = new Date();
    const end = new Date(start.getTime() + 30 * 60000);

    // Create new event
    const newEvent: InterviewEvent = {
      title: `${candidate} - ${role} (with ${interviewer})`,
      start,
      end,
    };

    // Update the state with new event
    setEvents([...events, newEvent]);
  };

  // Render the calendar and button
  return (
    <div style={{ margin: '20px', border:'15px',borderBlockColor:'black' }}>
      <button onClick={handleAddEvent}>Add Interview</button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default InterviewCalendar;
