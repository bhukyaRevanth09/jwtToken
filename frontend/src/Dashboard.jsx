
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import api from "../apicontroller/apiCenter";

function Dashboard() {
  const [obtainedData, setObtainedData] = useState(null);

  useEffect(() => {
    async function ragApiCall() {
      try {
        const response = await api.get("/ragDetails");

        console.log("RAG DATA:", response.data);

        setObtainedData(response?.data?.message);
      } catch (error) {
        console.error("Failed to fetch RAG details:", error);
      }
    }

    ragApiCall();
  }, []);

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>RAG Dashboard</h1>
          <p>Monitor your knowledge base and chatbot activity.</p>
        </div>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">📄</div>

          <div>
            <p>Total Documents</p>
            <h2>{obtainedData?.documents ?? 0}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🧩</div>

          <div>
            <p>Total Chunks</p>
            <h2>{obtainedData?.chunks ?? 0}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔢</div>

          <div>
            <p>Embeddings</p>
            <h2>{obtainedData?.embeddings ?? 0}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💬</div>

          <div>
            <p>Questions Asked</p>
            <h2>{obtainedData?.totalQuestion ?? 0}</h2>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;

