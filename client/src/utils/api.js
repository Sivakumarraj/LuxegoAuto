const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Handle API responses
const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        
        if (!response.ok) {
            // If the server responded with an error message, use it
            if (data.message) {
                throw new Error(data.message);
            } else {
                // Otherwise use a generic error message
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        
        return data;
    } else {
        // If the response is not JSON, throw an error
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};

// Submit booking form
export const submitBooking = async (bookingData) => {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Error submitting booking:', error);
        throw error;
    }
};

// Get all reviews
export const getReviews = async () => {
    try {
        const response = await fetch(`${API_URL}/reviews`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

// Submit a new review
export const submitReview = async (reviewData) => {
    try {
        const response = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
};

// Get service packages
export const getPackages = async () => {
    try {
        const response = await fetch(`${API_URL}/packages`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching packages:', error);
        throw error;
    }
};

// Contact form submission
export const submitContact = async (contactData) => {
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Error submitting contact:', error);
        throw error;
    }
};