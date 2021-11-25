import './assets/scss/App.scss';

//COMPONENTES

import Router from './Router';
import AppRouter from './routers/AppRouter';


function App() { 
  
  return (
    <div className="App">
      {/* <Router/> */}
      <AppRouter/>
    </div>
  );
}

export default App;
