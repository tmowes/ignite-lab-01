import { GetServerSideProps } from 'next'

import { getSession } from '@auth0/nextjs-auth0'

export default function Home() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res)

  // const token = getAccessToken(req, res)
  // console.log(token)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    }
  }

  return {
    redirect: {
      destination: '/app',
      permanent: false,
    },
  }
}
