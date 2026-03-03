

function palindrom(value) {
    const palindromeText = value.toLowerCase();
     const insensitive = [];
     for (let i = 0; i < palindromeText.length; i++) {
        if (palindromeText[i] !== ' ') {
            insensitive.push(palindromeText[i]);
        }
     }

  for (let i = 0, j = insensitive.length - 1; i < j; i++, j--) {
    if (insensitive[i] !== insensitive[j]) {
      return false;
    }
  }
  return true;
}

console.log("result ==> ", palindrom("hello"));
console.log("result ==> ", palindrom("racecar"));
// Time Complexity ==> O(n) ==>  loop 
