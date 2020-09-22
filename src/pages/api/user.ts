/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

interface User {
  summonerId: string
  tier: string
  rank: string
  leaguePoints: number
}

export default async (
  request: NextApiRequest,
  response: NextApiResponse<User>
) => {
  try {
    const { data } = await axios.get<User[]>(
      `https://br1.api.riotgames.com/tft/league/v1/entries/by-summoner/${process.env.SUMMONER_ID}?api_key=${process.env.RIOT_API_KEY}`
    )

    const user = data[0]

    return response.json(user)
  } catch (err) {
    return response.json(err)
  }
}
