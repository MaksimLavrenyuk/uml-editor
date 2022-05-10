import isTextNode from '../index';

it('Text node check.', () => {
    expect(isTextNode(document.createTextNode('test'))).toBeTruthy();
    expect(isTextNode(document.createElement('div'))).toBeFalsy();
});
