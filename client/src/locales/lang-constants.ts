import { t } from '@lingui/macro';
import ComponentType from '../models/ComponentType';

export const COMPONENTS_NAMES: { [key in ComponentType]: string } = {
    [ComponentType.CLASS]: t`COMPONENTS_NAMES_CLASS`,
    [ComponentType.INTERFACE]: t`COMPONENTS_NAMES_INTERFACE`,
    [ComponentType.PROPERTY]: t`PROPERTY`,
};
