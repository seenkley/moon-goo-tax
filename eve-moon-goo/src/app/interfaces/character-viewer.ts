export interface MinedOre {
    [key: string]: Number;
}

export interface CharacterViewer {

    id: Number,
    name: String, 
    corpName: String,
    debt: Number,
    minedOre: {
        [key: string]: MinedOre
    };
}
