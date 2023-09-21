const api = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto', {
      params: {
        // Aquí puedes agregar parámetros si los necesitas
      },
      headers: {
        // Aquí puedes agregar encabezados para autenticación u otras necesidades
      }
    });

    if (response.status === 200) {
      console.log('Obteniendo datos...');
      const game_indices = response.data.game_indices.map(game_indices => game_indices.version.name);
      document.getElementById('container').innerHTML = game_indices.join(' - ');
      console.log('Habilidades:', game_indices);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
      console.log(response.request);
    } else {
      console.log('No se obtuvo un estado 200 OK');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

api();
