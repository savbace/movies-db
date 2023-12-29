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

export interface Filters{
  keywords: KeywordItem[]
}

interface MoviesFilterProps {
  onApply(filters: Filters): void;
}

export function MoviesFilter({onApply}: MoviesFilterProps) {
  const [keywords, setKeywords] = useState<KeywordItem[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<KeywordItem[]>([]);
  const [keywordsLoading, setKeywordsLoading] = useState(false);

  const genres = useAppSelector((state) => state.movies.genres);

  const buttonDisabled = selectedKeywords.length === 0;

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

  function handleApply(){
    const filters = {
      keywords: selectedKeywords
    };

    onApply(filters);
  }

  return (
    <Paper sx={{ m: 2, p: 0.5, maxWidth: 300 }}>
      <FormControl sx={{ m: 2, display: "block" }} component="fieldset" variant="standard">
        <Autocomplete
          multiple
          loading={keywordsLoading}
          disablePortal
          options={keywords}
          filterOptions={(x) => x}
          sx={{ width: 250 }}
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => setSelectedKeywords(value)}
          onInputChange={(_, value) => fetchKeywords(value)}
          renderInput={(params) => <TextField {...params} label="Keywords" />}
        />
      </FormControl>
      <FormControl sx={{ m: 2, display: "block" }} component="fieldset" variant="standard">
        <FormLabel component="legend">Genres</FormLabel>
        <FormGroup>
          {genres.map((x) => (
            <FormControlLabel key={x.id} control={<Checkbox />} label={x.name} value={x.id} />
          ))}
        </FormGroup>
      </FormControl>
      <Button sx={{ m: 2 }} variant="contained" startIcon={<FilterAltOutlinedIcon />} disabled={buttonDisabled} onClick={handleApply}>
        Apply filter
      </Button>
    </Paper>
  );
}
