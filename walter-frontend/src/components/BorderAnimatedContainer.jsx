// How to make animated gradient border 👇
// https://cruip-tutorials.vercel.app/animated-gradient-border/
function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full [background:linear-gradient(45deg,#0a0a0a,#0a0a0a)_padding-box,conic-gradient(from_var(--border-angle),rgba(229,9,20,0.8)_15%,rgba(255,31,43,0.65)_35%,rgba(60,0,4,0.7)_60%,rgba(229,9,20,0.8)_90%,rgba(255,31,43,0.65))_border-box] rounded-2xl border border-transparent animate-border flex overflow-hidden">
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;
