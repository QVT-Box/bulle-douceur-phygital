const FloatingBubbles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>
      <div className="bubble bubble-5"></div>
      
      {/* Bulles additionnelles pour plus de poésie */}
      <div className="absolute w-6 h-6 rounded-full bg-gradient-bubble opacity-10 top-[30%] right-[20%] animate-float" style={{ animationDelay: '5s' }}></div>
      <div className="absolute w-10 h-10 rounded-full bg-gradient-bubble opacity-15 bottom-[40%] left-[60%] animate-float" style={{ animationDelay: '7s' }}></div>
      <div className="absolute w-14 h-14 rounded-full bg-gradient-bubble opacity-10 top-[70%] right-[40%] animate-float" style={{ animationDelay: '2.5s' }}></div>
    </div>
  );
};

export default FloatingBubbles;