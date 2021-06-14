import { CircularProgress } from '@material-ui/core';
import style from './styles/loading.module.scss';

function Loading() {
    return (
        <div className={style.container}>
            <CircularProgress />
        </div>
    );
}

export default Loading;