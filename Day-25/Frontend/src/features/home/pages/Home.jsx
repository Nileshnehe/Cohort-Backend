import React from 'react'
import "./home.scss"
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
const Home = () => {

    const { handleGetSong } = useSong()

    return (
        <div className='bg'>
            <FaceExpression
                onClick={(expression) => { handleGetSong({mood:expression}) }}
            />
            <Player />
        </div >
    )
}

export default Home