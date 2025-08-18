import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

function App() {
  const [progress, setProgress] = useState(0);
  let apiKey = process.env.REACT_APP_NEWS_API;

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar color="#f11946" progress={progress} />
        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={setProgress}
                key="general"
                pageSize={6}
                apiKey={apiKey}
                category="general"
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                pageSize={6}
                apiKey={apiKey}
                category="business"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                pageSize={6}
                apiKey={apiKey}
                category="entertainment"
              />
            }
          />

          <Route
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                pageSize={6}
                apiKey={apiKey}
                category="health"
              />
            }
          />
          <Route
            path="/general"
            element={
              <News
                setProgress={setProgress}
                key="general"
                pageSize={6}
                apiKey={apiKey}
                category="general"
              />
            }
          />

          <Route
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                pageSize={6}
                apiKey={apiKey}
                category="science"
              />
            }
          />

          <Route
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                pageSize={6}
                apiKey={apiKey}
                category="sports"
              />
            }
          />

          <Route
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                pageSize={6}
                apiKey={apiKey}
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
