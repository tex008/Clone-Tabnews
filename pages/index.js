import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

import React from "react";

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 100,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    console.log(data);
    updatedAtText = {
      updatedAtDate: new Date(data.updated_at).toLocaleString("pt-BR"),
      postgresConnectionsNumber: data.dependencies.database.opened_connections,
      postgresVersion: data.dependencies.database.version,
    };
  }
  return (
    <pre>
      Última atualização:
      <ul>
        <li>
          Data da última atualização:{" "}
          {JSON.stringify(updatedAtText.updatedAtDate)}
        </li>
        <li>
          Número de conexões Postgres:{" "}
          {JSON.stringify(updatedAtText.postgresConnectionsNumber)}
        </li>
        <li>
          Versão Postgres: {JSON.stringify(updatedAtText.postgresVersion)}
        </li>
      </ul>
    </pre>
  );
}

export default function Home() {
  return (
    <>
      <h1>Status: </h1>
      <UpdatedAt />
    </>
  );
}
