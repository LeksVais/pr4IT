document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('edit-event-form');
    const deleteBtn = document.getElementById('delete-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    
    // Получение ID события из URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
    // Загрузка событий из localStorage
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    // Поиск события по ID
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        window.location.href = 'index.html';
        return;
    }
    
    // Заполнение формы данными события
    document.getElementById('event-id').value = event.id;
    document.getElementById('event-title').value = event.title;
    document.getElementById('event-date').value = event.date;
    document.getElementById('event-category').value = event.category;
    document.getElementById('event-description').value = event.description || '';
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Обновление события
        const updatedEvent = {
            id: eventId,
            title: document.getElementById('event-title').value,
            date: document.getElementById('event-date').value,
            category: document.getElementById('event-category').value,
            description: document.getElementById('event-description').value
        };
        
        // Обновление массива событий
        const eventIndex = events.findIndex(e => e.id === eventId);
        if (eventIndex !== -1) {
            events[eventIndex] = updatedEvent;
        }
        
        // Сохранение в localStorage
        localStorage.setItem('events', JSON.stringify(events));
        
        // Перенаправление на главную страницу
        window.location.href = 'index.html';
    });
    
    // Обработчик кнопки удаления
    deleteBtn.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите удалить это событие?')) {
            // Удаление события из массива
            events = events.filter(e => e.id !== eventId);
            
            // Сохранение в localStorage
            localStorage.setItem('events', JSON.stringify(events));
            
            // Перенаправление на главную страницу
            window.location.href = 'index.html';
        }
    });
    
    // Обработчик кнопки "Отмена"
    cancelBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});