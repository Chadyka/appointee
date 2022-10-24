import DashboardLayout from '../../components/layout/DashboardLayout'
import { useSession } from '../../utils/hooks/useSession'

export default function Dashboard() {
  const { session } = useSession()

  return <DashboardLayout session={session}></DashboardLayout>
}
