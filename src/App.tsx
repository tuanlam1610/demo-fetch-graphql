/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

const endpoint = "https://graphql-seminar.onrender.com/graphql/";
const FILMS_QUERY = `
  {
    getProjects{
      id
      name
    }
  }
`;

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios({
        url: endpoint,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          query: FILMS_QUERY,
        },
      });
      return res.data.data.getProjects;
    },
  });

  if (isLoading) return "Loading...";
  if (error) return <>{error.message}</>;

  return (
    <div className="app">
      <h4>Projects</h4>
      <ul>
        {data.map((project: any) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
