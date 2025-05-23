import {AiFillLike, AiFillDislike} from 'react-icons/ai'

type LikeButtonProps = {
    liked: boolean,
    onToggleLiked: () => void; 
}

const LikeButton: React.FC<LikeButtonProps> = ({ liked, onToggleLiked }) => {
  if(liked)
    return (<AiFillLike
      color="blue" 
      size="20" 
      onClick={onToggleLiked}/>)
  return (<AiFillDislike
    color="red" 
    size="20" 
    onClick={onToggleLiked}/>)  
}

export default LikeButton