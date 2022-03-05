import logo from './logo.svg';
import './App.css';
import {Title} from './Components/UX/Title';

function App() {
  return (
    <div>
      <Title>Hola Mundo cruel</Title>
      <Title>Hola Mundo cruel 2 </Title>
      <Title>Hola Mundo cruel 3</Title>
      <Title>
        Hola Mundo cruel 4
        <Title>Hola Mundo cruel 5</Title>
      </Title>
    </div>
  );
} 

export default App;

