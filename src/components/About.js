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
                    a Junior CS major studying at UT Dallas. <br/>
                    <br/>
                    This is my website, currently undergoing a rewrite with React. <br/>
                    More to come in the future!
                </div>
                <Link className="white back box centered link projecttext border alpha" to="/">Back</Link>
            </div>
            
}

export default About;