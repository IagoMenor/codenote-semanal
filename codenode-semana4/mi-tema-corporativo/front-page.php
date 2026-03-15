Aquí tienes el código completo y corregido. He modificado la parte del JavaScript para que combine tanto la "Descripción Corta" de ACF (que ya te funcionaba) como el Contenido Principal (el texto largo que escribiste en el editor de WordPress), tal como se ve en tus capturas de pantalla.

Copia y sustituye todo el contenido de tu archivo front-page.php con esto:

PHP
<?php get_header(); ?>

<section class="hero">
    <div class="hero-content">
        <h1>Soluciones Profesionales para tu Negocio</h1>
        <p>Ayudamos a empresas a escalar sus resultados con tecnología de vanguardia.</p>
        <a href="#contacto" style="background: var(--primary); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; transition: 0.3s;">Saber más</a>
    </div>
</section>

<section class="services-container">
    <h2 style="text-align: center; font-size: 2.5rem; color: var(--dark); margin-bottom: 10px;">Nuestros Servicios</h2>
    <p style="text-align: center; color: var(--text); margin-bottom: 40px;">Especialistas en impulsar tu transformación digital</p>
    
    <div class="services-grid">
        <div class="card">
            <h3>Consultoría IT</h3>
            <p>Optimizamos tus procesos tecnológicos para mejorar la eficiencia operativa y reducir costes innecesarios.</p>
        </div>

        <div class="card">
            <h3>Desarrollo a Medida</h3>
            <p>Creamos software robusto, escalable y adaptado exactamente a las necesidades específicas de tu empresa.</p>
        </div>

        <div class="card">
            <h3>Ciberseguridad</h3>
            <p>Protegemos tus activos más valiosos y datos críticos con los estándares de seguridad más altos del mercado.</p>
        </div>
    </div>
</section>

<section class="container" style="padding: 60px 0; background: #f9f9f9; border-radius: 20px; margin-top: 40px;">
    <h2 style="text-align: center; color: var(--dark); margin-bottom: 10px; font-size: 2.2rem;">Casos de Éxito</h2>
    <p style="text-align: center; color: var(--text); margin-bottom: 40px;">Listado dinámico cargado mediante REST API</p>
    
    <div id="contenedor-proyectos" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; padding: 0 20px;">
        <p style="text-align: center; grid-column: 1 / -1;">Cargando proyectos...</p>
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('contenedor-proyectos');
    
    const apiURL = window.location.origin + '/practicas-wordpress/wp-json/wp/v2/proyecto';

    console.log("🚀 Intentando conectar a:", apiURL);

    fetch(apiURL)
        .then(response => {
            if (!response.ok) throw new Error('Error en respuesta: ' + response.status);
            return response.json();
        })
        .then(data => {
            lista.innerHTML = ''; 

            if (data.length === 0) {
                lista.innerHTML = '<p style="text-align:center; grid-column:1/-1;">No se encontraron proyectos publicados.</p>';
                return;
            }

            data.forEach(p => {
                const card = document.createElement('div');
                card.style.cssText = 'background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border-top: 4px solid #0073aa; margin-bottom: 10px;';
                
                const titulo = p.title.rendered;
                // Obtenemos el campo de ACF
                const descCorta = (p.acf && p.acf.descripcion_corta) ? p.acf.descripcion_corta : '';
                // Obtenemos el texto largo del editor principal
                const contenidoLargo = p.content.rendered;

                card.innerHTML = `
                    <h3 style="margin-top: 0; color: #333;">${titulo}</h3>
                    <p style="color: #0073aa; font-weight: 600; font-size: 0.9rem; margin-bottom: 10px;">${descCorta}</p>
                    <div style="color: #666; line-height: 1.6; font-size: 0.95rem;">
                        ${contenidoLargo}
                    </div>
                `;
                lista.appendChild(card);
            });
        })
        .catch(err => {
            console.error('❌ ERROR:', err);
            lista.innerHTML = '<p style="text-align:center; grid-column:1/-1;">Error de conexión.</p>';
        });
});
</script>

<?php get_footer(); ?>