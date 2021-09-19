import { t } from '@lingui/macro';
import { I18n } from '@lingui/core';

type MethodModelProps = {
    i18n: I18n
    key: string
};

class MethodModel {
    public name: string;

    public key: string;

    constructor(props: MethodModelProps) {
        this.name = props.i18n._(t`NEW_METHOD`);
        this.key = props.key;
    }
}

export default MethodModel;
