import DotField from "./components/DotField";
import { StickyNavbar } from "./components/Navbar";
import TextType from "./components/TypeText";

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <DotField
        className="absolute inset-0"
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
      <div className="relative z-10">
        <StickyNavbar />
      </div>
      <div className="relative z-10 flex h-[calc(100vh-5rem)] items-center justify-center px-4 text-center">
        <TextType className="text-4xl text-white sm:text-5xl md:text-6xl" />
      </div>
    </div>
  );
}

export default App;
