function createPlayfairGrid(keyword) {
  let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // 'J' is excluded
  keyword = keyword.toUpperCase().replace(/J/g, "I");

  // Create a unique sequence of letters based on the keyword
  let uniqueKeyword = [...new Set(keyword)];
  let grid = uniqueKeyword;

  // Add remaining letters from the alphabet
  for (let letter of alphabet) {
    if (!grid.includes(letter)) {
      grid.push(letter);
    }
  }

  // Create a 5x5 grid
  let playfairGrid = [];
  for (let i = 0; i < 25; i += 5) {
    playfairGrid.push(grid.slice(i, i + 5));
  }
  return playfairGrid;
}

function preprocessMessage(message) {
  message = message.toUpperCase().replace(/J/g, "I"); // Replace 'J' with 'I'
  let digraphs = [];
  for (let i = 0; i < message.length; i += 2) {
    let a = message[i];
    let b = message[i + 1] || "X"; // If no second letter, add 'X'

    if (a === b) {
      digraphs.push(a + "X"); // Insert 'X' if pair has the same letter
      i--; // Recheck 'b' in next iteration
    } else {
      digraphs.push(a + b);
    }
  }
  return digraphs;
}

function findPosition(letter, grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === letter) {
        return [row, col];
      }
    }
  }
  return null;
}

function encryptDigraph(digraph, grid) {
  let a = digraph[0];
  let b = digraph[1];
  let [rowA, colA] = findPosition(a, grid);
  let [rowB, colB] = findPosition(b, grid);

  if (rowA === rowB) {
    // Same row: shift right
    return grid[rowA][(colA + 1) % 5] + grid[rowB][(colB + 1) % 5];
  } else if (colA === colB) {
    // Same column: shift down
    return grid[(rowA + 1) % 5][colA] + grid[(rowB + 1) % 5][colB];
  } else {
    // Rectangle: swap columns
    return grid[rowA][colB] + grid[rowB][colA];
  }
}

function playfairEncrypt(plaintext, keyword) {
  let grid = createPlayfairGrid(keyword);
  let digraphs = preprocessMessage(plaintext);

  let encryptedText = "";
  digraphs.forEach((digraph) => {
    encryptedText += encryptDigraph(digraph, grid);
  });

  return encryptedText;
}

// Example usage
let keyword = "BEST";
let plaintext = "TRIBHUVANUNIVERSITY";
let cipherText = playfairEncrypt(plaintext, keyword);
console.log("Encrypted:", cipherText);
