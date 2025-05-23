import LikeButton from './LikeButton'
import './TrailCard.css'
import { useEffect, useState } from 'react'

type CardProps = {
  title: string
  children?: React.ReactNode,
}

const Card: React.FC<CardProps> = (props: CardProps) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
  }, [liked]); // only runs when `liked` changes

  return (
    <div>
      <div className='card' onClick={() => {
        setIsExpanded((prevIsExpanded) => !prevIsExpanded);
      }}>
        <h5>{props.title} <LikeButton liked={liked} setLiked={setLiked} /> </h5>

        {isExpanded &&
          (<>
            {props.children}
          </>
          )
        }
      </div>
    </div>
  )
}

export default Card