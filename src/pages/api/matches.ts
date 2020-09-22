/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

interface Participant {
  puuid: string
  placement: number
}

interface MatchResponse {
  metadata: {
    match_id: string
  }
  info: {
    participants: Participant[]
  }
}

interface Match {
  id: string
  placement: number
}

export default async (
  request: NextApiRequest,
  response: NextApiResponse<Match[]>
) => {
  try {
    const { data: matchesIds } = await axios.get(
      `https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${process.env.PUUID}/ids?count=7&api_key=${process.env.RIOT_API_KEY}`
    )

    const matchesPromises = matchesIds.map((matchID: string) => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://americas.api.riotgames.com/tft/match/v1/matches/${matchID}?api_key=${process.env.RIOT_API_KEY}`
          )
          .then(response => resolve(response.data))
          .catch(err => reject(err))
      })
    })
    const matchesResponse = await Promise.all<MatchResponse>(matchesPromises)

    const matches = matchesResponse.map(match => {
      const participant = match.info.participants.find(
        participant => participant.puuid === process.env.PUUID
      )

      if (!participant) {
        return
      }

      return {
        id: match.metadata.match_id,
        placement: participant.placement
      }
    })

    if (matches) {
      return response.json(matches)
    }

    return response.json([])
  } catch (err) {
    return response.json(err)
  }
}
