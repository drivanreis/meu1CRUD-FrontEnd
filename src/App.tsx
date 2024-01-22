import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [usuarios, setUsuarios] = useState([]);

  const renderUsuarios = () => {
    return (
      usuarios.map(({id,nome,ativo,link}) => 
        (
          <div key={id}>
            <p>{nome}</p>
            <p>{ativo ? "ativo" : "inativo"}</p>
            <a href={link}>{link}</a>
          </div>
        )
      )
    )
  }

  useEffect(() => {
    async function fetchUsuarios() {
      const resposta = await fetch('http://localhost:3501/usuarios');
      const dados = await resposta.json();
      setUsuarios(dados.usuarios);
    }

    try {
      fetchUsuarios();
    } catch (error) {
      console.log(error);
    }
      
  },[]);

  const criaUsuario = async () => {
    const resposta = await fetch('http://localhost:3501/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: 'Fulano',
        ativo: true
      })
    });

    const dados = await resposta.json();
    console.log(dados);
  }


  return (
    <div className="App">
      { renderUsuarios() }
      <button onClick={criaUsuario}>Criar usuário</button>
    </div>
  )
}

export default App
