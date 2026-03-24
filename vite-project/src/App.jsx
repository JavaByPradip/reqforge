import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [activeTab, setActiveTab] = useState("headers");
  const [history, setHistory] = useState([]);

  const sendRequest = async () => {
    try {
      const parsedHeaders = headers ? JSON.parse(headers) : {};
      const parsedBody = body ? JSON.parse(body) : {};

const res = await axios.post("https://reqforge-backend.onrender.com/proxy", {
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

  useEffect(() => {
  fetchHistory();
}, []);

const fetchHistory = async () => {
  try {
    const res = await axios.get("https://reqforge-backend.onrender.com/proxy/history");
    setHistory(res.data);
  } catch (err) {
    console.error(err);
  }
};


const loadHistory = (item) => {
  setUrl(item.url);
  setMethod(item.method);
  setActiveTab(item.body ? "body" : "headers");
  try {
  const parsedHeaders = JSON.parse(item.headers);
  setHeaders(JSON.stringify(parsedHeaders, null, 2));
} catch {
  setHeaders(item.headers || "");
}
  try {
  const parsedBody = JSON.parse(item.body);
  setBody(JSON.stringify(parsedBody, null, 2));
} catch {
  setBody(item.body || "");
}
  try {
  const parsed = JSON.parse(item.response);
  setResponse(JSON.stringify(parsed, null, 2));
} catch {
  setResponse(item.response || "");
}
};

const clearForm = () => {
  setUrl("");
  setMethod("GET");
  setHeaders("");
  setBody("");
  setResponse("");
};


return (
  <div style={{ display: "flex" }}>

    {/* 🔥 Sidebar */}
    <div style={{
      width: "250px",
      background: "#020617",
      padding: "10px",
      borderRight: "1px solid #334155",
      height: "100vh",
      overflowY: "auto"
    }}>
      <h3 style={{ color: "#38bdf8" }}>History</h3>

      {history.map((item, index) => (
        <div
          key={index}
          onClick={() => loadHistory(item)}
          style={{
            padding: "8px",
            marginBottom: "5px",
            cursor: "pointer",
            background: "#1e293b",
            borderRadius: "5px"
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            {item.method}
          </div>

          <div style={{
            fontSize: "12px",
            color: "#94a3b8"
          }}>
            {item.url.substring(0, 25)}...
          </div>

          <div style={{
            color: item.status === 200 ? "lightgreen" : "red",
            fontSize: "12px"
          }}>
            {item.status}
          </div>
        </div>
      ))}
    </div>

    {/* 🔥 Main Content */}
    <div
      style={{
        flex: 1,
        padding: "20px",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ color: "#38bdf8" }}>🔥 ReqForge</h1>

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
          fontWeight: "bold",
          marginTop: "10px"
        }}
      >
        Send Request
      </button>
      <button
  onClick={clearForm}
  style={{
    padding: "10px 20px",
    backgroundColor: "#ef4444",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "10px"
  }}
>
  New Request
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
  </div>
);
}

export default App;