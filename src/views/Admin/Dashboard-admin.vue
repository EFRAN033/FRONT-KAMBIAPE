<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Dashboard de Administración</h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-500">Usuarios Totales</h3>
        <p class="text-4xl font-bold text-indigo-600">{{ stats.users }}</p>
      </div>
      
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-500">Productos Publicados</h3>
        <p class="text-4xl font-bold text-teal-600">{{ stats.products }}</p>
      </div>

      <div class="p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-500">Propuestas Creadas</h3>
        <p class="text-4xl font-bold text-sky-600">{{ stats.proposals }}</p>
      </div>
      
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-500">Reportes Recibidos</h3>
        <p class="text-4xl font-bold text-red-600">{{ stats.reports }}</p>
      </div>

      <div class="p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-500">Ventas Aprobadas</h3>
        <p class="text-4xl font-bold text-green-600">{{ stats.transactions }}</p>
      </div>
    </div>

    <div class="mt-12 bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">Análisis de Crecimiento</h2>
      
      <div class="mb-4 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            v-for="metric in metrics"
            :key="metric.key"
            @click="activeMetric = metric.key"
            :class="[
              activeMetric === metric.key
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ metric.name }}
          </button>
        </nav>
      </div>

      <div class="mb-4 flex justify-end space-x-2">
        <button
          v-for="period in periods"
          :key="period.key"
          @click="activePeriod = period.key"
          :class="[
            activePeriod === period.key
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            'px-3 py-1 rounded-md text-sm font-medium transition-colors'
          ]"
        >
          {{ period.name }}
        </button>
      </div>

      <div class="relative h-96">
        <div v-if="isLoadingChart" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <p>Cargando gráfico...</p>
        </div>
        <Line v-if="chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
        <div v-else-if="!isLoadingChart" class="absolute inset-0 flex items-center justify-center">
          <p>No hay datos para mostrar en este período.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from '@/axios'; // Asegúrate que este axios tiene la baseURL y el token configurado

// --- Importaciones de Chart.js ---
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js';

// --- Registrar componentes de Chart.js ---
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

// --- 1. Lógica para las Tarjetas de Estadísticas (Igual que antes) ---
const stats = ref({
  users: 0,
  products: 0,
  reports: 0,
  proposals: 0,
  transactions: 0
});

const fetchStats = async () => {
  try {
    const response = await axios.get('/admin/stats');
    stats.value.users = response.data.total_users;
    stats.value.products = response.data.total_products;
    stats.value.reports = response.data.total_reports;
    stats.value.proposals = response.data.total_proposals;
    stats.value.transactions = response.data.total_transactions;
  } catch (error) {
    console.error("Error al cargar estadísticas:", error);
  }
};

// --- 2. Lógica para el Gráfico (NUEVO) ---

// Opciones de configuración del gráfico
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0 // Asegura que no haya decimales en el eje Y (ej. 1.5 usuarios)
      }
    }
  }
});

// Datos del gráfico (se llenarán desde la API)
const chartData = ref({
  labels: [],
  datasets: []
});

const isLoadingChart = ref(true);

// --- Controles del gráfico ---
const metrics = ref([
  { key: 'users', name: 'Cuentas Creadas' },
  { key: 'products', name: 'Publicaciones' },
  { key: 'proposals', name: 'Propuestas Completadas' },
  { key: 'transactions', name: 'Ventas Aprobadas' }
]);
const activeMetric = ref('users'); // Métrica por defecto

const periods = ref([
  { key: 'daily', name: 'Diario' },
  { key: 'weekly', name: 'Semanal' },
  { key: 'monthly', name: 'Mensual' },
  { key: 'yearly', name: 'Anual' }
]);
const activePeriod = ref('monthly'); // Período por defecto

// --- Función para cargar datos del gráfico ---
const fetchChartData = async () => {
  isLoadingChart.value = true;
  try {
    const response = await axios.get('/admin/chart-data', {
      params: {
        metric: activeMetric.value,
        period: activePeriod.value,
      }
    });
    // La API ya nos da la estructura exacta que Chart.js necesita
    chartData.value = response.data;
  } catch (error) {
    console.error("Error al cargar datos del gráfico:", error);
    chartData.value = { labels: [], datasets: [] }; // Limpiar en caso de error
  } finally {
    isLoadingChart.value = false;
  }
};

// --- Carga inicial y Observadores ---

onMounted(() => {
  fetchStats();     // Carga las tarjetas
  fetchChartData(); // Carga el gráfico
});

// Observa cambios en los filtros y vuelve a cargar el gráfico
watch([activeMetric, activePeriod], () => {
  fetchChartData();
});
</script>

<style scoped>
/* Estilos adicionales si fueran necesarios */
</style>