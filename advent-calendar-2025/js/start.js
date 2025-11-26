
        // Clock
        function updateClock() { document.getElementById('clock').textContent = new Date().toLocaleTimeString(); }
        setInterval(updateClock, 1000); updateClock();

        // Start menu
        function toggleStart() { document.getElementById('startMenu').classList.toggle('open'); }


        // Close start menu when clicking outside
        document.addEventListener('click', (e) => {
            const sm = document.getElementById('startMenu');
            const start = document.querySelector('.start');
            if (!sm.contains(e.target) && !start.contains(e.target)) sm.classList.remove('open');
        });