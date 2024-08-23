// components/SpinningLoadingPage.js
import React from 'react';
import {Spinner} from "@nextui-org/spinner";
const SpinningLoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Spinner/>
    </div>
  );
};

export default SpinningLoadingPage;
