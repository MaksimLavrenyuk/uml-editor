import { I18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { Property } from './types';

type PropertyModelProps = {
    i18n: I18n
};

class PropertyModel implements Property {
    public name: string;

    constructor(props: PropertyModelProps) {
        this.name = props.i18n._(t`NEW_PROPERTY`);
    }
}

export default PropertyModel;
