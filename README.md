# Sorting Algorithms Visualizer

A comprehensive web application that implements and visualizes sorting algorithms (Merge Sort and Quick Sort) in multiple programming languages with real-time performance analysis.

## Features

- **Multi-language Support**: Implementations in C, C++, and Java
- **Interactive Web Interface**: Built with Next.js and TypeScript
- **Real-time Visualization**: Animated bar charts showing sorting process
- **Performance Analysis**: Detailed complexity analysis and comparison
- **Responsive Design**: Modern UI with Tailwind CSS

## Algorithms Implemented

### Merge Sort

- **Time Complexity**: O(n log n) in all cases
- **Space Complexity**: O(n)
- **Characteristics**: Stable, divide-and-conquer
- **Best For**: Large datasets, when stability is required

### Quick Sort

- **Time Complexity**: O(n log n) average, O(n²) worst case
- **Space Complexity**: O(log n)
- **Characteristics**: In-place, cache-friendly
- **Best For**: General-purpose sorting, when space is limited

## File Structure

```
├── sorting_algorithms.c          # C implementation
├── sorting_algorithms.cpp        # C++ implementation
├── SortingAlgorithms.java       # Java implementation
├── sorting-visualizer/          # Next.js web application
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx         # Main page
│   │   └── components/
│   │       ├── SortingVisualizer.tsx    # Main component
│   │       ├── LanguageSelector.tsx     # Language dropdown
│   │       ├── AlgorithmCode.tsx        # Code display
│   │       ├── SortingAnimation.tsx     # Visualization
│   │       └── ComplexityAnalysis.tsx   # Analysis table
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Running the Applications

### Command Line Programs

#### C Program

```bash
gcc sorting_algorithms.c -o sorting_algorithms
./sorting_algorithms
```

#### C++ Program

```bash
g++ sorting_algorithms.cpp -o sorting_algorithms
./sorting_algorithms
```

#### Java Program

```bash
javac SortingAlgorithms.java
java SortingAlgorithms
```

### Web Application

1. Navigate to the web application directory:

```bash
cd sorting-visualizer
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Web Interface Features

### Controls

- **Language Selector**: Choose between C, C++, and Java implementations
- **Array Size Slider**: Adjust the size of the array to sort (5-50 elements)
- **Generate New Array**: Create a new random array
- **Run Algorithms**: Execute both algorithms and compare results

### Visualization

- **Bar Chart**: Visual representation of the sorted array
- **Performance Metrics**: Real-time display of comparisons, swaps, and execution time
- **Algorithm Comparison**: Side-by-side comparison of both algorithms

### Code Display

- **Syntax Highlighting**: Clean, readable code for each language
- **Tabbed Interface**: Switch between Merge Sort and Quick Sort implementations
- **Performance Stats**: Live statistics for each algorithm

### Complexity Analysis

- **Comprehensive Table**: Comparison of multiple sorting algorithms
- **Detailed Analysis**: Pros, cons, and use cases for each algorithm
- **When to Use**: Guidelines for choosing the right algorithm

## Algorithm Comparison

| Algorithm      | Best Case  | Average Case | Worst Case | Space    | Stable |
| -------------- | ---------- | ------------ | ---------- | -------- | ------ |
| Merge Sort     | O(n log n) | O(n log n)   | O(n log n) | O(n)     | Yes    |
| Quick Sort     | O(n log n) | O(n log n)   | O(n²)      | O(log n) | No     |
| Bubble Sort    | O(n)       | O(n²)        | O(n²)      | O(1)     | Yes    |
| Selection Sort | O(n²)      | O(n²)        | O(n²)      | O(1)     | No     |
| Insertion Sort | O(n)       | O(n²)        | O(n²)      | O(1)     | Yes    |
| Heap Sort      | O(n log n) | O(n log n)   | O(n log n) | O(1)     | No     |

## Technical Details

### Merge Sort Implementation

- Uses divide-and-conquer approach
- Recursively splits array into halves
- Merges sorted halves back together
- Guaranteed O(n log n) performance
- Requires O(n) extra space

### Quick Sort Implementation

- Uses divide-and-conquer with pivot selection
- Partitions array around pivot element
- Recursively sorts sub-arrays
- Average O(n log n), worst case O(n²)
- In-place sorting with O(log n) space

## Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Languages**: C, C++, Java
- **Development**: ESLint, PostCSS

## Performance Notes

- The web application runs algorithms in JavaScript for real-time visualization
- Command-line programs provide accurate performance measurements
- Array sizes are limited to 50 elements for optimal visualization
- Larger datasets can be tested using the command-line implementations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
