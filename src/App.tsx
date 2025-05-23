import './App.css'
import Card from './Card'

const App = () => {
  const cards = []
  for (let i = 0; i < 5; i++) {
    cards.push( <Card title = {`Card ${i+1}`}> <h3> This is a child </h3> </Card>)
  }
  return (
    <div className='card-container'>
      {cards}
    </div>
  )
}

export default App
