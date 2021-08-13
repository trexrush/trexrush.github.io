import './css/App.css';

import React from 'react';
import { Router, Route, Switch } from 'wouter'; //useHistory
import { Canvas } from '@react-three/fiber';

import { MenuScene } from './components/ThreeComponents';
import { Background, NameTitle as Title } from './components/Components';
import Projects from './components/ProjectsPage';
import About from './components/About'

export default function App() {

  return  <Router> {/* base="/homepage-beta"> */}
            <Background>
              <Switch>

                <Route exact path="/projects">
                  <Projects/>
                </Route>

                <Route exact path="/about">
                  <About/>
                </Route>

                <Route path="/">
                  <Title />
                  <Canvas className="canvas child">
                    <MenuScene/>
                  </Canvas>
                </Route>

              </Switch>
            </Background>
          </Router>
}
