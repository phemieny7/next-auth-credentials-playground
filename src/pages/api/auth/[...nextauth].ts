import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import db from '../../../lib/db'

console.log(process.env.HELLO)
console.log(process.env.NEXTAUTH_URL)

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize({ username, password }) {
        const foundUser = db.find(x => x.username === username && x.password === password)
        if (foundUser) {
          // Any object returned will be saved in `user` property of the JWT
          return { username }
        }
        return null
      },
    }),
  ],
  callbacks: {
    signIn: (user, account) => {
      console.log('===== signIn =====')
      console.log('user', user)
      console.log('account', account)
      //   if (account.id === 'credentials' && user.token) {
      //     const result = await apollo.query({
      //       query: Queries.currentUser,
      //       fetchPolicy: 'no-cache',
      //       context: {
      //         token: user.token,
      //       },
      //     })
      //     if (result && result.data && result.data.currentUser) {
      //       // eslint-disable-next-line
      //       user.profile = result.data.currentUser.profile
      //       // eslint-disable-next-line
      //       user.roles = result.data.currentUser.roles
      //     }
      //     return true
      //   }
      return true
    },
    jwt: (token, user) => {
      console.log('===== jwt =====')
      console.log('DB', db)
      console.log('token', token)
      console.log('user', user)
      if (user) {
        token = {
          accessToken: user.token,
          user: { username: user.username },
        }
      }
      return token
    },
    session: (session, token) => {
      console.log('===== session =====')
      console.log('session', session)
      console.log('token', token)
      return { user: token.user }
    },
  },
})
