import React from "react";

const Select = ({ list, onChange }) => {
  return (
    <select onChange={onChange} className="form-select">
      <option>----</option>
      {list
        ? list.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))
        : ""}
    </select>
  );
};

export default Select;
