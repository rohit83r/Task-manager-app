import app from './app';
import { setupSwagger } from './swagger';

setupSwagger(app);

const PORT = process.env.PORT || 3000;

app.listen(3000,'0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
