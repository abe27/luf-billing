import { useEffect, useState } from "react";
import { RandomDateString } from "@/hooks";
import { MdUploadFile, MdEditDocument } from "react-icons/md";
import { TbFileCheck, TbChecks } from "react-icons/tb";

let doc = [
  "Send File",
  "Wait for Verify Billing Account",
  "Wait For Success",
  "Payment Date Set",
];
const StepTimeLine = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let a = [];
    for (let i = 0; i < doc.length; i++) {
      a.push({
        id: i,
        title: doc[i],
        date: RandomDateString(),
      });
    }
    setData(a);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-between mt-4">
        {data?.map((i, x) => (
          <div key={x} className="step-item complete">
            <div className="step">
              {i.id === 0 && <MdUploadFile size={26} />}
              {i.id === 1 && <MdEditDocument size={26} />}
              {i.id === 2 && <TbFileCheck size={26} />}
              {i.id === 3 && <TbChecks size={26} />}
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
