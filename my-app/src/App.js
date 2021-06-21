import logo from './logo.svg';
import './App.css';

import { Home } from './Home';
import { Doctor } from './Doctor';
import { Patient } from './Patient';
import { Navigation } from './Navigation';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
         <div className="container">
                <h3 className="m-3 d-flex justify-content-center">
                    Patient Registration
                </h3>

                <Navigation/>
                    <Switch>
                        <Route path='/' component={Home} exact />
                        <Route path='/doctor' component={Doctor}/>
                        <Route path='/patient' component={Patient}/>
                </Switch>
            </div>
        </BrowserRouter>
  );
}

export default App;
