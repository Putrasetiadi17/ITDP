import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useProgress } from "@/hooks/useProgress";

interface PieChartComponent {
  className?: string;
}

export default function PieChartComponent(props: PieChartComponent) {

  const {
    progres, loading, error
  } = useProgress()
  
  const data = [
    { id: 0, value: progres?.tahap_pengingat || 0, label: "Tahap Pengingat" },
    { id: 1, value: progres?.tahap_penagihan || 0, label: "Tahap Penagihan" },
    { id: 2, value: progres?.closing || 0, label: "Closing" },
    { id: 3, value: progres?.tidak_bayar || 0, label: "Tidak Bayar"}
  ];

  // Hitung total nilai
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 24,
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
