import React from 'react'

import ironImg from '../assets/iron.png'
import bronzeImg from '../assets/bronze.png'
import silverImg from '../assets/silver.png'
import goldImg from '../assets/gold.png'
import platinumImg from '../assets/platinum.png'
import diamondImg from '../assets/diamond.png'
import masterImg from '../assets/master.png'
import grandMasterImg from '../assets/grandMaster.png'
import challengerImg from '../assets/challenger.png'
import { useFetch } from '../hooks/useFetch'

import {
  Container,
  TrackerHeader,
  TrackerBody,
  LastGames,
  GamePosition
} from '../styles/pages/Home'

interface Match {
  id: string
  placement: number
}

interface User {
  summonerId: string
  tier: string
  rank: string
  leaguePoints: number
}

const Home: React.FC = () => {
  const positions = {
    1: 'first',
    2: 'second',
    3: 'third'
  }

  const tierImages = {
    IRON: ironImg,
    BRONZE: bronzeImg,
    SILVER: silverImg,
    GOLD: goldImg,
    PLATINUM: platinumImg,
    DIAMOND: diamondImg,
    MASTER: masterImg,
    'GRAND MASTER': grandMasterImg,
    CHALLENGER: challengerImg
  }

  const { data: matches } = useFetch<Match[]>('/matches')
  const { data: user } = useFetch<User>('/user')

  if (!matches || !user) {
    return <p>Carregando...</p>
  }

  return (
    <Container>
      <TrackerHeader>
        <img src={tierImages[user.tier]} alt="Challenger Logo" />

        <section>
          <h1>
            {user.tier} <span>{user.rank}</span>
          </h1>
          <p>
            {user.leaguePoints} <span>LP</span>
          </p>
        </section>
      </TrackerHeader>

      <hr />

      <TrackerBody>
        <h2>Last games</h2>

        <LastGames>
          {matches.length > 0 &&
            matches.reverse().map((match, index) => (
              <GamePosition
                key={match.id}
                position={positions[match.placement]}
              >
                <div>
                  <p>{match.placement}</p>
                </div>
                {matches.length - 1 !== index && <section></section>}
              </GamePosition>
            ))}
        </LastGames>
      </TrackerBody>
    </Container>
  )
}

export default Home
