import { AutoComplete } from "antd";
import React, { useState } from "react";

const CustomSearchIp = () => {
  const [txtBoxWidth, setTxtBoxWidth] = useState(200);

  const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];
  

  return (
    <>
      {" "}
      <AutoComplete
      size="large"
        style={{ width: txtBoxWidth }}
        options={options}
        onChange={value => console.log(value)}
        className="mb-4"
        onFocus={ () => setTxtBoxWidth(280) }
        onDeselect={ () => setTxtBoxWidth(200) }
        placeholder="Search for Trending, Topics, more"
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </>
  );
};

export default CustomSearchIp;
