import isHtmlElementNode from '../index';

it('Element node check.', () => {
    expect(isHtmlElementNode(document.createTextNode('test'))).toBeFalsy();
    expect(isHtmlElementNode(document.createElement('div'))).toBeTruthy();
});
