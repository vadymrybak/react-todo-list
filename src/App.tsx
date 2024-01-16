import { Container } from '@mui/material';
import './App.css';
import TodoListComponent from './TodoListComponent';

function App() {
  return (
    <>

      <Container maxWidth="md" className="App-content">
        <header className="App-header">
          TODO List
        </header>
        <TodoListComponent />
      </Container>
    </>

  );
}

export default App;
