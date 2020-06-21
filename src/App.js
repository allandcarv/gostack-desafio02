import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(res => setRepositories(res.data))
      .catch(error => console.error(error));
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories');
      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.error('Error on add repository');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      const tmpRepositories = [...repositories];
      tmpRepositories.splice(repositoryIndex, 1);
      setRepositories([...tmpRepositories]);

    } catch (error) {
      console.error('Error on delete repository');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
