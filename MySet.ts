/**
 * Implementation of custom Set data structure
 * @author Adam Moussa
 */
export class MySet<T> {

    private _items: Map<T, boolean>;

    /**
     * @param initialItems - the initial items in the set
     */
    constructor(initialItems: Array<T> = []) {
        this._items = new Map<T, boolean>();
        initialItems.forEach(item => {
            this._items.set(item, true);
        })
    }

    /**
     * @return all entries in the set
     */
    get entries(): Array<T> {
        return [...this._items.keys()];
    }

    /**
     * @return the size of the set
     */
    get size(): number {
        return this._items.size;
    }

    /**
     * Adds an item to the set
     * @param item - the item to add to the set
     * @return the updated set containing the added item
     */
    add(item: T): MySet<T> {
        if (!this.contains(item)) {
            this._items.set(item, true);
        }
        return this;
    }

    /**
     * Removes all items in the set
     */
    clear(): void {
        this._items = new Map<T, boolean>();
    }

    /**
     * Checks for existance of an item in the set
     * @param item - the item to check
     * @return true if item exists in set, false otherwise
     */
    contains(item: T): boolean {
        return this._items.get(item) === true;
    }

    /**
     * Deletes an item from the set
     * @param item - the item to delete
     * @return the updated set which does not contain the deleted item
     */
    delete(item: T): MySet<T> {
        if (this.contains(item)) {
            this._items.delete(item);
        }
        return this;
    }

    /**
     * Find the difference between two sets
     * @param otherSet - the set to find the difference between
     * @return the new set containing all items in this set and not the other
     */
    difference(otherSet: MySet<T>): MySet<T> {
        this._items.forEach((value: boolean, key: T) => {
            if (otherSet.contains(key)) {
                this._items.delete(key);
            }
        })
        return this;
    }

    /**
     * Iterate over every item in the set
     * @param callbackFn - the function to call on each item in the set
     */
    forEach(callbackFn: (item: T) => void): void {
        this._items.forEach((value: boolean, key: T) => {
            callbackFn(key);
        })
    }

    /**
     * Finds the intersection between two sets
     * @param otherSet - the set to find an intersection with
     * @return new set representing the intersection
     */
    intersection(otherSet: MySet<T>): MySet<T> {
        let newSet = new MySet<T>();
        this._items.forEach((value: boolean, key: T) => {
            if (otherSet.contains(key)) {
                newSet.add(key);
            }
        });
        return newSet;
    }

    /**
     * Checks whether this set is a subset of a given set
     * @param otherSet - the potential superset
     * @return true if this set is a subset of the given set, false otherwise
     */
    subset(otherSet: MySet<T>): boolean {
        let isSubset = true;
        this._items.forEach((value: boolean, key: T) => {
            if (!otherSet.contains(key)) {
                isSubset = false;
            }
        })
        return isSubset;
    }

    /**
     * Joins two sets together, excluding duplicates
     * @param otherSet - the set to union with
     * @return true if this set is a subset of the given set, false otherwise
     */
    union(otherSet: MySet<T>): MySet<T> {
        otherSet.entries.forEach(item => {
            this.add(item);
        })
        return this;
    }

}