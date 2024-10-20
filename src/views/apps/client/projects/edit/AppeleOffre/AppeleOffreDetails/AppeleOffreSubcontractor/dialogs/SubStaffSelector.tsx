import React, {useState, useEffect} from 'react'; // Import useState and useEffect directly

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import type {SelectChangeEvent} from '@mui/material/Select';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

import Typography from "@mui/material/Typography"; // Import the query hook

import {skipToken} from "@reduxjs/toolkit/query";

import {useSubcontractorsStaffRetrieve2Query} from '@/services/IsyBuildApi';

type LotSelectProps = {
  selectedSub: number | undefined;
  selectedStaffSub: number | undefined;
  setSelectedStaffSub: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function SubStaffSelect({selectedSub, selectedStaffSub, setSelectedStaffSub}: LotSelectProps) {
  const [page, setPage] = useState(1); // Track the current page
  const [staffSub, setStaffSub] = useState<any[]>([]); // Store fetched staffSub
  const [hasMore, setHasMore] = useState(true); // Indicates if more pages are available
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track if the dropdown is open
  const [isWaitingData, setIsWaitingData] = useState(false); // Track waiting for data

  // Initialize the query but don't fetch automatically (skip: true)
  const {data, isFetching, refetch} = useSubcontractorsStaffRetrieve2Query(
    selectedSub ? {page, pageSize: 10, subcontractorId: selectedSub} : skipToken, // Only query if selectedSub is defined
    {skip: !isDropdownOpen || !selectedSub} // Skip if dropdown is closed or subcontractor is not selected
  );

  useEffect(() => {
    if (selectedSub) {
      // Clear previous staff data and the selected staff
      setStaffSub([]);
      setSelectedStaffSub(undefined)
      setPage(1);       // Reset page to 1
      //  preparing for an automatic refretch
      setIsWaitingData(true);

      // refetch()


    }
  }, [selectedSub, refetch]);

  // Append fetched data to the list of staffSub
  useEffect(() => {
    console.log("zzzzzzzzzzzzzzzzz")

    if (data) {
      setStaffSub((prev) => [...prev, ...data.results]); // Append new staffSub
      setHasMore(data.next !== null); // Check if there are more pages
      setIsWaitingData(false); // Stop waiting for data
    }
  }, [data]);

  // Handle dropdown open event to start fetching data
  const handleOpen = () => {
    // Starting the initiall fetch of data
    setIsDropdownOpen(true);

    if (!data) {
      setIsWaitingData(true); // Waiting for data to load

    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStaffSub(Number(event.target.value)); // Convert string back to number
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
        <InputLabel id="lot-select-label">Select Utilisateur</InputLabel>
        <Select
          labelId="lot-select-label"
          id="lot-select"
          value={selectedStaffSub !== undefined ? selectedStaffSub.toString() : ''} // Convert number to string
          label="Select Utilisateur"
          onChange={handleChange}
          onOpen={handleOpen} // Trigger fetch when the dropdown opens
          disabled={!selectedSub}
          MenuProps={{
            PaperProps: {
              onScroll: handleScroll, // Handle scroll event on dropdown menu
              style: {maxHeight: 300}, // Limit dropdown height for scroll
            },
          }}
        >
          {/* Map through staffSub and display them */}
          {staffSub.length > 0 ? (
            staffSub.map((staff) => (
              <MenuItem key={staff.id} value={staff.id}>
                {staff.user.email}
              </MenuItem>
            ))
          ) : !isWaitingData ? (
            <MenuItem disabled>
              <Typography variant="body2" color="textSecondary">
                No staff available.
              </Typography>
            </MenuItem>
          ) : <MenuItem disabled>
            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <CircularProgress size={24}/>
            </Box>
          </MenuItem>}

          {/*/!* Show loading spinner at the bottom when fetching more data *!/*/}
          {/*{isWaitingData && (*/}
          {/*  <MenuItem disabled>*/}
          {/*    <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>*/}
          {/*      <CircularProgress size={24}/>*/}
          {/*    </Box>*/}
          {/*  </MenuItem>*/}
          {/*)}*/}
        </Select>
      </FormControl>
    </Box>
  );
}
