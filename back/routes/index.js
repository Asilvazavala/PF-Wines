const axios = require('axios');
const express = require('express');
const router = express();

const getApiInfo = async () => {
  const apiUrl = await axios.get('https://api.sampleapis.com/wines/reds');
  const getAllInfo = await apiUrl.data.map(el => {
    return {
      id: el.id,
      wine: el.wine,
      winery: el.winery,
      image: el.image,
      location: el.location
    }
  })
  return getAllInfo;
} 

//SEARCH A WINE BY NAME
router.get('/winess', async (req, res) => {
  const wineName = req.query.name;
  const allWines = await getApiInfo();

  if (wineName) {
    const searchWine = await allWines.filter(el => 
      el.wine.toLowerCase().includes(wineName.toLowerCase()));

      searchWine.length > 0 ?
      res.send(searchWine) :
      res.status(404).send('Wine not found, try with another');
      } else {
          res.send(allWines);
        }
  });

const PORT = 3002;
router.listen(PORT, (req, res) => {
  console.log(`Server listening at port ${PORT}...`);
});

module.exports = router;