import React, { useState, useEffect } from 'react';
//useEffect 
import './App.css';
import { getProblemList } from './api/problems';

import ProblemDetail from './ProblemDetail';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {

  const [problems, setProblems] = useState([]);

  
  useEffect(function () {
    async function getProblems() {
      const data = await getProblemList();
      setProblems(data);
    }
    getProblems();
  }, []); // dependency..

  return (
    <Router>
      <div className="App">
        <Route path="/" exact>

          <>
            <nav>
              CODEWARS
        </nav>
            <ul>
              {
                problems.map(function (problem) {
                  return (<li key={problem.id}><h3>{problem.title}</h3>
                    <Link to={`/problems/${problem._id}`}>
                      <button>문제 풀기</button>
                    </Link>

                  </li>
                  );
                })
              }
            </ul>

          </>


        </Route>
        <Route path="/problems/:problem_id"
          render={routerProps=>{
            const problemId= routerProps.match.params.problem_id;
            const [selectedProblem] = problems.filter(data => data._id === problemId);
            return ( <ProblemDetail problem={selectedProblem} />);
          }}>
          
        </Route>
      </div>
    </Router>
  );
}

export default App;
