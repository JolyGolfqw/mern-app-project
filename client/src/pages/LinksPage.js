import React, { useCallback, useContext, useEffect, useState } from "react";
import LinksList from "../components/LinksList";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

const LinksPage = () => {
  const [Links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }
  return <>{!loading && <LinksList Links={Links} />}</>;
};

export default LinksPage;