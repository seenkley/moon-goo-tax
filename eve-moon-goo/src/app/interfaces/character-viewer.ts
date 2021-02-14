export interface MinedOre {
    name: string,
    totalAmount: number,
    delta: number
}

export interface TransactionLog {
    id: string,
    amount: number,
    // transactionDate: string | number | Date,
    transactionDate: Date,
    characterName: string
}

export interface CharacterViewer {
    id: number,
    name: string, 
    corpName: string,
    debt: number,
    transactionLogs: any,
    background: string;
    
}
