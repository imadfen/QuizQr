import fs from "fs";
import { Player } from "../types/Player";
import path from "path";

const filePath = path.join(__dirname, "..", "data", "players.json");

export default function savePlayer(player: Player) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const playersData: Player[] = JSON.parse(data);

    playersData.push(player);

    const updatedData = JSON.stringify(playersData, null, 4);

    fs.writeFileSync(filePath, updatedData, 'utf-8');
}