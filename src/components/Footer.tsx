const Footer = () => {
  return (
    <footer className="py-4">
      <div className="container">
        <div className="win95-window">
          <div className="win95-statusbar flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="win95-statusbar-inset text-[10px]">
              © 2024 Pumpster.exe | Trading involves risk
            </div>
            <div className="win95-statusbar-inset text-[10px]">
              Never invest more than you can afford to lose
            </div>
            <div className="win95-statusbar-inset text-[10px]">
              Solana Mainnet
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
