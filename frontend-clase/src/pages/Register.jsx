import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    usuario: '',
    password: '',
    confirmarPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de registro
    console.log('Datos del formulario:', formData);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className='container-register'>
      <div className='register-card'>
        <div className='register-header'>
          <h1>Crear Cuenta</h1>
          <p>Regístrate para comenzar</p>
        </div>
        
        <form className='form-register' onSubmit={handleSubmit}>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder='Tu nombre'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor="apellido">Apellido</label>
              <input 
                type="text" 
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder='Tu apellido'
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='tu@email.com'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="usuario">Nombre de Usuario</label>
            <input 
              type="text" 
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder='Elige un nombre de usuario'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Crea una contraseña segura'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
            <input 
              type="password" 
              id="confirmarPassword"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
              placeholder='Confirma tu contraseña'
              required
            />
          </div>

          <button type='submit' className='btn-register'>
            Crear Cuenta
          </button>

          <div className='register-footer'>
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register 