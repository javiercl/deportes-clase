import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import ErrorForm from '../components/ErrorForm'

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.usuario,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Login exitoso
        console.log('Login exitoso:', data);
        // Guardar datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirigir al home
        navigate('/');
      } else {
        // Error en el login
        setError(data.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
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
        
        {error && <ErrorForm message={error} />}
        
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
              placeholder='Ingresa tu contraseña'
              required
            />
          </div>

          <button 
            type="submit" 
            className='btn-login'
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
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