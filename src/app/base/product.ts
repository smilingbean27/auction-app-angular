export interface Product {
    _id: String;
    name: string;
    image: string;
    price: number;
    features: Array<string>;
    startDate: Date;
    endDate: Date;
    country: String;
}