import { Box, Typography, Divider, Paper, Stack } from "@mui/material";

const paperStyle = {
  p: 3,
  transition: "all 0.3s ease",
  cursor: "default",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)"
  }
};

export default function About() {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
      {/* HEADER */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Sobre este proyecto
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Diseño, arquitectura y decisiones técnicas detrás de la solución
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Esta plataforma fue desarrollada como una <strong>prueba técnica integral </strong>
        con el objetivo de demostrar la capacidad de diseñar e implementar una
        aplicación moderna, escalable y orientada a la nube, cubriendo tanto
        backend como frontend, con foco en buenas prácticas, experiencia de usuario
        y preparación para entornos productivos.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Stack spacing={3}>
        {/* BACKEND */}
        <Paper sx={paperStyle}>
          <Typography variant="h6" gutterBottom>
            🧠 Arquitectura Backend (Serverless)
          </Typography>
          <Typography variant="body2">
            El backend está construido sobre una arquitectura <strong>serverless en AWS</strong>,
            utilizando API Gateway para exponer endpoints REST y AWS Lambda para
            ejecutar la lógica de negocio. Este enfoque permite escalar automáticamente,
            reducir costos operativos y eliminar la necesidad de administrar servidores.
            <br /><br />
            Los datos se almacenan en <strong>Amazon DynamoDB</strong> bajo un diseño de
            tabla única, complementado con múltiples <strong>Global Secondary Indexes (GSI)</strong>,
            lo que permite consultas eficientes por estado del lanzamiento, cohete,
            plataforma y fecha sin necesidad de scans costosos.
          </Typography>
        </Paper>

        {/* INGESTA */}
        <Paper sx={paperStyle}>
          <Typography variant="h6" gutterBottom>
            🚀 Ingesta de datos
          </Typography>
          <Typography variant="body2">
            La ingesta de información se realiza mediante una función Lambda que
            consume la API pública de SpaceX. Los datos son normalizados antes de
            persistirse, asegurando consistencia y compatibilidad con los índices
            definidos.
            <br /><br />
            El proceso es <strong>idempotente</strong>, lo que permite reejecuciones
            seguras y prepara el sistema para futuras automatizaciones, como
            ejecuciones programadas o pipelines de actualización continua.
          </Typography>
        </Paper>

        {/* FRONTEND */}
        <Paper sx={paperStyle}>
          <Typography variant="h6" gutterBottom>
            🎨 Frontend & Experiencia de Usuario
          </Typography>
          <Typography variant="body2">
            El frontend fue desarrollado con <strong>React + TypeScript</strong>,
            utilizando <strong>Material UI</strong> para asegurar consistencia visual,
            accesibilidad y rapidez de desarrollo.
            <br /><br />
            La interfaz permite:
            <ul>
              <li>Búsqueda en tiempo real</li>
              <li>Filtros combinables (estado, cohete, plataforma, fecha)</li>
              <li>Paginación configurable</li>
              <li>Múltiples vistas: tarjetas, tabla y gráficas</li>
            </ul>
            Todo el filtrado se aplica de forma coherente en listas, tablas y
            visualizaciones.
          </Typography>
        </Paper>

        {/* DATA & UX */}
        <Paper sx={paperStyle}>
          <Typography variant="h6" gutterBottom>
            📊 Visualización, KPIs y UX
          </Typography>
          <Typography variant="body2">
            Se integraron gráficas de Chart.js para analizar tendencias de lanzamientos por año
            y por estado, junto con tarjetas KPI que resumen métricas clave como
            total de lanzamientos, tasa de éxito y último lanzamiento.
            <br /><br />
            Se añadieron <strong>animaciones, efectos hover y transiciones suaves</strong>
            para mejorar la percepción de calidad, sin comprometer el rendimiento.
          </Typography>
        </Paper>

        {/* CI/CD */}
        <Paper sx={paperStyle}>
          <Typography variant="h6" gutterBottom>
            ⚙️ CI/CD y evolución futura
          </Typography>
          <Typography variant="body2">
            El proyecto está preparado para evolucionar hacia un flujo de
            <strong>CI/CD completo</strong> utilizando GitHub Actions.
            <br /><br />
            En etapas posteriores, el backend será containerizado y desplegado en
            <strong>AWS ECS Fargate</strong> mediante <strong>ECR</strong>, habilitando
            despliegues controlados, escalado horizontal y estrategias como
            blue/green deployments.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}
