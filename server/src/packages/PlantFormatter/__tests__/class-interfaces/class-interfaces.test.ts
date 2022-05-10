import PlantFormatter from '../../index';
import { PLANT, FILE } from './fixtures';

describe('class interfaces', () => {
    const formatter = new PlantFormatter();

    test('to file', () => {
        expect(
            formatter.toFile({
                fileName: 'class-interfaces',
                plantString: PLANT,
            }),
        ).toEqual(FILE);
    });

    test('to plant', () => {
        expect(
            formatter.toPlant(FILE),
        ).toEqual(PLANT);
    });
});
