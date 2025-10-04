#include <iostream>
#include <vector>
#include <chrono>
#include <random>
#include <algorithm>

class SortingAlgorithms
{
public:
   // Merge Sort implementation
   static void mergeSort(std::vector<int> &arr, int left, int right)
   {
      if (left < right)
      {
         int mid = left + (right - left) / 2;

         // Sort first and second halves
         mergeSort(arr, left, mid);
         mergeSort(arr, mid + 1, right);

         // Merge the sorted halves
         merge(arr, left, mid, right);
      }
   }

   // Merge function for Merge Sort
   static void merge(std::vector<int> &arr, int left, int mid, int right)
   {
      int n1 = mid - left + 1;
      int n2 = right - mid;

      // Create temporary vectors
      std::vector<int> L(n1), R(n2);

      // Copy data to temporary vectors
      for (int i = 0; i < n1; i++)
         L[i] = arr[left + i];
      for (int j = 0; j < n2; j++)
         R[j] = arr[mid + 1 + j];

      // Merge the temporary vectors back into arr[left..right]
      int i = 0, j = 0, k = left;
      while (i < n1 && j < n2)
      {
         if (L[i] <= R[j])
         {
            arr[k] = L[i];
            i++;
         }
         else
         {
            arr[k] = R[j];
            j++;
         }
         k++;
      }

      // Copy remaining elements of L[]
      while (i < n1)
      {
         arr[k] = L[i];
         i++;
         k++;
      }

      // Copy remaining elements of R[]
      while (j < n2)
      {
         arr[k] = R[j];
         j++;
         k++;
      }
   }

   // Quick Sort implementation
   static void quickSort(std::vector<int> &arr, int low, int high)
   {
      if (low < high)
      {
         // Partition the array
         int pi = partition(arr, low, high);

         // Recursively sort elements before and after partition
         quickSort(arr, low, pi - 1);
         quickSort(arr, pi + 1, high);
      }
   }

   // Partition function for Quick Sort
   static int partition(std::vector<int> &arr, int low, int high)
   {
      int pivot = arr[high]; // Choose rightmost element as pivot
      int i = (low - 1);     // Index of smaller element

      for (int j = low; j <= high - 1; j++)
      {
         // If current element is smaller than or equal to pivot
         if (arr[j] <= pivot)
         {
            i++;
            // Swap arr[i] and arr[j]
            std::swap(arr[i], arr[j]);
         }
      }

      // Swap arr[i+1] and arr[high] (or pivot)
      std::swap(arr[i + 1], arr[high]);

      return (i + 1);
   }

   // Utility function to print array
   static void printArray(const std::vector<int> &arr)
   {
      for (int i = 0; i < arr.size(); i++)
      {
         std::cout << arr[i] << " ";
      }
      std::cout << std::endl;
   }

   // Generate random array
   static std::vector<int> generateRandomArray(int size)
   {
      std::vector<int> arr(size);
      std::random_device rd;
      std::mt19937 gen(rd());
      std::uniform_int_distribution<> dis(1, 1000);

      for (int i = 0; i < size; i++)
      {
         arr[i] = dis(gen);
      }
      return arr;
   }

   // Measure execution time
   template <typename Func>
   static double measureTime(Func func)
   {
      auto start = std::chrono::high_resolution_clock::now();
      func();
      auto end = std::chrono::high_resolution_clock::now();

      auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
      return duration.count() / 1000000.0; // Convert to seconds
   }
};

int main()
{
   const int size = 20;

   std::cout << "=== Sorting Algorithms Analysis (C++) ===" << std::endl
             << std::endl;

   // Generate random array
   std::vector<int> original = SortingAlgorithms::generateRandomArray(size);
   std::cout << "Original array: ";
   SortingAlgorithms::printArray(original);

   // Test Merge Sort
   std::vector<int> mergeArr = original;
   double mergeTime = SortingAlgorithms::measureTime([&]()
                                                     { SortingAlgorithms::mergeSort(mergeArr, 0, size - 1); });

   std::cout << "\nMerge Sort result: ";
   SortingAlgorithms::printArray(mergeArr);
   std::cout << "Merge Sort time: " << mergeTime << " seconds" << std::endl;

   // Test Quick Sort
   std::vector<int> quickArr = original;
   double quickTime = SortingAlgorithms::measureTime([&]()
                                                     { SortingAlgorithms::quickSort(quickArr, 0, size - 1); });

   std::cout << "\nQuick Sort result: ";
   SortingAlgorithms::printArray(quickArr);
   std::cout << "Quick Sort time: " << quickTime << " seconds" << std::endl;

   std::cout << "\n=== Complexity Analysis ===" << std::endl;
   std::cout << "Merge Sort: O(n log n) - Stable, Guaranteed performance" << std::endl;
   std::cout << "Quick Sort: O(n log n) average, O(n²) worst case - In-place, Cache-friendly" << std::endl;

   return 0;
}
