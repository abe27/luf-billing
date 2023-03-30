import { MdEditDocument, MdUploadFile } from "react-icons/md";
import { TbChecks, TbFileCheck } from "react-icons/tb";

const StepTimeLine = ({ step = {}, data = [] }) => {
  return (
    <>
      <div className="flex justify-between mt-4">
        {data?.map((i, x) => (
          <div
            key={x}
            className={`step-item ${
              step.seq + 1 === 4
                ? "not-complete"
                : x + 1 <= step.seq
                ? "complete"
                : "not-complete"
            }`}
          >
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
