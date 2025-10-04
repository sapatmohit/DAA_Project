import java.util.Arrays;
import java.util.Random;

public class SortingAlgorithms {

   // Merge Sort implementation
   public static void mergeSort(int[] arr, int left, int right) {
      if (left < right) {
         int mid = left + (right - left) / 2;

         // Sort first and second halves
         mergeSort(arr, left, mid);
         mergeSort(arr, mid + 1, right);

         // Merge the sorted halves
         merge(arr, left, mid, right);
      }
   }

   // Merge function for Merge Sort
   public static void merge(int[] arr, int left, int mid, int right) {
      int n1 = mid - left + 1;
      int n2 = right - mid;

      // Create temporary arrays
      int[] L = new int[n1];
      int[] R = new int[n2];

      // Copy data to temporary arrays
      for (int i = 0; i < n1; i++)
         L[i] = arr[left + i];
      for (int j = 0; j < n2; j++)
         R[j] = arr[mid + 1 + j];

      // Merge the temporary arrays back into arr[left..right]
      int i = 0, j = 0, k = left;
      while (i < n1 && j < n2) {
         if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
         } else {
            arr[k] = R[j];
            j++;
         }
         k++;
      }

      // Copy remaining elements of L[]
      while (i < n1) {
         arr[k] = L[i];
         i++;
         k++;
      }

      // Copy remaining elements of R[]
      while (j < n2) {
         arr[k] = R[j];
         j++;
         k++;
      }
   }

   // Quick Sort implementation
   public static void quickSort(int[] arr, int low, int high) {
      if (low < high) {
         // Partition the array
         int pi = partition(arr, low, high);

         // Recursively sort elements before and after partition
         quickSort(arr, low, pi - 1);
         quickSort(arr, pi + 1, high);
      }
   }

   // Partition function for Quick Sort
   public static int partition(int[] arr, int low, int high) {
      int pivot = arr[high]; // Choose rightmost element as pivot
      int i = (low - 1); // Index of smaller element

      for (int j = low; j <= high - 1; j++) {
         // If current element is smaller than or equal to pivot
         if (arr[j] <= pivot) {
            i++;
            // Swap arr[i] and arr[j]
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
         }
      }

      // Swap arr[i+1] and arr[high] (or pivot)
      int temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;

      return (i + 1);
   }

   // Utility function to print array
   public static void printArray(int[] arr) {
      for (int i = 0; i < arr.length; i++) {
         System.out.print(arr[i] + " ");
      }
      System.out.println();
   }

   // Generate random array
   public static int[] generateRandomArray(int size) {
      int[] arr = new int[size];
      Random rand = new Random();

      for (int i = 0; i < size; i++) {
         arr[i] = rand.nextInt(1000) + 1;
      }
      return arr;
   }

   // Copy array
   public static int[] copyArray(int[] source) {
      return Arrays.copyOf(source, source.length);
   }

   public static void main(String[] args) {
      final int size = 20;

      System.out.println("=== Sorting Algorithms Analysis (Java) ===");
      System.out.println();

      // Generate random array
      int[] original = generateRandomArray(size);
      System.out.print("Original array: ");
      printArray(original);

      // Test Merge Sort
      int[] mergeArr = copyArray(original);
      long startTime = System.nanoTime();
      mergeSort(mergeArr, 0, size - 1);
      long endTime = System.nanoTime();
      double mergeTime = (endTime - startTime) / 1_000_000_000.0; // Convert to seconds

      System.out.print("\nMerge Sort result: ");
      printArray(mergeArr);
      System.out.println("Merge Sort time: " + mergeTime + " seconds");

      // Test Quick Sort
      int[] quickArr = copyArray(original);
      startTime = System.nanoTime();
      quickSort(quickArr, 0, size - 1);
      endTime = System.nanoTime();
      double quickTime = (endTime - startTime) / 1_000_000_000.0; // Convert to seconds

      System.out.print("\nQuick Sort result: ");
      printArray(quickArr);
      System.out.println("Quick Sort time: " + quickTime + " seconds");

      System.out.println("\n=== Complexity Analysis ===");
      System.out.println("Merge Sort: O(n log n) - Stable, Guaranteed performance");
      System.out.println("Quick Sort: O(n log n) average, O(n²) worst case - In-place, Cache-friendly");

      // Additional complexity comparison
      System.out.println("\n=== Algorithm Comparison ===");
      System.out.println("Bubble Sort: O(n²) - Simple but inefficient");
      System.out.println("Selection Sort: O(n²) - Inefficient for large datasets");
      System.out.println("Insertion Sort: O(n²) - Good for small datasets");
      System.out.println("Heap Sort: O(n log n) - In-place, not stable");
      System.out.println("Radix Sort: O(d(n+k)) - Linear time for integers");
   }
}

