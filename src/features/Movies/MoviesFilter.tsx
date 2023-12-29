import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  debounce,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useMemo, useState } from "react";
import { KeywordItem, client } from "../../api/tmdb";
import { useAppSelector } from "../../hooks";

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

interface MoviesFilterProps {
  onApply(filters: Filters): void;
}

export function MoviesFilter({ onApply }: MoviesFilterProps) {
  const [keywords, setKeywords] = useState<KeywordItem[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<KeywordItem[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Record<string, boolean>>({});
  const [keywordsLoading, setKeywordsLoading] = useState(false);

  const genres = useAppSelector((state) => state.movies.genres);

  const buttonDisabled = selectedKeywords.length === 0 && Object.keys(selectedGenres).length === 0;

  const fetchKeywords = useMemo(
    () =>
      debounce(async (query) => {
        if (query) {
          setKeywordsLoading(true);

          const keywordsList = await client.getKeywords(query);

          setKeywordsLoading(false);
          setKeywords(keywordsList);
        } else {
          setKeywords([]);
        }
      }, 1000),
    []
  );

  function handleApply() {
    const genresIds = Object.entries(selectedGenres)
      .filter(([_, value]) => value)
      .map(([key]) => Number(key));

    const filters = {
      keywords: selectedKeywords,
      genres: genresIds,
    };

    onApply(filters);
  }

  function handleGenreChanged(id: string, checked: boolean) {
    setSelectedGenres((v) => ({ ...v, [id]: checked }));
  }

  return (
    <Paper sx={{ m: 2, p: 0.5 }}>
      <FormControl sx={{ m: 2, display: "block" }} component="fieldset" variant="standard">
        <Autocomplete
          multiple
          loading={keywordsLoading}
          disablePortal
          options={keywords}
          filterOptions={(x) => x}
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => setSelectedKeywords(value)}
          onInputChange={(_, value) => fetchKeywords(value)}
          renderInput={(params) => <TextField {...params} label="Keywords" />}
        />
      </FormControl>
      <FormControl sx={{ m: 2, display: "block" }} component="fieldset" variant="standard">
        <FormLabel component="legend">Genres</FormLabel>
        <FormGroup sx={{ maxHeight: 500 }}>
          {genres.map((x) => (
            <FormControlLabel
              key={x.id}
              control={<Checkbox name="genre" value={x.id} onChange={(e, checked) => handleGenreChanged(e.target.value, checked)} />}
              label={x.name}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Button sx={{ m: 2 }} variant="contained" startIcon={<FilterAltOutlinedIcon />} disabled={buttonDisabled} onClick={handleApply}>
        Apply filter
      </Button>
    </Paper>
  );
}
