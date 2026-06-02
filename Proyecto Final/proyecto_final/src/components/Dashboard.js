"use client";

import { useState, useEffect } from "react";

export default function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Cargar los proyectos del usuario al entrar
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error("Error al cargar proyectos:", err);
      }
    }
    fetchProjects();
  }, []);

  // 2. Manejar el envío del formulario para guardar un nuevo proyecto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Hubo un error al guardar");
      }

      // Si todo va bien, añadimos el nuevo proyecto a la lista visual y limpiamos los inputs
      setProjects([data, ...projects]);
      setTitle("");
      setDescription("");
      setUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      width: "100%",
      maxWidth: "700px",
      fontFamily: "sans-serif",
      color: "white"
    }}>
      {/* Cabecera de bienvenida */}
      <div style={{ textAlign: "center", borderBottom: "1px solid #333", paddingBottom: "20px" }}>
        <h1 style={{ color: "#0070f3", margin: "0 0 10px 0" }}>¡Bienvenido al Panel de Control!</h1>
        <p style={{ fontSize: "18px", margin: 0 }}>Hola de nuevo, <strong>{user.name}</strong> 👋</p>
      </div>

      {/* Formulario para añadir nuevos proyectos */}
      <form onSubmit={handleSubmit} style={{
        background: "#111",
        border: "1px solid #333",
        padding: "25px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        <h3 style={{ margin: "0 0 5px 0", color: "#0070f3" }}>Añadir Nuevo Proyecto</h3>
        
        {error && <p style={{ color: "#ff3333", margin: 0, fontSize: "14px" }}>⚠️ {error}</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontSize: "14px", color: "#aaa" }}>Título del Proyecto *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Mi portafolio web"
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #444", background: "#222", color: "white" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontSize: "14px", color: "#aaa" }}>Descripción *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explica brevemente de qué trata..."
            rows="3"
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #444", background: "#222", color: "white", resize: "none" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontSize: "14px", color: "#aaa" }}>URL del proyecto (Opcional)</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/..."
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #444", background: "#222", color: "white" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
        >
          {loading ? "Guardando..." : "Guardar Proyecto"}
        </button>
      </form>

      {/* Listado de proyectos guardados */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <h3 style={{ margin: 0, color: "#aaa" }}>Tus Proyectos Guardados ({projects.length})</h3>
        
        {projects.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic", margin: 0 }}>No tienes ningún proyecto creado todavía. ¡Añade el primero arriba!</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {projects.map((project) => (
              <div key={project.id} style={{
                background: "#111",
                border: "1px solid #222",
                padding: "20px",
                borderRadius: "6px"
              }}>
                <h4 style={{ margin: "0 0 8px 0", color: "#fff", fontSize: "18px" }}>{project.title}</h4>
                <p style={{ margin: "0 0 12px 0", color: "#ccc", fontSize: "15px", lineHeight: "1.4" }}>{project.description}</p>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: "#0070f3", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
                    🔗 Ver enlace externo
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}