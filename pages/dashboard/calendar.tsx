import DashboardLayout from '../../components/layout/DashboardLayout'
import { useSession } from '../../utils/hooks/useSession'

export default function Calendar() {
  const { session } = useSession()

  return (
    <DashboardLayout session={session}>
      <div className="h-full w-full bg-red-300">Calendar</div>
    </DashboardLayout>
  )
}
