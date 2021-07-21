import { useState } from 'react'

import { signIn, signOut, useSession, getCsrfToken } from 'next-auth/client'

const IndexPage = () => {
  const [session, loading] = useSession()
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupUsername, setSignupUsername] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  console.log(session)
  return (
    <>
      {!session && <>Not signed in</>}
      {session && (
        <>
          Signed in as {session.user.username} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
      <form
        onSubmit={e => {
          e.preventDefault()
          signIn('credentials', { username: loginUsername, password: loginPassword })
        }}
      >
        <input
          type="text"
          name="username"
          value={loginUsername}
          onChange={e => setLoginUsername(e.target.value)}
          placeholder="sven"
        />
        <input
          type="text"
          name="password"
          value={loginPassword}
          onChange={e => setLoginPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Log In</button>
      </form>
      <form
        onSubmit={async e => {
          e.preventDefault()
          const credentials = { username: signupUsername, password: signupPassword }
          await fetch('/api/auth/signup', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(credentials),
          })
          signIn('credentials', credentials)
        }}
        action=""
        method="post"
      >
        <input
          type="text"
          name="username"
          value={signupUsername}
          onChange={e => setSignupUsername(e.target.value)}
        />
        <input
          type="text"
          name="password"
          value={signupPassword}
          onChange={e => setSignupPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default IndexPage
