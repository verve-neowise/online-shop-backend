import storage from "./storage";
import Magazine from "../model/magazine.model";

async function addMagazine(magazine: Magazine) {

    let query = 'INSERT INTO magazines (name, category, color) values($1, $2, $3)'

    await storage.run(query, [
        magazine.name,
        magazine.category,
        magazine.color
    ])
}

async function allMagazines() {
    let query = 'SELECT * FROM magazines;'
    let datas = await storage.all(query)
    return datas.map(mapMagazine)
}

async function findMagazine(id: string) {
    let query = 'SELECT * FROM magazines WHERE id = $1;'
    let data = await storage.get(query, [id])
    return mapMagazine(data)
}

function mapMagazine(data: any) {
    return data ? new Magazine(
        data.id,
        data.name,
        data.category,
        data.color
    ) : undefined
}

export default {
    addMagazine,
    findMagazine,
    allMagazines
}