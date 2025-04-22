document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('edit-event-form');
    const deleteBtn = document.getElementById('delete-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('event-id').value = event.id;
    document.getElementById('event-title').value = event.title;
    document.getElementById('event-date').value = event.date;
    document.getElementById('event-category').value = event.category;
    document.getElementById('event-description').value = event.description || '';
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const updatedEvent = {
            id: eventId,
            title: document.getElementById('event-title').value,
            date: document.getElementById('event-date').value,
            category: document.getElementById('event-category').value,
            description: document.getElementById('event-description').value
        };
        
        const eventIndex = events.findIndex(e => e.id === eventId);
        if (eventIndex !== -1) {
            events[eventIndex] = updatedEvent;
        }
        
        localStorage.setItem('events', JSON.stringify(events));
        
        window.location.href = 'index.html';
    });
    
    deleteBtn.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите удалить это событие?')) {
            events = events.filter(e => e.id !== eventId);
            
            localStorage.setItem('events', JSON.stringify(events));
            
            window.location.href = 'index.html';
        }
    });
    
    cancelBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});