import React from 'react';
import { useSpring, a } from 'react-spring'

const Background = (props) => {
    return <div className="bg parent viewport">
        {props.children}
    </div>;
}

const NameTitle = () => {
    const namespring = useSpring({
        to: { opacity: 0 },
        from: { opacity: 1 },
        delay: 400,
      })
    return  <div className="child centered">
                <a.div style={namespring} className="centered no">
                    <div className="title white">
                    E D U A R D O &emsp; M A Z U E R A
                    </div>
                </a.div>
            </div>
}

export { Background, NameTitle };