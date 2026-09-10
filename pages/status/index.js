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
    updatedAtText = (
      <pre>
        Última atualização:
        <h2>Detalhes:</h2>
        <p>
          Data da última atualização:{" "}
          {new Date(data.updated_at).toLocaleString("pt-BR")}
        </p>
        <h2>Database:</h2>
        <ul>
          <li>
            Número de conexões Postgres:{" "}
            {JSON.stringify(data.dependencies.database.opened_connections)}
          </li>
          <li>
            Número máximo de conexões Postgres:{" "}
            {JSON.stringify(data.dependencies.database.max_connections)}
          </li>
          <li>
            Versão Postgres:{" "}
            {JSON.stringify(data.dependencies.database.version)}
          </li>
        </ul>
      </pre>
    );
  }

  return updatedAtText;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status: </h1>
      <StatusDetails />
    </>
  );
}
