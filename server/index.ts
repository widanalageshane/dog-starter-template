import app from './services/app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Dog API endpoint: http://localhost:${PORT}/api/dogs/random`);
});