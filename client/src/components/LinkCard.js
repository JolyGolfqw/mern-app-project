import React from "react";

const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Ссылка</h2>
      <p>
        Ваша ссылка{" "}
        <a href={link.to} target="_blacnk" rel="noopener noreferre">
          {link.to}
        </a>
      </p>
      <p>
        откуда{" "}
        <a href={link.from} target="_blacnk" rel="noopener noreferre">
          {link.from}
        </a>
      </p>
      <p>
        Количество кликов по ссылке: <strong>{link.clicks}</strong>
      </p>
      <p>
        Дата создания:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};

export default LinkCard;