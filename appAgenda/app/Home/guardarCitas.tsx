import React, { useState } from "react";
import "./guardarCitas.css"; // Importamos la hoja de estilos

const Formulario: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    servicio: "",
    cita: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    servicio: "",
    cita: "",
  });

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email inválido";
        }
        break;
      case "telefono":
        if (!/^\d{3}-\d{7}$/.test(value)) {
          error = "Formato: Código de área - Número de teléfono";
        }
        break;
      default:
        if (!value) {
          error = "Este campo es obligatorio";
        }
        break;
    }
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar todos los campos antes de enviar
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        validateField(key, formData[key as keyof typeof formData]);
        isValid = false;
      }
    });
    if (isValid) {
      console.log(formData);
      // Aquí puedes manejar el envío del formulario
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2 className="titulo">Formulario de Contacto</h2>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        {errors.nombre && <span className="error">{errors.nombre}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          name="apellido"
          id="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        {errors.apellido && <span className="error">{errors.apellido}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Número de teléfono</label>
        <input
          type="tel"
          name="telefono"
          id="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Código de área - Número de teléfono"
          required
        />
        {errors.telefono && <span className="error">{errors.telefono}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@ejemplo.com"
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="servicio">¿Cuál es el servicio de su interés?</label>
        <textarea
          name="servicio"
          id="servicio"
          value={formData.servicio}
          onChange={handleChange}
          placeholder="Escribe aquí..."
          required
        />
        {errors.servicio && <span className="error">{errors.servicio}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="cita">Agende una cita</label>
        <input
          type="datetime-local"
          name="cita"
          id="cita"
          value={formData.cita}
          onChange={handleChange}
          required
        />
        {errors.cita && <span className="error">{errors.cita}</span>}
      </div>
      <button
        type="submit"
        className="btn-submit"
        disabled={
          !formData.nombre ||
          !formData.apellido ||
          !formData.telefono ||
          !formData.email ||
          !formData.servicio ||
          !formData.cita ||
          Object.values(errors).some((error) => error !== "")
        }
      >
        Enviar
      </button>
    </form>
  );
};

export default Formulario;
