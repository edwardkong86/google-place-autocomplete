import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelected,
  selectHistories
} from '../stores/placeSearchSlice'

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };
const placeService = { current: null };

export default function GoogleMaps() {
  const dispatch = useDispatch();
  const histories = useSelector(selectHistories);

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  const fetchPlace = React.useMemo(
    () =>
      throttle((request, callback) => {
        placeService.current.getDetails(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions([...histories, ...(value ? [value] : [])]);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions([...histories, ...newOptions]);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  React.useEffect(() => {
    let active = true;

    console.log(placeService.current)
    if(value != null)
      {
    if (!placeService.current && window.google) {
        placeService.current =
          new window.google.maps.places.PlacesService(document.createElement('div'));
      }
      if (!placeService.current) {
        return undefined;
      }
        fetchPlace({ placeId: value.place_id }, (placeObject) => {
          if (active) {
            dispatch(setSelected({...value, placeName: placeObject.name, placeAddress: placeObject.formatted_address, lat: placeObject.geometry.location.lat(), lng: placeObject.geometry.location.lng(), icon: placeObject.icon}))
            }
        });
      }

    return () => {
      active = false;
    };
  }, [value]);

  return (
      <div className="googleMapAutoComplete">
        <Autocomplete
        id="google-map-demo"
        sx={{ width: '100%', margin:1 }}
        getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        groupBy={(option) => option.history ? "Recently Search" : "Suggestion"}
        onChange={(event, newValue, reason) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
            if(reason === 'clear'){
                dispatch(setSelected(null))
            }
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
            <TextField {...params} label="Search your location" fullWidth />
        )}
        renderOption={(props, option) => {
            const matches = option.structured_formatting.main_text_matched_substrings;
            const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length]),
            );

            return (
            <li {...props}>
                <Grid container alignItems="center">
                <Grid item>
                    <Box
                    component={LocationOnIcon}
                    sx={{ color: 'text.secondary', mr: 2 }}
                    />
                </Grid>
                <Grid item xs>
                    {parts.map((part, index) => (
                    <span
                        key={index}
                        style={{
                        fontWeight: part.highlight ? 700 : 400,
                        }}
                    >
                        {part.text}
                    </span>
                    ))}

                    <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                    </Typography>
                </Grid>
                </Grid>
            </li>
            );
        }}
        />
    </div>
  );
}