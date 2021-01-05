export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    features: Array<string>;
    startDateTime: Date;
    blockInCountry: string;
    endDateTime: Date;
    timePeriod: number;
}