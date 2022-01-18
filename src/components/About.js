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
                <div className="white about box centered alpha">
                    Hello! I am Eduardo Mauzera, <br/>
                    a Computer Science Junior studying at UT Dallas. <br/>
                    <br/>
                    My interests are web design and game programming, <br/>
                    and currently my focus is on frontend and fullstack development,  <br/>
                    expecially using React and Nextjs. <br/>
                    <br/>
                    I also am profficient using Python, <br/>
                    along with Unity and the Adobe Suite.<br/>
                    <br/>
                    I love to travel and visit interesting new places. <br/>
                    In my free time I <br/>
                    <a href="https://www.worldcubeassociation.org/persons/2013MAZU02" style={{color: "white", textDecoration: "underline"}}>competitively speedsolve the Rubik's Cube.</a><br/>
                </div>
                <Link className="white back box centered link projecttext border alpha" to="/">Back</Link>
            </div>
            
}

export default About;