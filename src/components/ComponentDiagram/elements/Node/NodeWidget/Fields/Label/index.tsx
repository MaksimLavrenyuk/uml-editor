import React from 'react';
import { t } from '@lingui/macro';
import { Typography } from '@mui/material';
import classes from './Label.module.scss';

function Label() {
    return (
        <Typography className={classes.label} variant="caption" display="block">
            {t`FIELDS`}
        </Typography>
    );
}

export default React.memo(Label);
