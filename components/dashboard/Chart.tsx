import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Booking } from '../../types/database/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Booking value this year',
    },
  },
}

export function Analytics({ bookings }: { bookings: Booking[] }) {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const data = {
    labels,
    datasets: [
      {
        label: 'Order value',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(63 63 70)',
        backgroundColor: 'rgb(63 63 70)',
      },
    ],
  }

  bookings.forEach((booking) => {
    const bookingDate = new Date(booking.starts_at!)
    data.datasets[0].data[bookingDate.getMonth()] += booking.price!
  })
  return <Line options={options} data={data} width={'100%'} />
}
