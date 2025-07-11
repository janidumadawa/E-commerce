// client/src/components/BottomBanner.jsx
import React from "react";
import bottomBannerLG from '../assets/bottomBannerLG.jpg';
import bottomBannerSM from '../assets/bottomBannerSM.jpg';

function BottomBanner() {
  return (
    <div className="relative mt-24">
      <img
        src={bottomBannerLG}
        alt="Bottom Banner"
        className="w-full hidden md:block"
      />
      <img
        src={bottomBannerSM}
        alt="Bottom Banner"
        className="w-full md:hidden"
      />
    </div>
  );
}

export default BottomBanner;
