import React from 'react';

const AccordionLayout = ({
  title,
  children,
  index,
  activeIndex,
  setActiveIndex,
}) => {
  const handleSetIndex = index => {
    if (activeIndex === index) setActiveIndex(null);
    else setActiveIndex(index);
  };
  return (
    <>
      <div
        onClick={() => handleSetIndex(index)}
        className="flex w-full p-2 pl-0"
      >
        {title}
      </div>

      {activeIndex === index && <div className="">{children}</div>}
    </>
  );
};

export default AccordionLayout;
