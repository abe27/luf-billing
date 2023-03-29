import { useEffect, useState } from "react";
import { RandomDateString } from "@/hooks";
import { MdUploadFile, MdEditDocument } from "react-icons/md";
import { TbFileCheck, TbChecks } from "react-icons/tb";

const StepTimeLine = ({ data = [], stepComplete = [] }) => {
  const checkComplete = (i) => {
    let com = stepComplete.filter(
      (x) => x.step_title_id === i.id && x.is_complete === true
    );
    if (com[0]) {
      return "complete";
    }
    return "not-complete";
  };
  return (
    <>
      <div className="flex justify-between mt-4">
        {data?.map((i, x) => (
          <div key={x} className={`step-item ${checkComplete(i)}`}>
            <div className="step">
              {x === 0 && <MdUploadFile size={26} />}
              {x === 1 && <MdEditDocument size={26} />}
              {x === 2 && <TbFileCheck size={26} />}
              {x === 3 && <TbChecks size={26} />}
            </div>
            <div className="text-xs">{i.title}</div>
            <div className="text-xs">{i.date}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StepTimeLine;
