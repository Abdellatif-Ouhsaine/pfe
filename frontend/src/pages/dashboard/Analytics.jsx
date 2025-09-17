import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Header from '../../components/dashboard/Header';

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/analytics')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données analytiques", error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <h2>Analyse des Commandes et Réservations par Semaine</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="semaine" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="commandes" stroke="#8884d8" name="Commandes (MAD)" />
          <Line type="monotone" dataKey="reservations" stroke="#82ca9d" name="Réservations" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
