import LikeButton from './LikeButton'
import './App.css'
import { useEffect, useState } from 'react'

type CardProps = {
    title: string
    children?: React.ReactNode,
  }

const Card: React.FC<CardProps> = (props : CardProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleToggleLike = () => {
    setLiked((prevLiked) =>  !prevLiked);
  };

  useEffect(() => {
    console.log(`${props.title} has been liked: ${liked}`);
  }, [liked]); // only runs when `liked` changes

  return (
    <div className='card' onClick={() => setClickCount((prevClickCount) => prevClickCount + 1)}>
      <h2> {props.title} <br/> {clickCount || null} </h2>
      {props.children}
      <LikeButton liked={liked} onToggleLiked={handleToggleLike}/>
    </div>
  )
}

export default Card