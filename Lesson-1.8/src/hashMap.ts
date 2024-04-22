class HashTable {
    public table: any[];                // Defining table as an array of any type
    public numItems: number = 0;        // Number of items in the hash map
    public loadFactor: number = 0.7;    // Setting load factor to 0.7

    constructor(size: number = 100) {  
        this.table = new Array(size);   // Create the hash table with the size @param
    }

    // Don't need to know this method for quiz
    public hash(s: any): number {
        let hashCode: number = 0;   // Set hashcode to 0

        s = String(s) + `%${typeof s}`; // Converting item to string
        const a: number = 7;
        const b: number = 25;
        const p: number = 7507;

        for (let i = 0; i < s.length; i++ ) {   // loop through the hash table 
            const charCode: number = s.charCodeAt(i);   // Convert each character from the table to string
            hashCode += ((a * (hashCode + charCode * i) + b) % p) % this.table.length;  //something hah code formula
        }
        return hashCode; 
    }

    // Set a key-value pair in the hash map. The pair will be placed in a bucket
    // Hashing turns your input to an index in the hash table
    public set(key: any, value: any): void { 
        const hashCode: number = this.hash(key);    // Hashing the key
        const bucket: any[] = this.table[hashCode]; // Bcket to where the hashcode is inside of the table
        const pair = [key, value];                  // Key, value pair - thing you put in the bucket. If 2 keys have the same value, they hash to the same bucket

        if (bucket) {   // If a bucket exists
            for (let i = 0; i < bucket.length; i++) {   // Loop through the bucket (checking if it already exists (checking for duplicates))
                if (bucket[i][0] === key) {       // If the current key is equal to the key
                    bucket[i] = value;     // Replace the value of the current pair with the value that you inputted
                    return;                 // Return the value. Makes sure that it doesnt create a new pair
                }
            }
            bucket[bucket.length] = pair;   // If ur value hashes to this bucket, then add it to the bucket (assign key and value)
            this.numItems++;                // Increase number of items in has map by one
        } else {    // If bucket doesn't exist
            this.table[hashCode] = [pair];  // Creating a new bucket (put pair inside)
            this.numItems++;                // Increase number of items in has map by one
        }

        if (this.numItems / this.table.length > this.loadFactor) {      // If current load is greater than load factor
            this.rehash();   // rehash the shit
        }
    }

    // Check if bucket exists for the hash. Get informatin from hashtable
    public get(key: any): any | undefined {
        const hashCode: number = this.hash(key);        // Hashing the key
        const bucket: any = this.table[hashCode];       // Bucket to where hashcode is inside of the table

        // If bucket exists
        if (bucket) {  // [i] ITSELF IS AN ARRAY; STORES [key, value]
            for (let i = 0; i < bucket.length; i++) {   // Loop through the bucket to check if value exists
                if (bucket[i][0] === key) {             // If the key from the bucket is equal to the key u have
                    return bucket[i][1];               // Return the VALUE in the bucket
                }
            }
        }
        return undefined;       // Return undefined if does not exist
    }

    // Check if the key exists in the has table
    public has(key: any): boolean {
        return !!this.get(key);        // return either true or false. If there is a key return true, if not, return false
    }

    // Resize hashmap to double its current size. Re-inserts all values to current bucket. Cant' simply copy over buckets because table size has changed which will affect hash value
    public rehash(): void {
        const newTable = new HashTable(this.table.length * 2);  // double table length

        for (let i = 0; i < this.table.length; i++) {   // loop through all buckets in the hash map
            const bucket: any[] = this.table[i];        // Set bucket to the current index in the table

            if (bucket) {   // check if bucket exists
                for (let item of bucket) {              // Loop through the items in each bucket
                    newTable.set(item.key, item.value); // Assign key value pair to current bucket
                }
            }
        }

        this.table = newTable.table;                    // If no buckets, then set the table to the new table
    }
}