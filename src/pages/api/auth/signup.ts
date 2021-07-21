import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../lib/db'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    db.push(req.body)
    console.log(db)
  }
  res.redirect('/')
}
