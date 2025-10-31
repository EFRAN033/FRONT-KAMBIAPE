<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-3xl font-bold text-slate-800">Dashboard de Administración</h1>
      <div class="flex items-center gap-2 mt-4 md:mt-0 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
        <input type="date" v-model="startDate" class="border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
        <span class="text-slate-500 font-semibold">a</span>
        <input type="date" v-model="endDate" class="border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
      </div>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in kpiStats" :key="stat.label" class="flex items-start p-5 bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg">
        <div :class="stat.iconBg" class="p-3 mr-4 rounded-lg">
          <component :is="stat.icon" class="w-7 h-7" />
        </div>
        <div>
          <p class="text-base font-medium text-slate-600">{{ stat.label }}</p>
          <p class="text-3xl font-bold text-slate-800 mt-1">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8 bg-white rounded-xl shadow-md">
      <div class="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-800">Análisis de Crecimiento</h2>
          <p class="text-sm text-slate-500">{{ activeMetricObject.name }} - Agrupado por {{ activePeriodObject.name.toLowerCase() }}</p>
        </div>
        
        <div class="flex items-center bg-slate-100 p-1 rounded-lg">
          <button
            v-for="period in periods"
            :key="period.key"
            @click="activePeriod = period.key"
            :class="[
              activePeriod === period.key
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'bg-transparent text-slate-600 hover:bg-white/60',
              'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200'
            ]"
          >
            {{ period.name }}
          </button>
        </div>
      </div>

      <div class="p-4 sm:p-6">
        <div class="border-b border-slate-200">
          <nav class="-mb-px flex space-x-6 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
            <button
              v-for="metric in metrics"
              :key="metric.key"
              @click="activeMetric = metric.key"
              :class="[
                activeMetric === metric.key
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
                'whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors'
              ]"
            >
              {{ metric.name }}
            </button>
          </nav>
        </div>

        <div class="mt-6 relative h-96">
          <div v-if="isLoadingChart" class="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-lg backdrop-blur-sm">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
          
          <div v-if="!isLoadingChart && (!chartData.labels || chartData.labels.length === 0)" class="absolute inset-0 flex flex-col items-center justify-center text-slate-500 z-10">
            <svg class="w-16 h-16 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>
            <h3 class="text-lg font-semibold">No hay datos para el rango seleccionado</h3>
            <p class="text-sm">Prueba a seleccionar un período de tiempo diferente.</p>
          </div>
          
          <Line v-if="!isLoadingChart && chartData.labels && chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, shallowRef } from 'vue';
import axios from '@/axios';
import { UserGroupIcon, ArchiveBoxIcon, ArrowPathRoundedSquareIcon, BanknotesIcon } from '@heroicons/vue/24/outline';

import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

// --- Lógica para Rango de Fechas ---
const formatDate = (date) => date.toISOString().split('T')[0];

const today = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);

const startDate = ref(formatDate(thirtyDaysAgo));
const endDate = ref(formatDate(today));


// --- Lógica para las Tarjetas de Estadísticas (KPIs) ---
const kpiStats = ref([
  { label: 'Nuevos Usuarios', value: 0, icon: shallowRef(UserGroupIcon), iconBg: 'bg-indigo-100 text-indigo-600' },
  { label: 'Productos Publicados', value: 0, icon: shallowRef(ArchiveBoxIcon), iconBg: 'bg-teal-100 text-teal-600' },
  { label: 'Intercambios Exitosos', value: 0, icon: shallowRef(ArrowPathRoundedSquareIcon), iconBg: 'bg-sky-100 text-sky-600' },
  { label: 'Ingresos (S/)', value: '0.00', icon: shallowRef(BanknotesIcon), iconBg: 'bg-amber-100 text-amber-600' }
]);

const fetchKPIs = async () => {
  try {
    const { data } = await axios.get('/admin/stats/kpis', {
      params: {
        start_date: startDate.value,
        end_date: endDate.value
      }
    });
    kpiStats.value[0].value = data.total_users || 0;
    kpiStats.value[1].value = data.total_products || 0;
    kpiStats.value[2].value = data.completed_exchanges || 0;
    kpiStats.value[3].value = (data.total_revenue || 0).toFixed(2);
  } catch (error) {
    console.error("Error al cargar KPIs:", error);
    kpiStats.value.forEach(stat => stat.value = stat.label.includes('S/') ? '0.00' : 0);
  }
};


// --- Lógica para el Gráfico ---
const chartData = ref({ labels: [], datasets: [] });
const isLoadingChart = ref(true);

