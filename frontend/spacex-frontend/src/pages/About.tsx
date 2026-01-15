import {
  Box,
  Typography,
  Divider,
  Paper,
  Stack,
} from "@mui/material";

const sectionCard = {
  p: 3,
  borderRadius: 3,
  backgroundColor: "background.paper",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 15px 40px rgba(30,136,229,0.25)",
  },
};

export default function About() {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
      {/* HEADER */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ letterSpacing: "0.08em" }}
          gutterBottom
        >
          SOBRE EL PROYECTO
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ letterSpacing: "0.12em" }}
        >
          Arquitectura, diseño y decisiones técnicas
        </Typography>
      </Box>

      {/* INTRO */}
      <Typography variant="body1" sx={{ mb: 4 }}>
        Esta plataforma fue desarrollada como una{" "}
        <strong>prueba técnica integral</strong> con el
        objetivo de demostrar la capacidad de diseñar e
        implementar una aplicación moderna, escalable y
        orientada a la nube, cubriendo tanto backend como
        frontend, con un fuerte enfoque en buenas prácticas,
        experiencia de usuario y preparación para entornos
        productivos.
      </Typography>

      <Divider sx={{ mb: 5 }} />

      <Stack spacing={4}>
        {/* BACKEND */}
        <Paper sx={sectionCard}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ letterSpacing: "0.06em" }}
          >
            🧠 Arquitectura Backend (Serverless)
          </Typography>

          <Typography variant="body2" color="text.secondary">
            El backend está construido sobre una{" "}
            <strong>arquitectura serverless en AWS</strong>,
            utilizando API Gateway para exponer endpoints REST
            y AWS Lambda para ejecutar la lógica de negocio.
            <br />
            <br />
            Los datos se almacenan en{" "}
            <strong>Amazon DynamoDB</strong> bajo un diseño de
            tabla única, complementado con múltiples{" "}
            <strong>Global Secondary Indexes (GSI)</strong>,
            lo que permite realizar consultas eficientes por
            estado del lanzamiento, cohete, plataforma y fecha
            sin necesidad de realizar scans costosos.
          </Typography>
        </Paper>

        {/* INGESTA */}
        <Paper sx={sectionCard}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ letterSpacing: "0.06em" }}
          >
            🚀 Ingesta de datos
          </Typography>

          <Typography variant="body2" color="text.secondary">
            La ingesta de información se realiza mediante una
            función AWS Lambda que consume la API pública de
            SpaceX. Los datos son normalizados antes de ser
            persistidos, garantizando consistencia y
            compatibilidad con los índices definidos.
            <br />
            <br />
            El proceso es <strong>idempotente</strong>, lo que
            permite reejecuciones seguras y prepara el sistema
            para futuras automatizaciones, como ejecuciones
            programadas o pipelines de actualización continua.
          </Typography>
        </Paper>

        {/* FRONTEND */}
        <Paper sx={sectionCard}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ letterSpacing: "0.06em" }}
          >
            🎨 Frontend y Experiencia de Usuario
          </Typography>

          <Typography variant="body2" color="text.secondary">
            El frontend fue desarrollado utilizando{" "}
            <strong>React + TypeScript</strong>, apoyado en{" "}
            <strong>Material UI</strong> para garantizar
            consistencia visual, accesibilidad y rapidez en el
            desarrollo.
            <br />
            <br />
            La interfaz permite:
            <ul>
              <li>Búsqueda en tiempo real</li>
              <li>Filtros combinables (estado, cohete, plataforma, fecha)</li>
              <li>Paginación configurable</li>
              <li>Vistas múltiples: tarjetas, tabla y gráficas</li>
            </ul>
            Todos los filtros se aplican de forma coherente en
            listas, tablas y visualizaciones.
          </Typography>
        </Paper>

        {/* DATA & UX */}
        <Paper sx={sectionCard}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ letterSpacing: "0.06em" }}
          >
            📊 Visualización de datos, KPIs y UX
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Se integraron gráficas con Chart.js para analizar
            tendencias de lanzamientos por año y por estado,
            junto con tarjetas KPI que resumen métricas clave
            como el total de lanzamientos, la tasa de éxito y
            el último lanzamiento registrado.
            <br />
            <br />
            Se añadieron animaciones, efectos hover y
            transiciones suaves para mejorar la percepción de
            calidad sin comprometer el rendimiento.
          </Typography>
        </Paper>

        {/* CI/CD */}
        <Paper sx={sectionCard}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ letterSpacing: "0.06em" }}
          >
            ⚙️ CI/CD y evolución futura
          </Typography>

          <Typography variant="body2" color="text.secondary">
            El proyecto está diseñado para evolucionar hacia
            un flujo completo de{" "}
            <strong>CI/CD mediante GitHub Actions</strong>.
            <br />
            <br />
            En etapas posteriores, el backend será
            containerizado y desplegado en{" "}
            <strong>AWS ECS Fargate</strong> a través de{" "}
            <strong>Amazon ECR</strong>, permitiendo despliegues
            controlados, escalado horizontal y estrategias
            avanzadas como despliegues blue/green.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}
