import images from "../../routes/api/images"
import { Resize } from "../../utilities/Sizer"

describe('Image transform function should resolve or reject', () => {
    const fileName = 'palmtunnel';
    const width = 200;
    const height = 200;

    it('Expect transform to not throw error', async () => {
        await Resize(fileName, width, height).toBeResolved();
    })

    it('Expect transform to not throw error', async () => {
        await Resize(fileName, width, height).toBeRejectedWith(
            new Error('Input file is missing')
        );
    })
})