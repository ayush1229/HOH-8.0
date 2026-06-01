import DotField from "./components/DotField";

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <DotField
        dotRadius={1}
        dotSpacing={13}
        bulgeStrength={8}
        glowRadius={110}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={350}
        cursorForce={0.44}
        bulgeOnly
        gradientFrom="#9345dd"
        gradientTo="#cb38d4"
        glowColor="#1e1222"
    />
    </div>
  );
}

export default App;
