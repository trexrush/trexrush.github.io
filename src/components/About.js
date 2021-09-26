import React from 'react';
import { Link } from 'wouter';
import '../css/about.css';
import '../css/projects.css';
import face from './../images/facepic1.jpg'

const About = () => {
    return  <div className="container flex">
                <div className="imgdiv">
                    <img id="propic" className="centered bgimage" src={face} alt="Profile" />
                </div>
                <div className="white about box centered border alpha">
                    Hello! I am Eduardo Mauzera, <br/>
                    a Computer Science Junior studying at UT Dallas. <br/>
                    <br/>
                    My interests are web design and game programming, <br/>
                    and currently my focus is on frontend development,  <br/>
                    expecially using React. <br/>
                    <br/>
                    I also have experience in Java, C++, Python, <br/>
                    along with Unity and the Adobe Suite.<br/>
                    <br/>
                    I love to travel and visit interesting new places. <br/>
                    In my free time I play video games and <br/>
                    <a href="https://www.worldcubeassociation.org/persons/2013MAZU02">competitively speedsolve the Rubik's Cube.</a><br/>
                </div>
                <Link className="white back box centered link projecttext border alpha" to="/">Back</Link>
            </div>
            
}

export default About;