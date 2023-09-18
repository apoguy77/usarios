import React, { useState } from 'react';
import usersData from './users.json';

function UserConsulta() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);

  const consultarUsuarioUnico = () => {
    // Buscar el usuario por ID en los datos
    const usuario = usersData.users.find((user) => user.id === parseInt(userId, 10));

    // Si se encontró el usuario, actualizar el estado
    if (usuario) {
      setUserData(usuario);
    } else {
      // Si el usuario no se encontró, establecer userData como nulo
      setUserData(null);
    }
  };

  return (
    <div>
      <h1>Consulta de Usuario Único</h1>
      <input
        type="number"
        placeholder="ID de usuario"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={consultarUsuarioUnico}>Consultar</button>
      {userData && (
        <div className="user-card">
          <p>{`Nombre: ${userData.name}`}</p>
          <p>{`Apellido: ${userData['last name']}`}</p>
          <p>{`Teléfono: ${userData.telefono}`}</p>
          <p>{`Cargo: ${userData.cargo}`}</p>
          <p>{`Cédula: ${userData.cedula}`}</p>
          <p>{`Edad: ${userData.edad}`}</p>
        </div>
      )}
      {userData === null && <p>Usuario no encontrado</p>}
    </div>
  );
}

export default UserConsulta;
