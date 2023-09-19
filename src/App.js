import React, { useState } from 'react';
import usersData from './users.json';
import UserList from './UserList';

import './styles.css';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [usuariosBuscados, setUsuariosBuscados] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const buscarUsuarios = () => {

    const usuariosFiltrados = usersData.users.filter((usuario) =>
      usuario.name.toLowerCase().includes(name.toLowerCase())
    );


    setUsuariosBuscados(usuariosFiltrados);
  };

  const eliminarUsuario = (usuario) => {
    const usuariosRestantes = usuariosBuscados.filter(
      (u) => u !== usuario
    );

    setUsuariosBuscados(usuariosRestantes);


    setSelectedUsers(selectedUsers.filter((u) => u !== usuario));
  };

  const toggleUsuarioSeleccionado = (usuario) => {
    const isSelected = selectedUsers.includes(usuario);

    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((u) => u !== usuario));
    } else {
      setSelectedUsers([...selectedUsers, usuario]);
    }
  };

  return (
    <div className="container"> {}
      <h1 className='titulo'>Consulta de Usuarios</h1>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="button" onClick={buscarUsuarios}>
          Buscar Usuarios
        </button>
      </div>
      <div className="user-container">
        <div className="user-list">
          <UserList
            users={usuariosBuscados}
            onUserClick={toggleUsuarioSeleccionado}
            onDeleteUser={eliminarUsuario} // Pasa la función eliminarUsuario como prop
          />
        </div>
        <div className="user-details">
          {selectedUsers.map((usuario, index) => (
            <div key={index} className="user-card">
              <p>{`Nombre: ${usuario.name}`}</p>
              <p>{`Apellido: ${usuario['last name']}`}</p>
              <p>{`Teléfono: ${usuario.telefono}`}</p>
              <p>{`Cargo: ${usuario.cargo}`}</p>
              <p>{`Cédula: ${usuario.cedula}`}</p>
              <p>{`Edad: ${usuario.edad}`}</p>
              <button className="button" onClick={() => eliminarUsuario(usuario)}>
                Eliminar Usuario
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
