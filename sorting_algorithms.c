#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Function to merge two sorted subarrays
void merge(int arr[], int left, int mid, int right)
{
   int n1 = mid - left + 1;
   int n2 = right - mid;

   // Create temporary arrays
   int L[n1], R[n2];

   // Copy data to temporary arrays
   for (int i = 0; i < n1; i++)
      L[i] = arr[left + i];
   for (int j = 0; j < n2; j++)
      R[j] = arr[mid + 1 + j];

   // Merge the temporary arrays back into arr[left..right]
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

// Merge Sort function
void mergeSort(int arr[], int left, int right)
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

// Function to partition array for Quick Sort
int partition(int arr[], int low, int high)
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

// Quick Sort function
void quickSort(int arr[], int low, int high)
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

// Function to print array
void printArray(int arr[], int size)
{
   for (int i = 0; i < size; i++)
      printf("%d ", arr[i]);
   printf("\n");
}

// Function to generate random array
void generateRandomArray(int arr[], int size)
{
   srand(time(NULL));
   for (int i = 0; i < size; i++)
   {
      arr[i] = rand() % 1000 + 1;
   }
}

// Function to copy array
void copyArray(int source[], int dest[], int size)
{
   for (int i = 0; i < size; i++)
   {
      dest[i] = source[i];
   }
}

int main()
{
   int size = 20;
   int arr[size];
   int temp_arr[size];

   printf("=== Sorting Algorithms Analysis ===\n\n");

   // Generate random array
   generateRandomArray(arr, size);
   printf("Original array: ");
   printArray(arr, size);

   // Test Merge Sort
   copyArray(arr, temp_arr, size);
   clock_t start = clock();
   mergeSort(temp_arr, 0, size - 1);
   clock_t end = clock();
   double merge_time = ((double)(end - start)) / CLOCKS_PER_SEC;

   printf("\nMerge Sort result: ");
   printArray(temp_arr, size);
   printf("Merge Sort time: %f seconds\n", merge_time);

   // Test Quick Sort
   copyArray(arr, temp_arr, size);
   start = clock();
   quickSort(temp_arr, 0, size - 1);
   end = clock();
   double quick_time = ((double)(end - start)) / CLOCKS_PER_SEC;

   printf("\nQuick Sort result: ");
   printArray(temp_arr, size);
   printf("Quick Sort time: %f seconds\n", quick_time);

   printf("\n=== Complexity Analysis ===\n");
   printf("Merge Sort: O(n log n) - Stable, Guaranteed performance\n");
   printf("Quick Sort: O(n log n) average, O(n²) worst case - In-place, Cache-friendly\n");

   return 0;
}
