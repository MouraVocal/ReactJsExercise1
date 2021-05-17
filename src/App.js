import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

const [repositories, setRepositories] = useState([]);

useEffect(() => {
  async function getData(){
    const data = await api.get('/repositories');
    setProjects(data);
  }
}, []);

function App() {
  async function handleAddRepository() {
    const response = await api.post('projects', {
      //{ id: uuid(), title, url, techs, likes: 0 }
      title: `Repositório ${Date.now()}`,
      url: 'github.com',
      techs: 'reactjs, nodejs',
    });

    const repository = response.data;

    setProjects([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`, () => {
      data.filter((data)=>{
        data.id != id
      })
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          data.map((data) => {
            <li id={data.id}>
              <div>{data.title}</div>
              <button onClick={() => handleRemoveRepository(data.id)}>
                Remover
              </button>
            </li>
          })
        }        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
