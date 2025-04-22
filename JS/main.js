document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.getElementById('events-container');
    const addEventBtn = document.getElementById('add-event-btn');
    const categoryFilter = document.getElementById('category-filter');
    const dateSort = document.getElementById('date-sort');
    
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    function renderEvents() {
        eventsContainer.innerHTML = '';
        
        let filteredEvents = [...events];
        if (categoryFilter.value !== 'all') {
            filteredEvents = filteredEvents.filter(event => event.category === categoryFilter.value);
        }
        
        filteredEvents.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            
            if (dateSort.value === 'newest') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Удаляем активный класс у всех вкладок
                tabs.forEach(t => t.classList.remove('active'));
                // Добавляем активный класс текущей вкладке
                this.classList.add('active');
                
                // Скрываем все контейнеры событий
                document.querySelectorAll('.category-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Показываем выбранный контейнер
                const category = this.dataset.category;
                document.getElementById(`${category}-events`).classList.add('active');
            });
        });
        
        filteredEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.dataset.id = event.id;
            
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            let categoryClass = '';
            let categoryName = '';
            
            switch(event.category) {
                case 'personal':
                    categoryClass = 'personal';
                    categoryName = 'Личное';
                    break;
                case 'work':
                    categoryClass = 'work';
                    categoryName = 'Работа';
                    break;
                case 'public':
                    categoryClass = 'public';
                    categoryName = 'Учёба';
                    break;
            }
            
            eventCard.innerHTML = `
                <h3 class="event-title">${event.title}</h3>
                <div class="event-date">${formattedDate}</div>
                <div class="event-category ${categoryClass}">${categoryName}</div>
                ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
            `;
            
            eventsContainer.appendChild(eventCard);
        });
        
        document.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', function() {
                const eventId = this.dataset.id;
                window.location.href = `edit-event.html?id=${eventId}`;
            });
        });
    }

    
    
    renderEvents();
    
    addEventBtn.addEventListener('click', function() {
        window.location.href = 'add-event.html';
    });
    
    categoryFilter.addEventListener('change', renderEvents);
    dateSort.addEventListener('change', renderEvents);
    
    window.addEventListener('storage', function(e) {
        if (e.key === 'events') {
            events = JSON.parse(e.newValue) || [];
            renderEvents();
        }
    });
});