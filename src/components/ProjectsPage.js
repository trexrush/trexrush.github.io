import React from 'react';
import { Link } from 'wouter';
import '../css/projects.css';

const Projects = () => {
    return  <div className="container flex">
                <ProjectTile link='https://trexrush.github.io/truck-truck-moose/' cssid="trucktruckmoose">
                    Truck Truck Moose
                </ProjectTile>
                <ProjectTile link='https://trexrush.github.io/odin-google-homepage/' cssid="googlehomepage">
                    Google<br/>Homepage<br/>Recreation
                </ProjectTile>
                <Link className="white back box centered link projecttext border" to="/">Back</Link>
            </div>
}

const ProjectTile = (props) => {
    const handleClick = () => {
        window.location.assign(props.link);
    }
    return <div className="project box centered link projecttext prborder" onClick={handleClick}>
        {props.children}
        <div className="bgimage" id={`${props.cssid}`}></div>
    </div>
}

export default Projects;