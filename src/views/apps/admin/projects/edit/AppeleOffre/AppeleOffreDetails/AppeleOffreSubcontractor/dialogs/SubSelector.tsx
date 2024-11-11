import React, {useState, useEffect} from 'react'; // Import useState and useEffect directly

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import type {SelectChangeEvent} from '@mui/material/Select';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

import Typography from "@mui/material/Typography"; // Import the query hook

import type {ProjectLotRead} from '@/services/IsyBuildApi';
import {useSubcontractorsRetrieveQuery} from '@/services/IsyBuildApi';

type LotSelectProps = {
  selectedSub: number | undefined;
  setSelectedSub: React.Dispatch<React.SetStateAction<number | undefined>>;
  projectLotData: ProjectLotRead | undefined;
};

export default function SubSelect({selectedSub, setSelectedSub, projectLotData}: LotSelectProps) {
  const [page, setPage] = useState(1); // Track the current page
  const [subs, setSubs] = useState<any[]>([]); // Store fetched subs
  const [hasMore, setHasMore] = useState(true); // Indicates if more pages are available
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track if the dropdown is open
  const [isWaitingData, setIsWaitingData] = useState(false); // Track waiting for data

  // Initialize the query but don't fetch automatically (skip: true)
  // we apply some filters here for subcontractors
  const {data, isFetching} = useSubcontractorsRetrieveQuery(
    {
      page,
      pageSize: 10,
      clientIds: String(projectLotData?.project?.id ),
      lotIds: String(projectLotData?.lot?.id ),

    },
    {skip: !isDropdownOpen} // Do not fetch initially, only when dropdown opens
  );

  // Append fetched data to the list of subs
  useEffect(() => {

    if (data) {
      setSubs((prev) => [...prev, ...data.results]); // Append new subs
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
    setSelectedSub(Number(event.target.value)); // Convert string back to number
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
        <InputLabel id="lot-select-label">Select Entreprise</InputLabel>
        <Select
          labelId="lot-select-label"
          id="lot-select"
          value={selectedSub !== undefined ? selectedSub.toString() : ''} // Convert number to string
          label="Select Entreprise"
          onChange={handleChange}
          onOpen={handleOpen} // Trigger fetch when the dropdown opens
          MenuProps={{
            PaperProps: {
              onScroll: handleScroll, // Handle scroll event on dropdown menu
              style: {maxHeight: 300}, // Limit dropdown height for scroll
            },
          }}
        >
          {/* Map through subs and display them */}
          {subs.map((lot) => (
            <MenuItem key={lot.id} value={lot.id}>
              {lot.name}
            </MenuItem>
          ))}

          {/* Show loading spinner at the bottom when fetching more data */}
          {!isWaitingData ? (
            <MenuItem disabled>
              <Typography variant="body2" color="textSecondary">
                Liste des entreprise non disponible
              </Typography>
            </MenuItem>
          ) : <MenuItem disabled>
            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <CircularProgress size={24}/>
            </Box>
          </MenuItem>}
        </Select>
      </FormControl>
    </Box>
  );
}
