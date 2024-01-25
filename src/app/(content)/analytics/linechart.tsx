"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

interface UserClickData {
  countData: {
    count: number;
  };
}

export default function ChartComponent() {
  const [userClicks, setUserClicks] = useState<UserClickData | undefined>();
  const { data: session } = useSession();
  const userId = session?.user.id;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/routes/getClickCount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const userClickData = await response.json();
      setUserClicks(userClickData);
    };
    fetchData();
  }, [userId]);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const timeStamp = Date.now();
  const currentDate = new Date(timeStamp);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = currentDate.getMonth() + 1;
  const monthsUpToCurrent = monthNames.slice(0, currentMonth);
  const labels = [0, monthsUpToCurrent];
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Clicks",
        data: [0, userClicks?.countData?.count],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  console.log(userClicks);
  return <Line data={data} options={options} />;
}
