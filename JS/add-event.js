document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-event-form');
    const cancelBtn = document.getElementById('cancel-btn');
    
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newEvent = {
            id: Date.now().toString(),
            title: document.getElementById('event-title').value,
            date: document.getElementById('event-date').value,
            category: document.getElementById('event-category').value,
            description: document.getElementById('event-description').value
        };
        
        events.push(newEvent);
        
        localStorage.setItem('events', JSON.stringify(events));
        
        window.location.href = 'index.html';
    });
    
    cancelBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});