export interface Product {
    id: string;
    name: string;
    barCode: string;
    description: string;
    priceSale: number;
    purchasePrice: number;
    imageUrl?: string;
    stock: number;
    category?: string;
    createdAt: Date;
    profitPercentage : number;
    updatedAt: Date;
    isActive: boolean;
}
