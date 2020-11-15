export interface MinedOre {
    name: String,
    totalAmount: Number,
    delta: Number
}

export interface CharacterViewer {

    id: Number,
    name: String, 
    corpName: String,
    debt: number,
    minedOre: {
       ore: MinedOre;
    };
}
