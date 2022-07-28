import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Home = () => {
  const [input, setInput] = useState("");
  const [totalTexts] = useState([]);

  const handleInputChange = async (e) => {
    e.preventDefault();

    try {
      let data = await axios.get("/iecho?text=" + input);
      totalTexts.push(data.data);
      console.log(data.data);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const colors = {
    ok: "border border-success rounded mt-4",
    not: "border border-danger rounded mt-4",
  };

  const textColor = {
    palindromo: "text-success",
    normal: "text-danger",
  };


  const buttonSubmit = useMemo(()=>{
    if(input.length === 0 ||  !isNaN(input))return true;
    return false
 },[input])
  

  return (
    <div>
      <nav className="navbar navbar.light bg-danger">
        <div className="row g-2 align-items-center m-auto">
          <div className="col-auto">
            <input
              type="search"
              className="form-control mb-3 me-3"
              placeholder="Insert Text"
              aria-label="Insert Text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              disabled={buttonSubmit}
              onClick={handleInputChange}
              className="btn-send btn btn-primary mb-3 "
            >
              Send
            </button>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="container">
          <div
            className="card mt-3 h-75"
            style={{ backgroundColor: "#EEEEEE" }}
          >
            <div className="card-body border-2">
              <h2 className="card-title">Results:</h2>
              <div className="container-fluid">
              {isNaN(input) === false && input.length > 0 ? <h3 className="text-center text-danger">Entering numbers is not allowed</h3> : null}
                <div className="container">
                  {totalTexts
                    .map((text, i) => {
                      return (
                        <div key={i}>
                          <div
                            className={
                              text.palindromo === true ? colors.ok : colors.not
                            }
                          >
                            <h4 className="text-center ">{text.text}</h4>
                          </div>
                          <p
                            className={
                              text.palindromo === true
                                ? textColor.palindromo
                                : textColor.normal
                            }
                          >
                            {text.palindromo === true ? "palindromo" : "normal"}
                          </p>
                        </div>
                      );
                    })
                    .reverse()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
