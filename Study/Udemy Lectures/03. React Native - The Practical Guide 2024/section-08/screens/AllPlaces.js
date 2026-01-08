import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { fetchPlaces } from '../utils/database';

import PlacesList from '../components/Places/PlacesList';

function AllPlaces() {
  const isFocused = useIsFocused();

  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();

      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();

      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
