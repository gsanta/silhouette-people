import fs from 'fs';

export class SceneExporter {


    async export(): Promise<void> {
        
        return
        
        fs.writeFile('test.json', JSON.stringify({ a:1, b:2, c:3 }, null, 4), () => {

        });
    }
}