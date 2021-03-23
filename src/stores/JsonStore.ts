import { DistrictJson } from "../core/io/DistrictJson";
import districtIds from '../../assets/data/districts.json';

export class JsonStore {
    private assetsPath = 'assets/levels';
    private jsons: DistrictJson[] = [];
    private isLoaded = false;

    getJson(districtId: string) {
        return this.jsons.find(json => json.id === districtId);
    }

    getDistrictIds(): string[] {
        return districtIds;
    }

    async loadDistricts() {
        if (this.isLoaded) { return; }

        const jsons = await this.loadDistrictJsons();
        const maps = await this.loadDistrictMaps();
        const rotationMaps = await this.loadDistrictRotationMaps();

        jsons.forEach((json, index) => {
            json.map = maps[index];
            json.rotationMap = rotationMaps[index];
        });

        this.jsons = jsons;

        this.isLoaded = true;
    }

    private async loadDistrictJsons(): Promise<DistrictJson[]> {
        const districts = districtIds.map(name => fetch(`${this.assetsPath}/${name}.json`).then(res => res.json()));
        return await Promise.all(districts);
    }

    private async loadDistrictMaps(): Promise<string[]> {
        const districts = districtIds.map(name => fetch(`${this.assetsPath}/${name}-map-1.txt`).then(res => res.text()));
        return await Promise.all(districts);
    }

    private async loadDistrictRotationMaps(): Promise<string[]> {
        const districts = districtIds.map(name => fetch(`${this.assetsPath}/${name}-rotations-1.txt`).then(res => res.text()));
        return await Promise.all(districts);
    }
}