import React from "react";
import { Link } from "react-router-dom";

const LinksList = ({ Links }) => {
  if (!Links.length) {
    return <p className="center">Денег пока нет, приходите позже</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Оригинальная</th>
          <th>Сокращенная</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        {Links.map((link, index) => {
          console.log(link);
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Открыть</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LinksList;