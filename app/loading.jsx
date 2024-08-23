// components/SpinningLoadingPage.js
import React from 'react';
import {Spinner} from "@nextui-org/spinner";
const SpinningLoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <p className="text-black font bold">Loading...</p>
      <Spinner/>
    </div>
  );
};

export default SpinningLoadingPage;
