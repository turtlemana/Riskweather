import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ticker } = req.query
  const fetchAddress = `https://riskweather.org/rapi/interest?ticker=${ticker}`
  
  const response = await fetch(fetchAddress)
  const result = await response.json()

  res.status(200).json(result)
}