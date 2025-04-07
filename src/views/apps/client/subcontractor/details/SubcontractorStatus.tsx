import React, { useEffect, useState, useRef, useCallback } from 'react';

import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Card, CardHeader, CardContent, Divider, Switch } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField';
import { useLotsRetrieveQuery } from '@/services/IsyBuildApi';
import type { FormValidateSubcontractorEditType } from './schemaSubcontractorEdit';
import type { LotSimpleRead,/*  SubcontractorRead  */} from '@/services/IsyBuildApi';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            width: 250,
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            overflowY: 'auto' as const,
        },
        sx: {
            '::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
        },
    },
};

type CombinedComponentProps = {
    register: UseFormRegister<FormValidateSubcontractorEditType>;
    setValue: UseFormSetValue<FormValidateSubcontractorEditType>;
    errors: {
        is_active?: FieldError;
    };
    selectedLotIds: LotSimpleRead[];
    subcontractorData: any
};

const SubcontractorStatus: React.FC<CombinedComponentProps> = ({
    register,
    setValue,
    errors,
    subcontractorData,
    selectedLotIds,
}) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [lots, setLots] = useState<any[]>([]);
    const { data } = useLotsRetrieveQuery({ page, pageSize: 20 });
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (selectedLotIds && selectedLotIds.length) {
            const newSelectedIds = selectedLotIds.map((lot) => lot.id);

            setSelectedIds(newSelectedIds);
            setValue('lots_ids', newSelectedIds); // Set the form value too
        } else {
            setSelectedIds([]);
            setValue('lots_ids', []); // Clear the form value if no selectedLotIds
        }
    }, [selectedLotIds, setValue]);

    const lastLotRef = useCallback((node: HTMLLIElement | null) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && data?.next) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [data]);

    useEffect(() => {
        if (data?.results) {
            const newLots = data.results.map((lot) => ({
                ...lot,
                uniqueKey: `${lot.id}-${Math.random().toString(36).substring(2, 9)}`,
            }));

            setLots((prevLots) => [...prevLots, ...newLots]);
        }
    }, [data]);

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        const selectedId = event.target.value as number[]; // Cast to number[]

        setSelectedIds(selectedId); // Update selectedIds
        setValue('lots_ids', selectedId); // Ensure the form state is updated

        console.log( "message",subcontractorData.is_active );
    };

    

    return (
        <Card className='mbe-12'
            sx={{
                height: isSelectOpen ? '500px' : '266px', 
                transition: 'height 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
            }}>
            <CardHeader title='Détails' />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div className='flex flex-grow flex-col'>
                    <div className='flex gap-4 flex-col mbe-6'>
                        <CustomTextField
                            select
                            fullWidth
                            label=''
                            value={selectedIds} // Use selectedIds here
                            id='lots_ids'
                            {...register('lots_ids')}
                            SelectProps={{
                                multiple: true,
                                MenuProps,
                                onChange: handleChange,
                                onOpen: () => setIsSelectOpen(true),
                                onClose: () => setIsSelectOpen(false),
                                renderValue: (selected) => (
                                    <div className='flex flex-wrap gap-1'>
                                        {(selected as number[]).map((value) => {
                                            const lot = lots.find((lot) => lot.id === value);

                                            
return lot ? <Chip key={value} label={lot.name} size='small' /> : null;
                                        })}
                                    </div>
                                ),
                            }}
                        >
                            {lots.map((lot, index) => (
                                <MenuItem
                                    key={lot.uniqueKey}
                                    value={lot.id}
                                    ref={index === lots.length - 1 ? lastLotRef : null}
                                >
                                    <Typography>{lot.name}</Typography>
                                </MenuItem>
                            ))}
                            {!data?.results?.length && <MenuItem disabled>Loading lots...</MenuItem>}
                        </CustomTextField>
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                    <Divider className='mlb-2' />
                    <div className='flex items-center justify-between mbe-6'>
                        <Typography>Statut</Typography>
                      
                        <Switch {...register('is_active')} defaultChecked={subcontractorData ? subcontractorData.is_active : false}/>
                        {errors.is_active && <span>{errors.is_active.message}</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default SubcontractorStatus;
