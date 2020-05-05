import React, { useState } from "react";

const SleepAction = (props) => {
  return (
    <div className="SleepAction">
      <h2 className="heading-secondary u-center-text">Night Phase 🌕</h2>
      <p className="paragraph">It's time to sleep.</p>
      <p className="paragraph">You will wake up when your role is called or at the end of the night.</p>
    </div>
  );
};

export default SleepAction;
