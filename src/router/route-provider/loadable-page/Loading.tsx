import { CircularProgress } from '@mui/material';
import style from './styles/loading.module.scss';

/**
 * Fallback component while the page loads.
 */
function Loading() {
    return (
        <div data-testid="loading-page-fallback" className={style.container}>
            <CircularProgress />
        </div>
    );
}

export default Loading;
