// events.js (../api/events)

// Function to create a new event
export const createCourses = async (coursetData) => {
    try {
      const response = await fetch('http://localhost:5050/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coursetData),
      });
  
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
  
      const createdEvent = await response.json();
      return createdEvent;
    } catch (error) {
      throw new Error(`Error creating event: ${error.message}`);
    }
  };
  

  // events.js (../api/events)

// Function to fetch all events
export const getCourses = async () => {
  try {
    const response = await fetch('http://localhost:5050/courses');

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const events = await response.json();
    return events;
  } catch (error) {
    throw new Error(`Error fetching events: ${error.message}`);
  }
};
// events.js (../api/events)

// Function to delete an event
export const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`http://localhost:5050/courses/${eventId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const deletedEvent = await response.json();
    return deletedEvent;
  } catch (error) {
    throw new Error(`Error deleting event: ${error.message}`);
  }
};
// events.js (../api/events)

// Function to update an event
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await fetch(`http://localhost:5050/courses/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const updatedEvent = await response.json();
    return updatedEvent;
  } catch (error) {
    throw new Error(`Error updating event: ${error.message}`);
  }
};
