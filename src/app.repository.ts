import { Injectable } from "@nestjs/common";

@Injectable()
export class AppRepository {
    private codes = {
        "navigation": "NAV-01",
        "communications": "COM-02",
        "life_support": "LIFE-03",
        "engines": "ENG-04",
        "deflector_shield": "SHLD-05"
    };

    private damaged_system_picked = "";

    getSystems() {
        return Object.keys(this.codes);
    }

    getDamagedSystemPicked() {
        return this.damaged_system_picked;
    }

    setDamagedSystemPicked(system: string) {
        this.damaged_system_picked = system;
    }

    getSystemCode(system: string) {
        return this.codes[system];
    }


}