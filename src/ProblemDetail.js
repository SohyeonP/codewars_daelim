
import CodeMirror from 'react-codemirror'
import React, { useState } from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import {postUserSoultion} from './api/problems';


export default function ProblemDetail({ problem }) {
    const [code,setCode] = useState("");
    const [isModalShowing,setIsModalShowing] = useState(false);
    const [codeResult, setCodeResult]=useState("");
    console.log(code);

async function validateAnswer(){
   
        postUserSoultion(problem._id,code).then(data =>{
            setIsModalShowing(true);
           if(data.result !== '에러'){
               setCodeResult(data.result);
           
           }else{
              setCodeResult(data.detail);
           }
        })
    }
    return (
      <div className="problem">
        { isModalShowing &&
        <div>
          <div className="modal-overlay"
          onClick={()=>setIsModalShowing(false)}>Close</div>
          <div className="modal">
              { codeResult }
         
        </div>
        </div>
        }
        <section className="description">
          <h3>{problem.title}</h3>
          <p>{problem.description}</p>
        </section>
        <section className ="code-editor">
          <CodeMirror 
          onChange={function onChange(newValue){
              setCode(newValue);
          }}
          value ={'function solution(){}'}
            options={{
              mode: 'javascript'
            }} />
          <button onClick={()=>validateAnswer()}>제출</button>
        </section>
      </div>
    );
  }