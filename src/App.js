import React, { useState } from 'react';
import usersData from './users.json';
import UserList from './UserList'; // Importa el componente UserList

import './styles.css'; // Importa el archivo CSS

const App = () => {
  const [name, setName] = useState('');
  const [usuariosBuscados, setUsuariosBuscados] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); // Estado para las fichas seleccionadas

  const buscarUsuarios = () => {
    // Filtrar usuarios por nombre desde los datos cargados del archivo JSON
    const usuariosFiltrados = usersData.users.filter((usuario) =>
      usuario.name.toLowerCase().includes(name.toLowerCase())
    );

    // Actualizar el estado con los usuarios encontrados
    setUsuariosBuscados(usuariosFiltrados);
  };

  const eliminarUsuario = (usuario) => {
    // Filtrar los usuarios no seleccionados
    const usuariosRestantes = usuariosBuscados.filter(
      (u) => u !== usuario
    );

    // Actualizar la lista de usuarios buscados
    setUsuariosBuscados(usuariosRestantes);

    // Quitar el usuario de la lista de seleccionados
    setSelectedUsers(selectedUsers.filter((u) => u !== usuario));
  };

  const toggleUsuarioSeleccionado = (usuario) => {
    // Comprobar si el usuario ya está seleccionado
    const isSelected = selectedUsers.includes(usuario);

    if (isSelected) {
      // Si ya está seleccionado, quitarlo de la lista de seleccionados
      setSelectedUsers(selectedUsers.filter((u) => u !== usuario));
    } else {
      // Si no está seleccionado, agregarlo a la lista de seleccionados
      setSelectedUsers([...selectedUsers, usuario]);
    }
  };

  return (
    <div className="container"> {/* Agregamos un contenedor principal */}
      <h1>Consulta de Usuarios</h1>
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
  