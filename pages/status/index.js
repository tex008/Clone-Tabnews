import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

import React from "react";

function StatusDetails() {
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
      postgresMaxConnectionsNumber: data.dependencies.database.max_connections,
    };
  }
  return (
    <pre>
      Última atualização:
      <h2>Detalhes:</h2>
      <p>
        Data da última atualização:{" "}
        {JSON.stringify(updatedAtText.updatedAtDate)}
      </p>
      <h2>Database:</h2>
      <ul>
        <li>
          Número de conexões Postgres:{" "}
          {JSON.stringify(updatedAtText.postgresConnectionsNumber)}
        </li>
        <li>
          Número máximo de conexões Postgres:{" "}
          {JSON.stringify(updatedAtText.postgresMaxConnectionsNumber)}
        </li>
        <li>
          Versão Postgres: {JSON.stringify(updatedAtText.postgresVersion)}
        </li>
      </ul>
    </pre>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>Status: </h1>
      <StatusDetails />
    </>
  );
}
