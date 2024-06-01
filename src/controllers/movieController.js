const constants = require('../utils/constants');
const crudService = require("../services/crudService");
const { getImagesFromS3 } = require('../services/aws/s3Service')
const {transformMapToList} = require('../utils/DynamoDBUpdaterUtil')

const createMovie = async (req, res) => {
  try {
    // Extract data from request
    const movieData = req.body;
    movieData.newArrival = true;

    let code =  await crudService.generateOrderNumber(constants.MOVIE_TABLE);
    movieData.code = code;
   
    const newMovie = await crudService.create(constants.MOVIE_TABLE, movieData);

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the Movie.' });
  }
};

const findById = async (req, res) => {
  try {
    const { id,sucursalId } = req.params;

    const movies = await crudService.findByIdAndSucursalId(constants.CAR_PART_TABLE, id,sucursalId);

    const newList = await composemovieData(movies);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

const findMoviesBySucursalId = async (req, res) => {
  try {

    const { sucursalId } = req.params;

    const movies = await crudService.findBySucursalId(constants.MOVIE_TABLE, sucursalId);
    const newList = await composemovieData(movies);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};





const findSpecialOfferBySucursalId = async (req, res) => {
  try {

    const { sucursalId } = req.params;

    const movies = await crudService.findSpecialOfferBySucursalId(constants.CAR_PART_TABLE, sucursalId);
    const newList = await composemovieData(movies);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

async function composemovieData(movies) {
  const newList = [];
  for (let index = 0; index < movies.length; index++) {
    const movie = movies[index];
       let filenames = transformMapToList(movie.filenames);
    let tags = transformMapToList(movie.tags);
    let mappedFilenames = filenames.map(fn => fn.url);
    movie.tags = tags;
    movie.filenames = await getImagesFromS3(mappedFilenames);
    newList.push(movie);
  }
  return newList;
}



const updateMovie = async (req, res) => {

  try {
    // Extract car part ID and updated data from request
    const { movieId, createdAt } = req.params;
    const movieData = req.body;

    // Call the movieService.updateMovie method
    const updatedMovie = await crudService.update(constants.MOVIE_TABLE, movieId, createdAt, movieData);

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the movie.' });
  }
};

const deleteMovie = async (req, res) => {
  try {
    // Extract car part ID from request
    const { movieId, createdAt } = req.params;
    // Call the movieService.deleteMovie method
    await crudService.deleteRow(constants.MOVIE_TABLE, movieId, createdAt);
    res.status(200).json({ message: 'Car part deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while deleting the car part.', error });
  }
};

module.exports = {
  createMovie, deleteMovie,
  updateMovie,
  findMoviesBySucursalId,
  findById,
};

