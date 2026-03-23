import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");

  const sendRequest = async () => {
    try {
      const parsedHeaders = headers ? JSON.parse(headers) : {};
      const parsedBody = body ? JSON.parse(body) : {};

      const res = await axios({
        url,
        method,
        headers: parsedHeaders,
        data: parsedBody
      });

      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponse(err.toString());
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 ReqForge</h1>

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

      <textarea
        style={{ width: "500px", height: "80px" }}
        placeholder='Headers (JSON format)'
        onChange={(e) => setHeaders(e.target.value)}
      />

      <br /><br />

      <textarea
        style={{ width: "500px", height: "100px" }}
        placeholder='Body (JSON format)'
        onChange={(e) => setBody(e.target.value)}
      />

      <br /><br />

      <button onClick={sendRequest}>Send Request</button>

      <h3>Response:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default App;