import React from 'react'
import {Canvas} from '@react-three/fiber'
import { useState, Suspense } from 'react'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'

const Home = () => {

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustBirdForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [0.5, 0.5, 0.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [0.0075, 0.0075, 0.0075];
      screenPosition = [4, -4, -7];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let rotation = [Math.PI / 4, 0, 0];

    return [rotation];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [birdScale, birdPosition] = adjustBirdForScreenSize();
  const [planeRotation] = adjustPlaneForScreenSize();

  return (
    <section className='w-full h-screen relative'>
    
    <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
    {currentStage && <HomeInfo currentStage={currentStage} />}
  </div>

    <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />

          <Sky isRotating={isRotating}/>
          <Plane rotation={planeRotation}/>
          <Island
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          position={islandPosition}
          scale={islandScale}
          rotation = {islandRotation}
          setCurrentStage={setCurrentStage}/>

          <Bird
          isRotating={isRotating}
          position={birdPosition}
          rotation={[18, 0, 0]}
          scale={birdScale}/>

        </Suspense>
      </Canvas>
    
    </section>
  )
}

export default Home