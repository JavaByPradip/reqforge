import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [activeTab, setActiveTab] = useState("headers");

  const sendRequest = async () => {
    try {
      const parsedHeaders = headers ? JSON.parse(headers) : {};
      const parsedBody = body ? JSON.parse(body) : {};

const res = await axios.post("http://localhost:8080/proxy", {
  url,
  method,
  headers: parsedHeaders,
  body: parsedBody
});

      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      if (err.response) {
        setResponse(JSON.stringify(err.response.data, null, 2));
      } else {
        setResponse(err.message);
      }
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ color: "#38bdf8" }}>🔥 ReqForge</h1>
      <p>Forge Your API Requests</p>

      <div style={{ marginBottom: "10px" }}>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          style={{ width: "400px", padding: "8px" }}
          placeholder="Enter API URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
  <button onClick={() => setActiveTab("headers")} style={{ marginRight: "10px" }}>
    Headers
  </button>
  <button onClick={() => setActiveTab("body")}>
    Body
  </button>
</div>

{activeTab === "headers" && (
  <textarea
    style={{ width: "600px", height: "80px", padding: "8px", marginTop: "10px" }}
    placeholder='Headers (JSON)'
    value={headers}
    onChange={(e) => setHeaders(e.target.value)}
  />
)}

{activeTab === "body" && (
  <textarea
    style={{ width: "600px", height: "120px", padding: "8px", marginTop: "10px" }}
    placeholder='Body (JSON)'
    value={body}
    onChange={(e) => setBody(e.target.value)}
  />
)}

      <button
        onClick={sendRequest}
        style={{
          padding: "10px 20px",
          backgroundColor: "#38bdf8",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Send Request
      </button>

      <h3 style={{ marginTop: "20px" }}>Response:</h3>

      <pre
        style={{
          backgroundColor: "#1e293b",
          padding: "10px",
          overflowX: "auto",
          maxHeight: "400px"
        }}
      >
        {response}
      </pre>
    </div>
  );
}

export default App;