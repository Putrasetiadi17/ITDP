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
  const data = progres ? [
    { id: 0, value: progres.progress || 0, label: "Progress" },
  ] : [];

  // Filter data yang memiliki value lebih dari 0
  const filteredData = data.filter(item => item.value !== 0);

  // Hitung total nilai dari filteredData
  const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);

  return (
    <PieChart
      series={[
        {
          data: filteredData,
          innerRadius: 30,
          arcLabel: ({ value }) =>
            `${((value / totalValue) * 100).toFixed()}%`, // Label dalam bentuk persentase
        },
      ]}
      width={290}
      height={150} // Tinggi ditingkatkan agar label tidak saling menumpuk
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
