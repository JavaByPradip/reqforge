import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState("");

  const sendRequest = async () => {
    try {
      const res = await axios({
        url,
        method
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponse(err.toString());
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 ReqForge</h1>
      <p>Forge Your API Requests</p>

      <select onChange={(e) => setMethod(e.target.value)}>
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>

      <br /><br />

      <input
        style={{ width: "500px" }}
        placeholder="Enter API URL"
        onChange={(e) => setUrl(e.target.value)}
      />

      <br /><br />

      <button onClick={sendRequest}>Send Request</button>

      <h3>Response:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default App;