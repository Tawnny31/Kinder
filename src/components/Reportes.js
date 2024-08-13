import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import './Reportes.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reportes = () => {
  const navigate = useNavigate();
  
  const dataIngresosMensuales = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Ingresos Mensuales',
        data: [400, 450, 300, 500, 600, 700, 650, 800, 750, 900, 950, 1000],
        borderColor: '#48C9B0',
        backgroundColor: 'rgba(72, 201, 176, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const dataGastosAnuales = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Gastos Anuales',
        data: [300, 400, 250, 450, 550, 650, 600, 700, 650, 800, 850, 900],
        borderColor: '#A569BD',
        backgroundColor: 'rgba(165, 105, 189, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const dataCrecimientoCentro = {
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Crecimiento del Centro',
        data: [200, 300, 400, 500],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colores personalizados
      },
    ],
  };

  const handleExport = () => {
    // Aquí iría el código para exportar a Excel
  };

  const handleCancel = () => {
    navigate('/main'); // Redirige al main
  };

  return (
    <div className="reportes-container">
      <h1>Reportes</h1>
      <div className="charts-grid">
        <div className="chart">
          <h2>Ingresos Mensuales</h2>
          <Line data={dataIngresosMensuales} />
        </div>
        <div className="chart">
          <h2>Gastos Anuales</h2>
          <Bar data={dataGastosAnuales} />
        </div>
        <div className="chart">
          <h2>Crecimiento del Centro</h2>
          <Pie data={dataCrecimientoCentro} />
        </div>
      </div>
      <div className="buttons-container">
        <button onClick={handleExport} className="export-button">Exportar a Excel</button>
        <button onClick={handleCancel} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};

export default Reportes;
