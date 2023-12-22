export default function changeOrderAtIndex<T>(arr: T[], index: number, direction: 'up' | 'down'): T[]{
    if (index < 0 || index >= arr.length) {
        return arr;
    }

    const newArray = [...arr];
    const currentIndexValue = newArray[index];

    if (direction === 'up' && index > 0) {
        newArray[index] = newArray[index - 1];
        newArray[index - 1] = currentIndexValue;
    } else if (direction === 'down' && index < arr.length - 1) {
        newArray[index] = newArray[index + 1];
        newArray[index + 1] = currentIndexValue;
    }

    return newArray;
}