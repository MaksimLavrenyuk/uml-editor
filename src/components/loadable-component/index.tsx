import loadable from '@loadable/component';
import Loading from './Loading';

function LoadableComponent(path: string) {
    return (
        loadable(() => import(`../../pages/${path}`), {
            fallback: <Loading />,
        })
    );
}

export default LoadableComponent;
