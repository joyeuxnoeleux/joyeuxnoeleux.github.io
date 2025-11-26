   // Windows controls
   function openWindow(id) {
    toggleStart()
    let w = document.getElementById(id);
    w.style.display = 'block';
    document.querySelectorAll('.window').forEach(el => el.style.zIndex = 8);
    w.style.zIndex = 12;
    if (!w.style.left) {
        w.style.top = (100 + Math.random() * 120) + 'px';
        w.style.left = (120 + Math.random() * 120) + 'px';
    }

    // Spécial Paint : redimensionner le canvas et redraw
    if (id === 'paint') {
        setTimeout(() => {
            resizeCanvas();  // redimensionne le canvas correctement
            redraw();        // redraw les chemins (même s'il n'y a pas encore de dessin)
        }, 50);
    }

    // Spécial Map
    if (id === 'map') {
        setTimeout(() => {
            if (!window.leafletMap) initLeaflet();
            window.leafletMap.invalidateSize();
        }, 200);
    }


}

function closeWindow(id) { document.getElementById(id).style.display = 'none'; if (id === 'map') document.getElementById('mapControls').style.display = 'none'; }

        // Dragging windows
        let dragData = null;
        function dragStart(e, id) {
            const w = document.getElementById(id);
            // ensure it's on top
            document.querySelectorAll('.window').forEach(el => el.style.zIndex = 8);
            w.style.zIndex = 14;
            dragData = { w, offX: e.clientX - w.offsetLeft, offY: e.clientY - w.offsetTop };
            document.onmousemove = dragMove; document.onmouseup = dragEnd;
        }
        function dragMove(e) { if (!dragData) return; dragData.w.style.left = (e.clientX - dragData.offX) + 'px'; dragData.w.style.top = (e.clientY - dragData.offY) + 'px'; }
        function dragEnd() { dragData = null; document.onmousemove = null; document.onmouseup = null; }
