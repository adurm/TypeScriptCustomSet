const { MySet } = require('./MySet');

// Constructor
test('Set should be constructed with the initial items.', (): void => {

	const set = new MySet(['1', 2, '3', 4, '5']);
	expect(set.contains('1')).toBe(true);
	expect(set.contains(2)).toBe(true);
	expect(set.contains(3)).toBe(false);
	expect(set.contains('4')).toBe(false);
	expect(set.contains('6')).toBe(false);
	expect(set.size).toBe(5);
});

// Entries
test('Entries should return an iterable array of the set.', (): void => {

	const set = new MySet([1, 2, 3, 4, 5]);
	const expectedResult = [1, 2, 3, 4, 5];
	expect(set.entries).toEqual(expectedResult);
	const set2 = new MySet([]);
	const expectedResult2 = [];
	expect(set2.entries).toEqual(expectedResult2);
});

// Size
test('Size property should correctly reflect the size of the set.', (): void => {

	const set = new MySet(['1', 2, '3', 4, '5']);
	expect(set.size).toBe(5);
	expect(set.size === 4).toBe(false);
});

// Add
test('Add should not add duplicate items.', (): void => {

	const set = new MySet([1, 2, 3]);
	const resultSet = new MySet([1, 2, 3, 4, 5])
	expect(set.size).toBe(3);
	set.add(4);
	expect(set.size).toBe(4);
	expect(set.contains(4)).toBe(true);
	set.add(4);
	expect(set.size).toBe(4);
	expect(set.contains(4)).toBe(true);
	expect(set.add(5)).toEqual(resultSet)
});

// Clear
test('Clear should truncate the set.', (): void => {
	const set = new MySet([1, 2, 3]);
	expect(set.size).toBe(3);
	set.clear();
	expect(set.size).toBe(0);
	set.add(1);
	set.clear();
	expect(set.size).toBe(0);
	set.clear();
	expect(set.size).toBe(0);
});

// Contains
test('Contains should correctly detect an item in the set.', (): void => {

	const set = new MySet([1, 2, 3]);
	expect(set.contains(3)).toBe(true);
	expect(set.contains('3')).toBe(false);
	expect(set.contains([])).toBe(false);
});

// Delete
test('Delete should work on empty arrays and items that arent in the set.', (): void => {

	const set = new MySet([1, 2, 3]);
	const resultSet = new MySet([3]);
	expect(set.size).toBe(3);
	set.delete(2);
	expect(set.size).toBe(2);
	set.delete(4);
	expect(set.size).toBe(2);
	expect(set.delete(1)).toEqual(resultSet);
});

// Difference
test('Difference should return everything in set 1 that is not in set 2.', (): void => {
	const set1 = new MySet([1, 2, 3])
	const set2 = new MySet([3, 4, 5])
	const resultSet = new MySet([1, 2])
	expect(set1.difference(set2)).toEqual(resultSet);

	const set3 = new MySet([])
	const resultSet2 = new MySet([])
	expect(set3.difference(set2)).toEqual(resultSet2)
});

// ForEach
test('forEach should iterate through the array with the callback function.', (): void => {

	const set = new MySet([1, 2, 3]);
	const mockCallback = jest.fn(console.log);
	set.forEach(mockCallback)
	expect(mockCallback).toHaveBeenCalledTimes(3);
	expect(mockCallback).not.toHaveBeenCalledTimes(4);
});

// Intersection
test('Intersection should return every item present in both sets.', (): void => {

	const set1 = new MySet(['dog', 'cat', 'mouse', 'rabbit'])
	const set2 = new MySet(['cat', 'mouse', 'horse'])
	const set3 = new MySet([])
	const resultSet = new MySet(['cat', 'mouse'])
	expect(set1.intersection(set2)).toEqual(resultSet)
	expect(set1.intersection(set3)).toEqual(new MySet([]))
});

// Subset
test('Subset should work on empty arrays also.', (): void => {

	const set1 = new MySet([1, 2, 3, 4, 5, 6])
	const set2 = new MySet([2, 3, 4])
	const set3 = new MySet([5, 6, 7])
	const set4 = new MySet([])
	expect(set2.subset(set1)).toBe(true)
	expect(set3.subset(set1)).toBe(false)
	expect(set1.subset(set4)).toBe(false)
});

// Union
test('Union should return every unique item present in both sets.', (): void => {
	const set1 = new MySet([1, 2, 3])
	const set2 = new MySet([3, 4, 5])
	const resultSet = new MySet([1, 2, 3, 4, 5])
	expect(set1.union(set2)).toEqual(resultSet);
});