import DashboardLayout from '../../components/layout/DashboardLayout'
import { Layout } from '../../components/layout/Layout'
import { ProfileForm } from '../../components/ProfileForm'
import { useSession } from '../../utils/hooks/useSession'

export default function ProfilePage() {
  const { session } = useSession()

  if (!session) return null

  console.log(session)

  return (
    // <Layout session={session}>
    //   <ProfileForm session={session} />
    // </Layout>
    <DashboardLayout session={session}>
      <ProfileForm session={session} />
    </DashboardLayout>
  )
}
