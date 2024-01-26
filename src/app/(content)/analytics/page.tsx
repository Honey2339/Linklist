import React from "react";
import WelcomeComponentAnalytics from "./welcome";
import ChartComponent from "./linechart";

export default function Analytics() {
  return (
    <main className="h-[91vh] flex items-center justify-center">
      <section className="h-[90vh] max-xl:max-h-[94vh] w-[1800px] rounded-xl border-2 border-gray-200 shadow-lg">
        <div className="text-center mt-10">
          {/* <WelcomeComponentAnalytics /> */}
        </div>
        <div className="flex justify-center items-center max-h-64 gap-20">
          <h1 className="mt-10 text-xl">Clicks on your link :</h1>
          <ChartComponent />
        </div>
      </section>
    </main>
  );
}
