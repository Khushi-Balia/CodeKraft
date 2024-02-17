import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import planeScene from "../assets/3d/plane.glb";

const Plane = () => {
    const planeRef = useRef();
    const { scene, animations } = useGLTF(planeScene);
    const { actions } = useAnimations(animations, planeRef);

useEffect(() => {
      actions["Take 001"].play();
    }, []);

    useFrame(({ clock, camera }) => {
      // Update the Y position to simulate plane-like motion using a sine wave
      planeRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
  
      // Check if the plane reached a certain endpoint relative to the camera
      if (planeRef.current.position.x > camera.position.x + 10) {
        // Change direction to backward and rotate the plane 180 degrees on the y-axis
        planeRef.current.rotation.y = Math.PI;
      } else if (planeRef.current.position.x < camera.position.x - 10) {
        // Change direction to forward and reset the plane's rotation
        planeRef.current.rotation.y = 0;
      }
  
      // Update the X and Z positions based on the direction
      if (planeRef.current.rotation.y === 0) {
        // Moving forward
        planeRef.current.position.x += 0.01;
        planeRef.current.position.z -= 0.01;
      } else {
        // Moving backward
        planeRef.current.position.x -= 0.01;
        planeRef.current.position.z += 0.01;
      }
    });

  
  

  return (
    <mesh position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]} ref={planeRef}>
        <primitive object={scene}/>
    </mesh>
  )
}

export default Plane