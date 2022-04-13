import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

const CreatePage = () => {
  const history = useNavigate();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");
  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        console.log(data);
        history(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };
  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field ">
          <input
            placeholder="Вставьте ссылку "
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label for="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;