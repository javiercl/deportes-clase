import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import ErrorForm from '../components/ErrorForm'

function Login() {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de autenticación
    console.log('Datos del formulario:', formData);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className='container-login'>
      <div className='login-card'>
        <div className='login-header'>
          <h1>Bienvenido</h1>
          <p>Inicia sesión para continuar</p>
        </div>
        
        <form className='form-login' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="usuario">Usuario</label>
            <input 
              type="text" 
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder='Ingresa tu usuario'
           
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
              placeholder='Ingresa tu contraseña'
              required
            />
          </div>

          <button type='submit' className='btn-login'>
            Iniciar Sesión
          </button>

          <div className='login-footer'>
            <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
            <Link to="/forgot-password" className='forgot-password'>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login