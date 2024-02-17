import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import birdScene from "../assets/3d/bird.glb";

const Bird = ({isRotating, ...props}) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(birdScene);
    const { actions } = useAnimations(animations, ref);

    useEffect(() => {
      if (isRotating) {
        actions["Take 001"].play();
      } else {
        actions["Take 001"].stop();
      }
    }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref}>
        <primitive object={scene}/>
    </mesh>
  )
}

export default Bird