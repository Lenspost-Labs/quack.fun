import { AutoComplete } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSearchUsers } from "src/services/BEApis/utils/UtilsApis";
import UserChip from "../Utils/components/UserChip";

const CustomSearchIp = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([
    {
      value: "",
    },
  ]);

  const handleSearch = (searchText: string) => {
    console.log(searchText);
  };

  const fnSearch = async (searchText: string) => {
    const searchRes = await apiSearchUsers(searchText);

    const newOptions = searchRes?.data?.map(
      (user: { username: any; fid: any; pfp: any; display_name: any }) => ({
        // value: <Link to={`/${user.fid}`}>{`@${user.username}`}</Link>,
        value: (
          <UserChip
            userFid={user.fid}
            username={user.username}
            userPfp={user.pfp}
            userDisplayName={user.display_name}
          />
        ),
      })
    );

    setOptions(newOptions);

    console.log("options", options);
  };

  return (
    <>
      {" "}
      <AutoComplete
        size="large"
        style={{ width: 240 }}
        options={options}
        // onChange={fnSearch}
        className="my-4"
        placeholder="Search an username"
        // filterOption={(inputValue, option) =>
        //   option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        // }
        // filterOption={false}
        onSearch={fnSearch}
      />
    </>
  );
};

export default CustomSearchIp;
