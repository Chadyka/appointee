import DashboardLayout from '../../components/layout/DashboardLayout'
import { useSession } from '../../utils/hooks/useSession'

export default function Services() {
  const { session } = useSession()

  return <DashboardLayout session={session}>Services</DashboardLayout>
}
