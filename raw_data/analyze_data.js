const fs = require('fs');

// Read the details.json file
fs.readFile('details.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    // Extract unique categories
    const allCategories = jsonData.flatMap(item => item.categories);
    const uniqueCategories = [...new Set(allCategories)];

    const categoriesWithIds = uniqueCategories.map((category, index) => ({
      id: index + 1,
      category: category
    }));

    // Write the categories to a new file
    fs.writeFile('categories.json', JSON.stringify(categoriesWithIds, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }
      console.log('Successfully created categories.json');
    });

    // Extract unique colors
    const allColors = jsonData.map(item => item.color_variation).filter(Boolean); // filter(Boolean) removes null/undefined
    const uniqueColors = [...new Set(allColors)];

    const colorsWithIds = uniqueColors.map((color, index) => ({
        id: index + 1,
        color: color
      }));
  
      // Write the colors to a new file
      fs.writeFile('colors.json', JSON.stringify(colorsWithIds, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing the file:', err);
          return;
        }
        console.log('Successfully created colors.json');
      });

  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});