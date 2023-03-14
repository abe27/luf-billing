const StepTimeLine = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="grid justify-center items-center">
          <div className="bg-blue-500 text-white rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
          <div>
            <span className="text-sm">Send File</span>
          </div>
          <div>
            <span className="text-xs">Description</span>
          </div>
        </div>
        <div class="border-t-4 border-indigo-500 w-5/12"></div>
        <div>Test</div>
      </div>
    </>
  );
};

export default StepTimeLine;
