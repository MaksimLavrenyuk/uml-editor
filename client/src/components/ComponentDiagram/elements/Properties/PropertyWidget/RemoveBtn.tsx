import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type RemoveBtnProps = {
    onClick(): void
};

function RemoveBtn(props: RemoveBtnProps) {
    const { onClick } = props;

    return (
        <IconButton size="small" onClick={onClick} aria-label="delete">
            <DeleteIcon />
        </IconButton>
    );
}

export default React.memo(RemoveBtn);
