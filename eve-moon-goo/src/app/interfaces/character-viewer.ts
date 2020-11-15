export interface MinedOre {
    name: string,
    totalAmount: number,
    delta: number
}

export interface CharacterViewer {

    id: number,
    name: string, 
    corpName: string,
    debt: number,
    // minedOre: {
    //    ore: MinedOre;
    // };
}
