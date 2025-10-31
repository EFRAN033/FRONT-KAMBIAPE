<template>
    <div class="bg-slate-800 font-sans antialiased text-white flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div class="text-center p-8 max-w-2xl mx-auto">
        
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        
        <h1 class="text-4xl font-bold text-white tracking-tight sm:text-5xl mb-4">
          Sección en Mantenimiento
        </h1>
        <p class="text-slate-300 text-lg mb-8">
          Estamos trabajando para mejorar esta sección. Mientras tanto, ¡puedes jugar al gusanito!
        </p>
  
        <div class="bg-slate-900/70 p-4 rounded-lg shadow-2xl border border-slate-700 mx-auto" :style="{ width: `${boardSize * cellSize + 32}px` }">
          <div class="relative" :style="{ width: `${boardSize * cellSize}px`, height: `${boardSize * cellSize}px` }">
            <div v-if="gameOver" class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-md z-10 backdrop-blur-sm">
              <h3 class="text-3xl font-bold text-red-500">Juego Terminado</h3>
              <p class="text-lg text-slate-200 mt-2">Puntuación: {{ score }}</p>
              <button @click="startGame" class="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-slate-800">
                Jugar de Nuevo
              </button>
            </div>
            <div 
              class="grid border-slate-700"
              :style="{
                gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`,
                borderWidth: '1px'
              }"
            >
              <div 
                v-for="i in boardSize * boardSize" 
                :key="i"
                class="border-slate-800"
                :style="{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  borderRight: (i % boardSize !== 0) ? '1px solid #334155' : 'none',
                  borderBottom: (i <= (boardSize * (boardSize - 1))) ? '1px solid #334155' : 'none',
                }"
              ></div>
            </div>
            <div 
              v-for="(segment, index) in snake" 
              :key="index"
              class="absolute rounded-[3px] transition-all duration-75"
              :class="index === 0 ? 'bg-green-400' : 'bg-green-600'"
              :style="{ 
                left: `${segment.x * cellSize}px`, 
                top: `${segment.y * cellSize}px`, 
                width: `${cellSize}px`, 
                height: `${cellSize}px` 
              }"
            ></div>
            <div 
              class="absolute bg-red-500 rounded-full animate-pulse"
              :style="{ 
                left: `${food.x * cellSize}px`, 
                top: `${food.y * cellSize}px`, 
                width: `${cellSize}px`, 
                height: `${cellSize}px` 
              }"
            ></div>
          </div>
           <div class="mt-4 text-sm text-slate-400 text-left">
            <p><span class="font-bold">Controles:</span> Usa las <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Teclas de Flecha</kbd> o <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">W</kbd> <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">A</kbd> <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">S</kbd> <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">D</kbd> para moverte.</p>
            <p class="mt-1"><span class="font-bold">Puntuación:</span> {{ score }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const boardSize = 20;
  const cellSize = 20; // in pixels
  
  const snake = ref([]);
  const food = ref({});
  const direction = ref({ x: 1, y: 0 }); // Start moving right
  const gameOver = ref(false);
  const score = ref(0);
  const gameLoop = ref(null);
  
  const getRandomCoordinate = () => {
    return {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  };
  
  const placeFood = () => {
    let newFoodPosition;
    do {
      newFoodPosition = getRandomCoordinate();
    } while (snake.value.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
    food.value = newFoodPosition;
  };
  
  const startGame = () => {
    snake.value = [{ x: 10, y: 10 }];
    direction.value = { x: 1, y: 0 };
    placeFood();
    gameOver.value = false;
    score.value = 0;
    
    if (gameLoop.value) clearInterval(gameLoop.value);
    gameLoop.value = setInterval(moveSnake, 120);
  };
  
  const moveSnake = () => {
    if (gameOver.value) return;
  
    const head = { ...snake.value[0] };
    head.x += direction.value.x;
    head.y += direction.value.y;
  
    // Wall collision
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
      endGame();
      return;
    }
  
    // Self collision
    for (let i = 1; i < snake.value.length; i++) {
      if (head.x === snake.value[i].x && head.y === snake.value[i].y) {
        endGame();
        return;
      }
    }
  
    snake.value.unshift(head);
  
    // Food collision
    if (head.x === food.value.x && head.y === food.value.y) {
      score.value += 10;
      placeFood();
    } else {
      snake.value.pop();
    }
  };
  
  const endGame = () => {
    gameOver.value = true;
    if (gameLoop.value) clearInterval(gameLoop.value);
  };
  
  const changeDirection = (event) => {
    const { key } = event;
    const goingUp = direction.value.y === -1;
    const goingDown = direction.value.y === 1;
    const goingLeft = direction.value.x === -1;
    const goingRight = direction.value.x === 1;
  
    if ((key === 'ArrowUp' || key.toLowerCase() === 'w') && !goingDown) {
      direction.value = { x: 0, y: -1 };
    } else if ((key === 'ArrowDown' || key.toLowerCase() === 's') && !goingUp) {
      direction.value = { x: 0, y: 1 };
    } else if ((key === 'ArrowLeft' || key.toLowerCase() === 'a') && !goingRight) {
      direction.value = { x: -1, y: 0 };
    } else if ((key === 'ArrowRight' || key.toLowerCase() === 'd') && !goingLeft) {
      direction.value = { x: 1, y: 0 };
    }
  };
  
  onMounted(() => {
    startGame();
    window.addEventListener('keydown', changeDirection);
  });
  
  onUnmounted(() => {
    if (gameLoop.value) clearInterval(gameLoop.value);
    window.removeEventListener('keydown', changeDirection);
  });
  </script>