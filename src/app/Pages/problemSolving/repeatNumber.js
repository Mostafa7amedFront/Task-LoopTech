function repeatNumber(arr) {
    
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return i;
      }
    }
  }
  return -1;
}

console.log("result ==> ", repeatNumber([1, 2, 3, 4, 2, 5, 6, 7, 8, 9, 1])); 
// time complexity: O(n2) // Nested loop
