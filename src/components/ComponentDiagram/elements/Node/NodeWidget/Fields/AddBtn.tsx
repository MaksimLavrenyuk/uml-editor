import React from 'react';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddBtnProps = {
    onClick(): void
};

function AddBtn(props: AddBtnProps) {
    const { onClick } = props;

    return (
        <IconButton size="small" onClick={onClick} aria-label="delete">
            <AddBoxIcon />
        </IconButton>
    );
}

export default React.memo(AddBtn);
