import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useProgressAccountMaintenance } from "@/hooks/useProgressAccountMaintenance";

interface PieChartComponent {
  className?: string;
}

export default function PieChartComponentAccountMaintenance(props: PieChartComponent) {
  // Mendapatkan data dari hook
  const { progres, loading, error } = useProgressAccountMaintenance();

  // Pastikan progres ada sebelum mengaksesnya
  const data = progres
    ? [
        { id: 0, value: progres.progress || 0, label: "Progress" },
        { id: 1, value: 100 - (progres.progress || 0), label: "Remaining" }, // Tambahkan sisa progress
      ]
    : [];

  // Filter data yang memiliki value lebih dari 0
  const filteredData = data.filter((item) => item.value !== 0);

  // Hitung total nilai dari filteredData
  const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);

  return (
    <PieChart
      series={[
        {
          data: filteredData,
          innerRadius: 30, // Sesuaikan untuk memberikan ruang bagi label
          outerRadius: 80, // Perbesar outer radius agar label bisa terlihat
          arcLabel: ({ value, label }) =>
            `${label}: ${((value / totalValue) * 100).toFixed()}%`, // Label dalam bentuk persentase dengan nama
        },
      ]}
      width={290}
      height={200} // Perbesar tinggi agar label tidak menumpuk
      margin={{ left: -24 }}
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: 12,
          },
        },
      }}
    />
  );
}