const metrics = ref([
  { key: 'users', name: 'Usuarios', label: 'Nuevos Usuarios' },
  { key: 'products', name: 'Productos', label: 'Nuevos Productos' },
  { key: 'proposals', name: 'Intercambios', label: 'Intercambios Completados' },
  { key: 'transactions', name: 'Ingresos', label: 'Ventas Aprobadas' }
]);
const activeMetric = ref('users');

const periods = ref([
  { key: 'daily', name: 'Diario' },
  { key: 'weekly', name: 'Semanal' },
  { key: 'monthly', name: 'Mensual' },
]);
const activePeriod = ref('monthly');

const activeMetricObject = computed(() => metrics.value.find(m => m.key === activeMetric.value) || {});
const activePeriodObject = computed(() => periods.value.find(p => p.key === activePeriod.value) || {});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { intersect: false, mode: 'index' },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: '#e2e8f0', borderDash: [5, 5] } },
    x: { grid: { display: false } }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: '#fff',
      titleColor: '#1e293b',
      bodyColor: '#475569',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      padding: 10,
      displayColors: true,
      boxPadding: 4,
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.parsed.y}`
      }
    }
  },
  elements: { line: { tension: 0.4 }, point: { radius: 4, hoverRadius: 7, backgroundColor: '#fff', hoverBorderWidth: 3 } }
}));

// Nueva función para convertir número de semana a un rango de fechas legible
const getDateRangeFromWeek = (year, weekNumber) => {
  // Creamos una fecha para el inicio del año y le sumamos las semanas.
  const d = new Date(Date.UTC(year, 0, 1 + (weekNumber - 1) * 7));
  const day = d.getUTCDay(); // 0 = Domingo, 1 = Lunes
  // Ajustamos para que la semana empiece en Lunes
  const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setUTCDate(diff));
  
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  const format = (date) => date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

  // Devuelve un formato como "13 Oct - 19 Oct"
  return `${format(monday)} - ${format(sunday)}`;
};


const formatChartLabels = (labels, period) => {
  if (!labels) return [];
  const options = { timeZone: 'UTC' }; // Usar UTC para evitar problemas de zona horaria

  if (period === 'monthly') return labels.map(label => {
      const [year, month] = label.split('-');
      return new Date(Date.UTC(year, month - 1)).toLocaleDateString('es-ES', { month: 'long', year: 'numeric', ...options });
  });

  // Lógica mejorada para la vista semanal
  if (period === 'weekly') {
    return labels.map(label => {
      const [year, week] = label.split('-');
      return getDateRangeFromWeek(parseInt(year), parseInt(week));
    });
  }
  
  if (period === 'daily') return labels.map(label => new Date(label + 'T00:00:00Z').toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', ...options }));
  
  return labels;
};


const fetchChartData = async () => {
  if (!activeMetric.value) return;
  isLoadingChart.value = true;
  try {
    const { data } = await axios.get('/admin/chart-data', {
      params: {
        metric: activeMetric.value,
        period: activePeriod.value,
        start_date: startDate.value,
        end_date: endDate.value,
      }
    });

    if (data.datasets && data.datasets.length > 0) {
      const dataset = data.datasets[0];
      const chartContext = document.createElement('canvas').getContext('2d');
      const gradient = chartContext.createLinearGradient(0, 0, 0, 350);
      const borderColor = dataset.borderColor || 'rgba(79, 70, 229, 1)';
      const gradientColor = borderColor.replace(/, 1\)$/, ', 0.5)');
      
      gradient.addColorStop(0, gradientColor);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      chartData.value = {
        labels: formatChartLabels(data.labels, activePeriod.value),
        datasets: [{
          ...dataset,
          label: activeMetricObject.value.label,
          backgroundColor: gradient,
          borderColor: borderColor,
          pointBorderColor: borderColor,
          fill: true,
        }]
      };
    } else {
      chartData.value = { labels: [], datasets: [] };
    }
  } catch (error) {
    console.error("Error al cargar datos del gráfico:", error);
    chartData.value = { labels: [], datasets: [] };
  } finally {
    isLoadingChart.value = false;
  }
};

// --- Ciclo de vida y Watchers ---
onMounted(() => {
  fetchKPIs();
  fetchChartData();
});

// Vuelve a cargar los datos si cambia cualquier filtro
watch([startDate, endDate, activeMetric, activePeriod], () => {
    fetchKPIs();
    fetchChartData();
}, { deep: true });
</script>

<style>
/* Para mejorar la apariencia de los inputs de fecha en navegadores basados en WebKit */
input[type="date"]::-webkit-calendar-picker-indicator {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%234B5563" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>') no-repeat;
    cursor: pointer;
    opacity: 0.7;
}
input[type="date"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
}
</style>