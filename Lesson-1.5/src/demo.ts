class Restaurant {
    public foodType: string;
    public numEmployee: number;
    public isPubliclyTraded: boolean;
    public name: string;
    constructor(
        foodtype: string,
        numEmployee: number,
        isPubliclyTrade: boolean,
        name: string 
    ) {
        this.foodType = foodType;
        this.numEmployee = numEmployee;
        this.isPubliclyTraded = isPubliclyTrade;
        this.name = name;
    }
}

const mcdonalds = new Restaurant("fast food", 100000000, true, "McDaondls");
const pizzaPizza = new Restaurant("pizza", 1000000, false, "Piza Pizza");