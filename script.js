document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('grid');
    const resetBtn = document.getElementById('reset-btn');
    const sizeSlider = document.getElementById('grid-size');
    const sizeValue = document.getElementById('size-value');
    
    let currentSize = 20;
    
    // Crear malla inicial
    createGrid(currentSize);
    
    // Evento para cambiar tamaño
    sizeSlider.addEventListener('input', function() {
        currentSize = this.value;
        sizeValue.textContent = `${currentSize}x${currentSize}`;
        createGrid(currentSize);
    });
    
    // Botón de reinicio
    resetBtn.addEventListener('click', function() {
        createGrid(currentSize);
    });
    
    // Función para crear/recrear la malla
    function createGrid(size) {
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        
        for (let i = 0; i < size * size; i++) {
            const item = document.createElement('div');
            item.className = 'grid-item';
            
            item.addEventListener('mouseover', function() {
                if (isMouseDown) {
                    this.style.backgroundColor = getRandomColor();
                }
            });
            
            item.addEventListener('mousedown', function() {
                this.style.backgroundColor = getRandomColor();
            });
            
            grid.appendChild(item);
        }
    }
    
    // Control para dibujar mientras se mantiene el clic
    let isMouseDown = false;
    document.addEventListener('mousedown', () => isMouseDown = true);
    document.addEventListener('mouseup', () => isMouseDown = false);
    
    // Generador de colores aleatorios
    function getRandomColor() {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }
});
