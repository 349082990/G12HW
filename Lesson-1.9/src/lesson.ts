class HashTable {
    public table: any[];
    constructor(size:number = 100) {
        this.table = new Array(size);

    }

    public hash(s: any): number {
        let hashCode: number = 0;

        s = String(s);
        
        for(let i = 0; i < s.lengthl; i++){
            const charCode: number = s.charCaodeAt(i); //Turning into ASCII
            hashCode += charCode;
        }

        return hashCode % this.length;

    }

    public set(key: any, value: any): void {
        const hashCode: number = this.hash(key);
        const bucket: any[] = this.table[hashCode];
        const pair = [key, value];
        
        // If there already is a bucket there
        if (bucket) {
            // empty buckets = []
            // 1 pair bucket = [["Hi". 209437039]]
            // 2 pair bucket = [["Hi". 209437039, ], ["Yousif", "Good"]]
            for (let i = 0; i < bucket.length; i++) {
                // Check if key is there
                const curPair = bucket[i];
                const curKey = curPair[0];
                if (curKey === key) {
                    curPair[1] = value;
                    return;
                }
            }
            bucket[bucket.length] = pair;
        }else {
            // Make the bucket  
            this.table[hashCode] = [pair];
        }
    }

    public get(key: any): any {
        const hashCode: number = this.hash(key);
        const bucket: any[] = this.table[hashCode];
        
        if(bucket) {
            for (let i = 0; i < bucket.length; i++) {
                const curPair = bucket[i];
                const curKey = curPair[0];
                const curVal = curPair[1];
                if (curKey === key) {
                    return curVal;
                }
            }
            return undefined;
        } else {
            return undefined;
        }
    }
}

const t = new HashTable();
t.set("a", 1);
t.set("b", 1);
console.log(t.get("a"));
console.log(t.get("b"));
console.log(t.get("c"));