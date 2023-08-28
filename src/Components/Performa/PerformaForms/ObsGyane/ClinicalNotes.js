import React, { useState } from "react";

function UsgFindings() {
  const [inputFields, setInputFields] = useState([{ name: "", age: "" }]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { name: "", age: "" };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(inputFields);
  };

  return (
    <div className="performa-form-container">
      <form onSubmit={submit}>
        <h1>CLINICAL NOTES</h1>
        <button onClick={addFields}>Add More..</button>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name="name"
                placeholder="Report name"
                value={input.name}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                name="age"
                placeholder="value"
                value={input.age}
                onChange={(event) => handleFormChange(index, event)}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}

export default UsgFindings;
