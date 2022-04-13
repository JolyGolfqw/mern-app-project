import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {
      console.log(e);
    }
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row">
      <div className="">
        <h1>Сокращай и пиши</h1>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">Авторизация</span>
                <div>
                  <div className="input-field ">
                    <input
                      placeholder="Введите email"
                      id="first_name"
                      type="email"
                      name="email"
                      className="yellow-input"
                      value={form.email}
                      onChange={changeHandler}
                    />
                    <label htmlFor="first_name">email</label>
                  </div>
                  <div className="input-field ">
                    <input
                      placeholder="Введите пароль"
                      id="password"
                      type="password"
                      name="password"
                      className="yellow-input"
                      value={form.password}
                      onChange={changeHandler}
                    />
                    <label htmlFor="first_name">email</label>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <button
                  className="btn yellow darken-4"
                  style={{ marginRight: 10 }}
                  onClick={loginHandler}
                  disabled={loading}
                >
                  Войти
                </button>
                <button
                  onClick={registerHandler}
                  className="btn grey ligthen-1 black-text"
                  disabled={loading}
                >
                  Регистрация
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// col s6 offset-s3