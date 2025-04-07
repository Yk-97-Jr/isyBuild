import React, {useState, useEffect} from 'react'; // Import useState and useEffect directly

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import type {SelectChangeEvent} from '@mui/material/Select';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

import {useLotsRetrieveQuery} from '@/services/IsyBuildApi'; // Import the query hook

type LotSelectProps = {
  selectedLot: number | undefined;
  setSelectedLot: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function LotSelect({selectedLot, setSelectedLot}: LotSelectProps) {
  const [page, setPage] = useState(1); // Track the current page
  const [lots, setLots] = useState<any[]>([]); // Store fetched lots
  const [hasMore, setHasMore] = useState(true); // Indicates if more pages are available
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track if the dropdown is open
  const [isWaitingData, setIsWaitingData] = useState(false); // Track waiting for data

  // Initialize the query but don't fetch automatically (skip: true)
  const {data, isFetching} = useLotsRetrieveQuery(
    {page, pageSize: 10},
    {skip: !isDropdownOpen} // Do not fetch initially, only when dropdown opens
  );

  // Append fetched data to the list of lots
  useEffect(() => {
    console.log("zzzzzzzzzzzzzzzzz")

    if (data) {
      setLots((prevLots) => [...prevLots, ...data.results]); // Append new lots
      setHasMore(data.next !== null); // Check if there are more pages
      setIsWaitingData(false); // Stop waiting for data
    }
  }, [data]);

  // Handle dropdown open event to start fetching data
  const handleOpen = () => {
    setIsDropdownOpen(true);

    if (!data) {
      setIsWaitingData(true); // Waiting for data to load

    }
  };

  // Handle lot selection
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedLot(Number(event.target.value)); // Convert string back to number
  };

  // Fetch next page when scrolling to the bottom of the dropdown
  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const bottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;

    // If user has scrolled to the bottom and there are more pages, fetch next page
    if (bottom && hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
      setIsWaitingData(true); // Waiting for data
      // refetch(); // Fetch next page
    }
  };

  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="lot-select-label">Select Lot</InputLabel>
        <Select
          labelId="lot-select-label"
          id="lot-select"
          value={selectedLot !== undefined ? selectedLot.toString() : ''} // Convert number to string
          label="Select Lot"
          onChange={handleChange}
          onOpen={handleOpen} // Trigger fetch when the dropdown opens
          MenuProps={{
            PaperProps: {
              onScroll: handleScroll, // Handle scroll event on dropdown menu
              style: {maxHeight: 300}, // Limit dropdown height for scroll
            },
          }}
        >
          {/* Map through lots and display them */}
          {lots.map((lot) => (
            <MenuItem key={lot.id} value={lot.id}>
              {lot.name}
            </MenuItem>
          ))}

          {/* Show loading spinner at the bottom when fetching more data */}
          {isWaitingData && (
            <MenuItem disabled>
              <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <CircularProgress size={24}/>
              </Box>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
