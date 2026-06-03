import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function AgentUniverse({
  eventSource,
  density = 500,
  textDensity = 40,
  speed = 0.4,
  mouseStrength = 1.5,
  color = "#00e5ff",
  words = ["AI", "AGENT"]
}) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1, background: "#050505" }}>
      <Canvas eventSource={eventSource} eventPrefix="client" camera={{ position: [0, 0, 30], fov: 65 }}>
        <fog attach="fog" args={["#050505", 30, 120]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[20, 20, 20]} intensity={2} color={color} />
        <BackgroundScene
          density={density}
          textDensity={textDensity}
          speed={speed}
          mouseStrength={mouseStrength}
          color={color}
          words={words}
        />
      </Canvas>
    </div>
  );
}

function BackgroundScene({ density, textDensity, speed, mouseStrength, color, words }) {
  const groupRef = useRef();
  const { mouse } = useThree();

  const shapes = useMemo(() => {
    const palette = [color, "cyan", "olive"];
    return Array.from({ length: density }, () => ({
      x: (Math.random() - 0.5) * 150,
      y: (Math.random() - 0.5) * 150,
      z: (Math.random() - 0.5) * 120,
      offset: Math.random() * 100,
      scale: Math.random() * 1.5 + 1.0,
      type: Math.floor(Math.random() * 3),
      randomSpeedX: Math.random() * 0.5 + 0.5,
      randomSpeedY: Math.random() * 0.5 + 0.5,
      randomSpeedZ: Math.random() * 0.5 + 0.5,
      itemColor: palette[Math.floor(Math.random() * palette.length)],
    }));
  }, [density, color]);

  const texts = useMemo(() => {
    const palette = [color, "cyan", "olive"];
    return Array.from({ length: textDensity }, (_, i) => ({
      word: words[i % words.length],
      x: (Math.random() - 0.5) * 150,
      y: (Math.random() - 0.5) * 150,
      z: (Math.random() - 0.5) * 100,
      offset: Math.random() * 100,
      itemColor: palette[Math.floor(Math.random() * palette.length)],
    }));
  }, [textDensity, words, color]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const scrollY = document.querySelector('main')?.scrollTop || 0;

    if (groupRef.current) {
      groupRef.current.children.forEach((mesh, i) => {
        const p = shapes[i];

        // Random floating motion on all axes + parallax
        mesh.position.y = p.y + Math.sin(t * speed * p.randomSpeedY + p.offset) * 3 + (scrollY * 0.003);
        mesh.position.x = p.x + mouse.x * mouseStrength * 0.5 + Math.cos(t * speed * p.randomSpeedX + p.offset) * 3;
        mesh.position.z = p.z + Math.sin(t * speed * p.randomSpeedZ + p.offset) * 2;

        // Faster rotation
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.008;
      });
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {shapes.map((shape, i) => (
          <InteractiveShape key={i} shape={shape} color={color} />
        ))}
      </group>

      {texts.map((item, i) => (
        <InteractiveText key={i} item={item} color={color} speed={speed} mouseStrength={mouseStrength} />
      ))}
    </>
  );
}

function InteractiveText({ item, color, speed, mouseStrength }) {
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!textRef.current) return;
    const t = clock.elapsedTime;
    const scrollY = document.querySelector('main')?.scrollTop || 0;
    
    // Slight drift + parallax
    textRef.current.position.y = item.y + Math.cos(t * speed + item.offset) * 2 + (scrollY * 0.005);
    textRef.current.position.x = item.x + mouse.x * mouseStrength * 1;
    
    // Look at camera
    textRef.current.lookAt(0, 0, 20);
    
    // Scale up slightly on hover
    const targetScale = hovered ? 1.5 : 1;
    textRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
  });

  return (
    <Text
      ref={textRef}
      position={[item.x, item.y, item.z]}
      fontSize={0.6}
      color={hovered ? "#ffffff" : color}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      fillOpacity={hovered ? 1 : 0.6}
    >
      {item.word}
    </Text>
  );
}

function InteractiveShape({ shape, color }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    // Scale logic
    const targetScale = hovered ? shape.scale * 1.5 : shape.scale;
    meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      position={[shape.x, shape.y, shape.z]}
      scale={shape.scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {shape.type === 0 && <boxGeometry args={[1, 1, 1]} />}
      {shape.type === 1 && <octahedronGeometry args={[1]} />}
      {shape.type === 2 && <icosahedronGeometry args={[1]} />}

      <meshStandardMaterial
        color={color}
        emissive={hovered ? "#ffffff" : color}
        emissiveIntensity={hovered ? 1.0 : 0.4}
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}