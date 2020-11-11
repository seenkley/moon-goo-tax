export interface MinedOre {
    [key: string]: Number;
}

export interface CharacterViewer {

    id: Number,
    name: String, 
    debt: Number,
    minedOre: {
        [key: string]: MinedOre
    };
}
