import { AutoComplete } from "antd";
import React from "react";

const CustomSearchIp = () => {

  const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];
  
  const handleSearch = (searchText: string) => {
    
    console.log(searchText);
  }

  return (
    <>
      {" "}
      <AutoComplete
      size="large"
        style={{ width: 280 }}
        options={options}
        onChange={handleSearch}
        className="my-4"
        placeholder="Search for Trending, Topics, more"
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </>
  );
};

export default CustomSearchIp;
