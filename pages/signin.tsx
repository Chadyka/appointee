import Router from 'next/router'
import { useEffect } from 'react'
import { Layout } from '../components/layout/Layout'
import { SigninForm } from '../components/SigninForm'
import { useSession } from '../utils/hooks/useSession'

export default function SigninPage() {
  const { session } = useSession()

  useEffect(() => {
    if (session) {
      Router.push('/')
    }
  })

  if (session) return null

  return (
    <Layout session={session}>
      <div className="flex h-[60vh] w-full items-center justify-center">
        <SigninForm />
      </div>
    </Layout>
  )
}
