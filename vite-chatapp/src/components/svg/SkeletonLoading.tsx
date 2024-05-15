import React from "react";

function SkeletonLoading() {
  return (
    <div role="status" className="animate-pulse mt-6">
      <div className="h-14 bg-gray-100 dark:bg-gray-700 p-3 my-2 mx-6 contact-bg"></div>
      <div className="h-14 bg-gray-100 dark:bg-gray-700 p-3 my-2 mx-6 contact-bg"></div>
      <div className="h-14 bg-gray-100 dark:bg-gray-700 p-3 my-2 mx-6 contact-bg"></div>
      <div className="h-14 bg-gray-100 dark:bg-gray-700 p-3 my-2 mx-6 contact-bg"></div>
      <div className="h-14 bg-gray-100 dark:bg-gray-700 p-3 my-2 mx-6 contact-bg"></div>
      <div className="h-14 bg-gray-100 dark:bg-gray-700 p-3 my-2 mx-6 contact-bg"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SkeletonLoading;
