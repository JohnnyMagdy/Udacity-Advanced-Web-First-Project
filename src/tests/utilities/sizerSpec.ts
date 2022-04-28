import images from "../../routes/api/images"
import { Resize } from "../../utilities/Sizer"

describe('Image transform function should resolve or reject', () => {
    const fileName = 'palmtunnel';
    const width = 200;
    const height = 200;

    it('Expect transform to not throw error', async () => {
        expect(Resize(fileName, width, height)).toBeTruthy();
    })

    it('Expect transform to not throw error', async () => {
        expect(Resize(fileName, width, height)).toBeFalsy();
    })
})