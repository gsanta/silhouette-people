
export class MapSplitter {
    private NO_OP_CHAR = '.';

    private skipCharacters: string[];

    constructor(skipCharacters: string[]) {
        this.skipCharacters = skipCharacters;
    }

    split(map: string): string[][] {
        map = this.removeSpaces(map);
        map = this.replaceSkipCharactersWithNoOpChar(map);
        const lines = this.splitIntoLines(map);
        const chars = this.splitIntoChars(lines);

        return chars;
    }

    private removeSpaces(map: string): string {
        return map.split(' ').join('');
    }

    private replaceSkipCharactersWithNoOpChar(map: string): string {
        this.skipCharacters.forEach(skipChar => map = map.replace(new RegExp(skipChar, 'g'), this.NO_OP_CHAR));
        return map;
    }

    private splitIntoLines(map: string): string[] {
        map = map.trim();
        return map.split("\n").map(line => line.trim()).filter(line => line !== '');
    }

    private splitIntoChars(lines: string[]): string[][] {
        return lines.map(line => line.split(''));
    }
}
