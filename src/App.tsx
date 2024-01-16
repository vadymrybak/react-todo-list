import { Container } from '@mui/material';
import './App.css';
import TodoParentComponent from './Components/TodoParentComponent';

function App() {
  return (
    <>

      <Container maxWidth="md" className="App-content">
        <header className="App-header">
          TODO List
        </header>
        <TodoParentComponent />
      </Container>
    </>

  );
}

export default App;
