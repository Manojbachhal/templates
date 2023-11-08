import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home() {
  const [state, setState] = useState(1);
  const navigate = useNavigate();
  const addShadow = (index) => {
    let arr = document.querySelectorAll(".shadow");
    arr[index - 1].classList.add(`shadow1`);

    let nameArray = document.querySelectorAll(".name");
    nameArray[index - 1].classList.add(`namebg`);
    setState((prev) => prev + 1);
    if (state == 10) {
      navigate("/diwali");
    }
  };
  return (
    <div className="row">
      <div
        className="col-md-3 border"
        style={{ paddingTop: "150px", paddingLeft: "150px" }}
        onClick={() => addShadow(1)}
      >
        <div className="base-lamp"></div>
        <div className="shadow"></div>

        <div className="name">
          <h1>Name</h1>
        </div>
      </div>

      <div
        className="col-md-3 border"
        style={{ paddingTop: "150px", paddingLeft: "150px" }}
        onClick={() => addShadow(2)}
      >
        <div className="base-lamp"></div>
        <div className="shadow"></div>

        <div className="name col-md-12">
          <h1>Name</h1>
        </div>
      </div>

      <div
        className="col-md-3 border"
        style={{ paddingTop: "150px", paddingLeft: "150px" }}
        onClick={() => addShadow(3)}
      >
        <div className="base-lamp"></div>
        <div className="shadow"></div>

        <div className="name">
          <h1>Name</h1>
        </div>
      </div>

      <div
        className="col-md-3 border"
        style={{ paddingTop: "150px", paddingLeft: "150px" }}
        onClick={() => addShadow(4)}
      >
        <div className="base-lamp"></div>
        <div className="shadow"></div>

        <div className="name col-md-12">
          <h1>Name</h1>
        </div>
      </div>

      <div
        className="col-md-3 border"
        style={{ paddingTop: "150px", paddingLeft: "150px" }}
        onClick={() => addShadow(5)}
      >
        <div className="base-lamp"></div>
        <div className="shadow"></div>

        <div className="name">
          <h1>Name</h1>
        </div>
      </div>

      <div
        className="col-md-3 border"
        style={{ paddingTop: "150px", paddingLeft: "150px" }}
        onClick={() => addShadow(6)}
      >
        <div className="base-lamp"></div>
        <div className="shadow"></div>

        <div className="name">
          <h1>Name</h1>
        </div>
      </div>

      <div
        className="col-md-3 border"
        style={{ paddingTop: "150px", paddingLeft: "150px" }}
        onClick={() => addShadow(7)}
      >
        <div className="base-lamp"></div>
        <div className="shadow"></div>

        <div className="name">
          <h1>Name</h1>
        </div>
      </div>

      <div
        className="col-md-3 border"
        style={{ paddingTop: "150px", paddingLeft: "150px" }}
        onClick={() => addShadow(8)}
      >
        <div className="base-lamp"></div>
        <div className="shadow"></div>

        <div className="name">
          <h1>Name</h1>
        </div>
      </div>

      <div
        className="col-md-3 border"
        style={{ paddingTop: "150px", paddingLeft: "150px" }}
        onClick={() => addShadow(9)}
      >
        <div className="base-lamp"></div>
        <div className="shadow"></div>

        <div className="name">
          <h1>Name</h1>
        </div>
      </div>

      <div
        className="col-md-3 border"
        style={{ paddingTop: "150px", paddingLeft: "150px" }}
        onClick={() => addShadow(10)}
      >
        <div className="base-lamp"></div>
        <div className="shadow"></div>

        <div className="name">
          <h1>Name</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
