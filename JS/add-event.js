document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-event-form');
    const cancelBtn = document.getElementById('cancel-btn');
    
    // Загрузка событий из localStorage
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Создание нового события
        const newEvent = {
            id: Date.now().toString(),
            title: document.getElementById('event-title').value,
            date: document.getElementById('event-date').value,
            category: document.getElementById('event-category').value,
            description: document.getElementById('event-description').value
        };
        
        // Добавление события в массив
        events.push(newEvent);
        
        // Сохранение в localStorage
        localStorage.setItem('events', JSON.stringify(events));
        
        // Перенаправление на главную страницу
        window.location.href = 'index.html';
    });
    
    // Обработчик кнопки "Отмена"
    cancelBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});